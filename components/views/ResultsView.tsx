
import React, { useState } from 'react';
import { useLottoData } from '@/lib/state';

const ResultsView: React.FC = () => {
  const { results } = useLottoData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filtered = results.filter(r => r.date === selectedDate);

  return (
    <div className="view-results">
      <div className="results-header">
        <h2>Daily Results</h2>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-picker"
        />
      </div>

      <div className="results-list">
        {['3D', '2D'].map(game => (
          <div key={game} className="game-section">
            <h3 className="section-title">{game} Results</h3>
            {['2PM', '5PM', '9PM'].map(time => {
              const res = filtered.find(r => r.game === game && r.time === time);
              return (
                <div key={time} className="result-row">
                  <div className="row-time">{time}</div>
                  <div className="row-numbers">
                    {res?.status === 'POSTED' ? (
                      res.numbers.join(' - ')
                    ) : (
                      <span className="pending-text">Pending</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        .results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .date-picker {
          background: var(--Neutral-15);
          border: 1px solid var(--gray-700);
          color: white;
          padding: 8px;
          border-radius: 8px;
          font-size: 14px;
        }
        .game-section { margin-bottom: 24px; }
        .section-title { font-size: 14px; text-transform: uppercase; color: var(--Blue-400); margin-bottom: 12px; border-bottom: 1px solid var(--gray-800); padding-bottom: 8px; }
        .result-row {
          display: flex;
          align-items: center;
          background: var(--Neutral-10);
          padding: 16px;
          margin-bottom: 8px;
          border-radius: 12px;
          border: 1px solid var(--gray-800);
        }
        .row-time { width: 60px; font-weight: bold; color: white; }
        .row-numbers { flex: 1; text-align: right; font-size: 18px; font-family: 'Roboto Mono', monospace; font-weight: bold; }
        .pending-text { color: var(--gray-500); font-weight: normal; font-size: 14px; }
      `}</style>
    </div>
  );
};

export default ResultsView;
