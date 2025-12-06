
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { FunctionResponseScheduling } from '@google/genai';
import { FunctionCall } from '../state';

export const seafarerTools: FunctionCall[] = [
  {
    name: 'upsert_seafarer_profile',
    description: 'Saves or updates the seafarer\'s profile data (name, rank, years of experience, status).',
    parameters: {
      type: 'OBJECT',
      properties: {
        name: { type: 'STRING', description: 'Full name of the seafarer.' },
        rank: { type: 'STRING', description: 'Current maritime rank (e.g., Able Seaman, Bosun, Third Officer).' },
        yearsOfExperience: { type: 'NUMBER', description: 'Total years of experience at sea.' },
        status: { type: 'STRING', description: 'Current status (e.g., Onboard, Vacation, Applying).' },
        lastVesselType: { type: 'STRING', description: 'Type of the last vessel served on.' }
      },
      required: ['name', 'rank'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'get_seafarer_profile',
    description: 'Retrieves the saved profile information of the current seafarer context.',
    parameters: {
      type: 'OBJECT',
      properties: {
        name: { type: 'STRING', description: 'Name of the seafarer to look up.' },
      },
      required: ['name'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'evaluate_contract_offer',
    description: 'Analyzes a job contract offer to determine if it is favorable or has red flags.',
    parameters: {
      type: 'OBJECT',
      properties: {
        basicSalary: { type: 'NUMBER', description: 'Basic monthly salary in USD.' },
        contractDuration: { type: 'NUMBER', description: 'Duration of contract in months.' },
        overtimeRate: { type: 'NUMBER', description: 'Fixed overtime rate.' },
        vesselType: { type: 'STRING', description: 'Type of vessel.' },
        route: { type: 'STRING', description: 'Trading route (e.g., Worldwide, Inter-island).' }
      },
      required: ['basicSalary', 'contractDuration'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'simulate_take_home_and_allotment',
    description: 'Calculates the estimated take-home pay and family allotment based on salary split.',
    parameters: {
      type: 'OBJECT',
      properties: {
        totalSalary: { type: 'NUMBER', description: 'Total monthly salary in USD.' },
        allotmentPercentage: { type: 'NUMBER', description: 'Percentage of salary to send home (0-100).' },
        deductions: { type: 'NUMBER', description: 'Estimated total deductions.' }
      },
      required: ['totalSalary', 'allotmentPercentage'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'generate_rank_upgrade_plan',
    description: 'Creates a step-by-step career progression plan to reach the next maritime rank.',
    parameters: {
      type: 'OBJECT',
      properties: {
        currentRank: { type: 'STRING', description: 'The seafarer\'s current rank.' },
        targetRank: { type: 'STRING', description: 'The desired target rank.' },
      },
      required: ['currentRank', 'targetRank'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'list_required_trainings_and_certs',
    description: 'Lists the mandatory trainings and certifications required for a specific rank or vessel type.',
    parameters: {
      type: 'OBJECT',
      properties: {
        rank: { type: 'STRING', description: 'The rank to check requirements for.' },
        vesselType: { type: 'STRING', description: 'Optional vessel type (e.g., Tanker, Passenger).' }
      },
      required: ['rank'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'search_open_positions',
    description: 'Searches the backend for available job openings matching the seafarer\'s rank.',
    parameters: {
      type: 'OBJECT',
      properties: {
        rank: { type: 'STRING', description: 'Rank to filter jobs by.' },
        preferredVessel: { type: 'STRING', description: 'Preferred vessel type.' }
      },
      required: ['rank'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'schedule_follow_up_session',
    description: 'Books a follow-up consultation with a human career counselor or advanced AI session.',
    parameters: {
      type: 'OBJECT',
      properties: {
        topic: { type: 'STRING', description: 'Main topic for the follow-up.' },
        preferredDate: { type: 'STRING', description: 'Preferred date/time string.' }
      },
      required: ['topic'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'save_conversation_journal',
    description: 'Saves a summary or "diary entry" of the current conversation for the seafarer\'s personal record.',
    parameters: {
      type: 'OBJECT',
      properties: {
        seafarerName: { type: 'STRING', description: 'Name of the seafarer.' },
        summary: { type: 'STRING', description: 'Key points discussed in the session.' },
        sentiment: { type: 'STRING', description: 'Overall mood/sentiment of the entry.' }
      },
      required: ['seafarerName', 'summary'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'fetch_support_and_helplines',
    description: 'Retrieves contact information for mental health, legal aid, or union support services.',
    parameters: {
      type: 'OBJECT',
      properties: {
        issueType: { type: 'STRING', description: 'Type of support needed (e.g., Mental Health, Legal, Financial).' },
        location: { type: 'STRING', description: 'Current location of the seafarer (e.g., At Sea, Philippines).' }
      },
      required: ['issueType'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
];
