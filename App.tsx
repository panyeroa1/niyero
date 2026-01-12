
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import HomeView from './components/views/HomeView';
import ResultsView from './components/views/ResultsView';
import HistoryView from './components/views/HistoryView';
import AlertsView from './components/views/AlertsView';
import SettingsView from './components/views/SettingsView';
import ErrorScreen from './components/demo/ErrorScreen';
import StreamingConsole from './components/demo/streaming-console/StreamingConsole';
import ControlTray from './components/console/control-tray/ControlTray';
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { useUI } from './lib/state';

const API_KEY = process.env.API_KEY as string;

function App() {
  const { activeTab, isSidebarOpen } = useUI();

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView />;
      case 'results': return <ResultsView />;
      case 'history': return <HistoryView />;
      case 'alerts': return <AlertsView />;
      case 'settings': return <SettingsView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="App mobile-wrapper">
      <LiveAPIProvider apiKey={API_KEY}>
        <ErrorScreen />
        <Header />
        <Sidebar />
        
        <main className="tab-container">
          {renderView()}
        </main>

        {/* Floating Voice Assistant (Orb + Tray) */}
        <div className={`floating-assistant ${isSidebarOpen ? 'shifted' : ''}`}>
           <StreamingConsole />
           <ControlTray />
        </div>

        <BottomNav />
      </LiveAPIProvider>
      
      <style>{`
        .mobile-wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: var(--Neutral-00);
          position: relative;
        }
        .tab-container {
          flex: 1;
          overflow-y: auto;
          padding: 70px 16px 140px; /* Header space and Bottom nav + Assistant space */
          -webkit-overflow-scrolling: touch;
        }
        .floating-assistant {
          position: fixed;
          bottom: 70px; /* Above BottomNav */
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          z-index: 500;
          transition: transform 0.3s ease;
        }
        .floating-assistant > * {
          pointer-events: auto;
        }
        .floating-assistant.shifted {
          transform: translateX(-150%); /* Move out of way when sidebar open on desktop */
        }
        
        @media (min-width: 1024px) {
          .mobile-wrapper {
             max-width: 430px; /* Mobile simulation on desktop */
             margin: 0 auto;
             border-left: 1px solid var(--gray-800);
             border-right: 1px solid var(--gray-800);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
