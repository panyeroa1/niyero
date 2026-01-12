
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="view-settings">
      <h2>Settings</h2>

      <div className="setting-group">
        <div className="setting-item">
          <div className="label">Default Timezone</div>
          <div className="value">Asia/Manila (UTC+8)</div>
        </div>
        <div className="setting-item">
          <div className="label">Data Refresh Mode</div>
          <select defaultValue="smart">
            <option value="smart">Smart (Auto near draw)</option>
            <option value="light">Light (Manual only)</option>
            <option value="battery">Battery Saver</option>
          </select>
        </div>
      </div>

      <div className="setting-group">
        <button className="danger-btn">Clear Local Cache</button>
      </div>

      <div className="about-info">
        <div className="info-row">
          <span>App Version</span>
          <span>v2.1.0-lotto</span>
        </div>
        <div className="info-row">
          <span>Data Source</span>
          <span>Verified Maritime & Gaming APIs</span>
        </div>
      </div>

      <style>{`
        .setting-group { margin-top: 24px; }
        .setting-item {
          background: var(--Neutral-10);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .label { color: var(--gray-300); font-size: 14px; }
        .value { color: white; font-weight: bold; }
        select { background: var(--Neutral-15); color: white; border: 1px solid var(--gray-700); padding: 4px 8px; border-radius: 4px; }
        
        .danger-btn { width: 100%; padding: 16px; border-radius: 12px; background: rgba(255, 70, 0, 0.1); color: var(--Red-400); border: 1px solid var(--Red-700); font-weight: bold; }
        
        .about-info { margin-top: 40px; padding: 16px; background: var(--Neutral-05); border-radius: 12px; }
        .info-row { display: flex; justify-content: space-between; font-size: 12px; color: var(--gray-500); margin-bottom: 8px; }
      `}</style>
    </div>
  );
};

export default SettingsView;
