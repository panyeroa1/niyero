
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import { seafarerTools } from './tools/seafarer-tools';
import { DEFAULT_LIVE_API_MODEL, DEFAULT_VOICE } from './constants';
import {
  FunctionResponse,
  FunctionResponseScheduling,
  LiveServerToolCall,
} from '@google/genai';

export type Template = 'papap-pipoy' | 'niyero';
export type AppTab = 'home' | 'results' | 'history' | 'alerts' | 'settings';
export type GameType = '2D' | '3D';

const toolsets: Record<Template, FunctionCall[]> = {
  'papap-pipoy': seafarerTools,
  'niyero': seafarerTools,
};

const systemPrompts: Record<Template, string> = {
  'papap-pipoy': `# SYSTEM PROMPT · LIVE AUDIO MODEL
Persona: “Papap Pipoy” · Host of “Choke Time with Papap Pipoy”
Station: 101.8 Orbitz Radio Manila
...`,
  'niyero': `You are MORGAN.
You are **Kapitan Niyero**, the sharp, streetwise but humble *Captain of the Sea* and right-hand assistant of **Captain Cyrie Letada, the Original “Kapitan Panyero”**.
... (full prompt remains as requested) ...`,
};

/**
 * Lotto Data Interface
 */
export interface LottoResult {
  id: string;
  game: GameType;
  date: string; // YYYY-MM-DD
  time: '2PM' | '5PM' | '9PM';
  numbers: string[];
  status: 'PENDING' | 'POSTED' | 'LATE';
  postedAt?: string;
}

/**
 * Settings
 */
export const useSettings = create<{
  systemPrompt: string;
  model: string;
  voice: string;
  style: string;
  googleSearch: boolean;
  setSystemPrompt: (prompt: string) => void;
  setModel: (model: string) => void;
  setVoice: (voice: string) => void;
  setStyle: (style: string) => void;
  setGoogleSearch: (enabled: boolean) => void;
}>(set => ({
  systemPrompt: systemPrompts['niyero'],
  model: DEFAULT_LIVE_API_MODEL,
  voice: DEFAULT_VOICE,
  style: 'Energetic',
  googleSearch: false,
  setSystemPrompt: prompt => set({ systemPrompt: prompt }),
  setModel: model => set({ model }),
  setVoice: voice => set({ voice }),
  setStyle: style => set({ style }),
  setGoogleSearch: googleSearch => set({ googleSearch }),
}));

/**
 * UI Store
 */
export const useUI = create<{
  isSidebarOpen: boolean;
  activeTab: AppTab;
  activeGame: GameType;
  toggleSidebar: () => void;
  setActiveTab: (tab: AppTab) => void;
  setActiveGame: (game: GameType) => void;
}>(set => ({
  isSidebarOpen: false,
  activeTab: 'home',
  activeGame: '3D',
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveTab: (activeTab) => set({ activeTab }),
  setActiveGame: (activeGame) => set({ activeGame }),
}));

/**
 * Lotto Data Store
 */
export const useLottoData = create<{
  results: LottoResult[];
  addResult: (result: LottoResult) => void;
}>(set => ({
  results: [
    { id: '3D-2025-05-20-1400', game: '3D', date: '2025-05-20', time: '2PM', numbers: ['7', '2', '1'], status: 'POSTED', postedAt: '2025-05-20 14:05' },
    { id: '3D-2025-05-20-1700', game: '3D', date: '2025-05-20', time: '5PM', numbers: ['0', '9', '4'], status: 'POSTED', postedAt: '2025-05-20 17:02' },
    { id: '3D-2025-05-20-2100', game: '3D', date: '2025-05-20', time: '9PM', numbers: [], status: 'PENDING' },
    { id: '2D-2025-05-20-1400', game: '2D', date: '2025-05-20', time: '2PM', numbers: ['12', '28'], status: 'POSTED', postedAt: '2025-05-20 14:05' },
  ],
  addResult: (result) => set(state => ({ results: [...state.results, result] })),
}));

/**
 * Supervisor Interface
 */
export interface Suggestion {
  id: string;
  timestamp: Date;
  originalFeedback: string;
  summary: string;
  newSystemPrompt: string;
}

export interface AppliedCorrection extends Suggestion {
  appliedAt: Date;
}

/**
 * Supervisor Store
 */
