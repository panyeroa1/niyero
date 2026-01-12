
import React from 'react';
import { useUI, AppTab } from '@/lib/state';
import cn from 'classnames';

const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useUI();

  const navItems: { id: AppTab; icon: string; label: string }[] = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'results', icon: 'list_alt', label: 'Results' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'alerts', icon: 'notifications', label: 'Alerts' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={cn('nav-item', { active: activeTab === item.id })}
          onClick={() => setActiveTab(item.id)}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="label">{item.label}</span>
        </button>
      ))}
      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 65px;
          background: var(--Neutral-10);
          border-top: 1px solid var(--gray-800);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-bottom: env(safe-area-inset-bottom);
          z-index: 1000;
        }
        @media (min-width: 1024px) {
           .bottom-nav {
              width: 430px;
              left: 50%;
              transform: translateX(-50%);
           }
        }
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
          border: none;
          color: var(--gray-500);
          padding: 8px;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-item.active {
          color: var(--Blue-400);
        }
        .nav-item .material-symbols-outlined {
          font-size: 24px;
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .nav-item.active .material-symbols-outlined {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .nav-item .label {
          font-size: 10px;
          margin-top: 4px;
          font-weight: 500;
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
