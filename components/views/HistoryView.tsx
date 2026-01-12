
import React from 'react';
import { useLottoData } from '@/lib/state';

const HistoryView: React.FC = () => {
  const { results } = useLottoData();
  
  // Sort by date desc
  const sorted = [...results].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="view-history">
      <h2>History</h2>
      <div className="history-list">
        {sorted.map(res => (
          <div key={res.id} className="history-item">
            <div className="item-meta">
              <span className="item-game">{res.game}</span>
              <span className="item-date">{res.date}</span>
              <span className="item-slot">{res.time}</span>
            </div>
            <div className="item-results">
              {res.numbers.map((n, i) => (
                <span key={i} className="small-chip">{n}</span>
              ))}
              {res.status !== 'POSTED' && <span className="status-sub">{res.status}</span>}
            </div>
          </div>
        ))}
        <div className="loader">End of history</div>
      </div>
      <style>{`
        .history-list { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
        .history-item {
          background: var(--Neutral-10);
          padding: 12px 16px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 4px solid var(--Blue-500);
        }
        .item-meta { display: flex; flex-direction: column; gap: 2px; }
        .item-game { font-weight: bold; color: white; font-size: 16px; }
        .item-date { font-size: 11px; color: var(--gray-500); }
        .item-slot { font-size: 12px; color: var(--Blue-400); font-weight: bold; }
        .item-results { display: flex; gap: 6px; align-items: center; }
        .small-chip {
          width: 28px;
          height: 28px;
          background: #fff;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: bold;
        }
        .status-sub { font-size: 10px; color: var(--gray-600); }
        .loader { text-align: center; color: var(--gray-500); font-size: 12px; margin: 20px 0; }
      `}</style>
    </div>
  );
};

export default HistoryView;
