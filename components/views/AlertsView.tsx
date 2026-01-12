
import React, { useState } from 'react';

const AlertsView: React.FC = () => {
  const [settings, setSettings] = useState({
    global: true,
    '2D_2PM': true,
    '2D_5PM': true,
    '2D_9PM': true,
    '3D_2PM': true,
    '3D_5PM': true,
    '3D_9PM': true,
  });

  const toggle = (key: string) => setSettings(s => ({ ...s, [key]: !s[key as keyof typeof s] }));

  return (
    <div className="view-alerts">
      <h2>Notifications</h2>
      
      <div className="alert-section">
        <div className="alert-item master">
          <label>Enable All Notifications</label>
          <input type="checkbox" checked={settings.global} onChange={() => toggle('global')} />
        </div>
      </div>

      <div className="alert-section">
        <h3>2D Draw Alerts</h3>
        {['2PM', '5PM', '9PM'].map(time => (
          <div key={time} className="alert-item">
            <label>{time} Result</label>
            <input type="checkbox" checked={settings[`2D_${time}` as keyof typeof settings]} onChange={() => toggle(`2D_${time}`)} />
          </div>
        ))}
      </div>

      <div className="alert-section">
        <h3>3D Draw Alerts</h3>
        {['2PM', '5PM', '9PM'].map(time => (
          <div key={time} className="alert-item">
            <label>{time} Result</label>
            <input type="checkbox" checked={settings[`3D_${time}` as keyof typeof settings]} onChange={() => toggle(`3D_${time}`)} />
          </div>
        ))}
      </div>

      <style>{`
        .alert-section { margin-top: 24px; }
        .alert-section h3 { font-size: 12px; color: var(--gray-500); text-transform: uppercase; margin-bottom: 12px; }
        .alert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--Neutral-10);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 8px;
        }
        .alert-item.master { background: var(--Blue-800); border: 1px solid var(--Blue-500); }
        .alert-item label { color: white; font-weight: 500; }
        input[type="checkbox"] {
          width: 44px;
          height: 24px;
          appearance: none;
          background: var(--gray-700);
          border-radius: 20px;
          position: relative;
          cursor: pointer;
          transition: 0.3s;
        }
        input[type="checkbox"]:checked { background: var(--Blue-500); }
        input[type="checkbox"]::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: 0.3s;
        }
        input[type="checkbox"]:checked::after { left: 22px; }
      `}</style>
    </div>
  );
};

export default AlertsView;