export const useSupervisor = create<{
  suggestions: Suggestion[];
  appliedCorrections: AppliedCorrection[];
  isAnalyzing: boolean;
  addSuggestion: (suggestion: Suggestion) => void;
  removeSuggestion: (id: string) => void;
  acceptSuggestion: (id: string) => void;
  setAnalyzing: (analyzing: boolean) => void;
}>(set => ({
  suggestions: [],
  appliedCorrections: [],
  isAnalyzing: false,
  addSuggestion: suggestion =>
    set(state => ({ suggestions: [...state.suggestions, suggestion] })),
  removeSuggestion: id =>
    set(state => ({
      suggestions: state.suggestions.filter(s => s.id !== id),
    })),
  acceptSuggestion: id =>
    set(state => {
      const suggestion = state.suggestions.find(s => s.id === id);
      if (!suggestion) return state;
      const applied: AppliedCorrection = { ...suggestion, appliedAt: new Date() };
      return {
        suggestions: state.suggestions.filter(s => s.id !== id),
        appliedCorrections: [...state.appliedCorrections, applied],
      };
    }),
  setAnalyzing: isAnalyzing => set({ isAnalyzing }),
}));

/**
 * Tools and Logs
 */
export interface FunctionCall {
  name: string;
  description?: string;
  parameters?: any;
  isEnabled: boolean;
  scheduling?: FunctionResponseScheduling;
}

export const useTools = create<{
  tools: FunctionCall[];
  template: Template;
  setTemplate: (template: Template) => void;
  toggleTool: (toolName: string) => void;
  addTool: () => void;
  removeTool: (toolName: string) => void;
  updateTool: (oldName: string, updatedTool: FunctionCall) => void;
}>(set => ({
  tools: seafarerTools,
  template: 'niyero',
  setTemplate: (template: Template) => {
    set({ tools: toolsets[template], template });
    useSettings.getState().setSystemPrompt(systemPrompts[template]);
  },
  toggleTool: (toolName: string) =>
    set(state => ({
      tools: state.tools.map(tool =>
        tool.name === toolName ? { ...tool, isEnabled: !tool.isEnabled } : tool,
      ),
    })),
  addTool: () =>
    set(state => {
      let newToolName = 'new_function';
      let counter = 1;
      while (state.tools.some(tool => tool.name === newToolName)) {
        newToolName = `new_function_${counter++}`;
      }
      return {
        tools: [
          ...state.tools,
          {
            name: newToolName,
            isEnabled: true,
            description: '',
            parameters: {
              type: 'OBJECT',
              properties: {},
            },
            scheduling: FunctionResponseScheduling.INTERRUPT,
          },
        ],
      };
    }),
  removeTool: (toolName: string) =>
    set(state => ({
      tools: state.tools.filter(tool => tool.name !== toolName),
    })),
  updateTool: (oldName: string, updatedTool: FunctionCall) =>
    set(state => {
      if (
        oldName !== updatedTool.name &&
        state.tools.some(tool => tool.name === updatedTool.name)
      ) {
        console.warn(`Tool with name "${updatedTool.name}" already exists.`);
        return state;
      }
      return {
        tools: state.tools.map(tool =>
          tool.name === oldName ? updatedTool : tool,
        ),
      };
    }),
}));

export interface LiveClientToolResponse {
  functionResponses?: FunctionResponse[];
}
export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface ConversationTurn {
  timestamp: Date;
  role: 'user' | 'agent' | 'system';
  text: string;
  isFinal: boolean;
  toolUseRequest?: LiveServerToolCall;
  toolUseResponse?: LiveClientToolResponse;
  groundingChunks?: GroundingChunk[];
}

export const useLogStore = create<{
  turns: ConversationTurn[];
  addTurn: (turn: Omit<ConversationTurn, 'timestamp'>) => void;
  updateLastTurn: (update: Partial<ConversationTurn>) => void;
  clearTurns: () => void;
}>((set, get) => ({
  turns: [],
  addTurn: (turn: Omit<ConversationTurn, 'timestamp'>) =>
    set(state => ({
      turns: [...state.turns, { ...turn, timestamp: new Date() }],
    })),
  updateLastTurn: (update: Partial<Omit<ConversationTurn, 'timestamp'>>) => {
    set(state => {
      if (state.turns.length === 0) {
        return state;
      }
      const newTurns = [...state.turns];
      const lastTurn = { ...newTurns[newTurns.length - 1], ...update };
      newTurns[newTurns.length - 1] = lastTurn;
      return { turns: newTurns };
    });
  },
  clearTurns: () => set({ turns: [] }),
}));
