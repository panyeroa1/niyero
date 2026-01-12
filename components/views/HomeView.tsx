
import React, { useState, useEffect } from 'react';
import { useUI, useLottoData, GameType } from '@/lib/state';
import cn from 'classnames';

const HomeView: React.FC = () => {
  const { activeGame, setActiveGame } = useUI();
  const { results } = useLottoData();
  const [countdown, setCountdown] = useState('');

  // Simple countdown logic for 2PM, 5PM, 9PM
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentHours = now.getHours();
      let targetHour = 14; // Default to 2PM
      if (currentHours >= 14 && currentHours < 17) targetHour = 17; // Next 5PM
      else if (currentHours >= 17 && currentHours < 21) targetHour = 21; // Next 9PM
      else if (currentHours >= 21) targetHour = 38; // 2PM tomorrow

      const targetDate = new Date();
      if (targetHour > 24) {
        targetDate.setDate(now.getDate() + 1);
        targetDate.setHours(14, 0, 0, 0);
      } else {
        targetDate.setHours(targetHour, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown(`${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const slots: ('2PM' | '5PM' | '9PM')[] = ['2PM', '5PM', '9PM'];

  return (
    <div className="view-home">
      <div className="countdown-card">
        <div className="next-label">Next Draw Countdown</div>
        <div className="timer">{countdown}</div>
        <div className="timezone">Asia/Manila (UTC+8)</div>
      </div>

      <div className="game-toggle">
        <button 
          className={cn({ active: activeGame === '2D' })} 
          onClick={() => setActiveGame('2D')}
        >2D</button>
        <button 
          className={cn({ active: activeGame === '3D' })} 
          onClick={() => setActiveGame('3D')}
        >3D</button>
      </div>

      <div className="draw-cards">
        {slots.map(slot => {
          const result = results.find(r => r.game === activeGame && r.date === today && r.time === slot);
          return (
            <div key={slot} className="draw-card">
              <div className="card-header">
                <span className="time">{slot}</span>
                <span className={cn('status-pill', result?.status?.toLowerCase() || 'pending')}>
                  {result?.status || 'PENDING'}
                </span>
              </div>
              <div className="numbers">
                {result?.status === 'POSTED' ? (
                  result.numbers.map((n, idx) => (
                    <span key={idx} className="number-chip">{n}</span>
                  ))
                ) : (
                  <span className="waiting">Waiting for result...</span>
                )}
              </div>
              {result?.postedAt && <div className="posted-at">Posted at: {result.postedAt}</div>}
            </div>
          );
        })}
      </div>

      <style>{`
        .view-home { display: flex; flex-direction: column; gap: 20px; }
        .countdown-card {
          background: linear-gradient(135deg, var(--Blue-800), #000);
          border: 1px solid var(--Blue-500);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
        }
        .next-label { color: var(--gray-300); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .timer { font-size: 36px; font-weight: bold; color: white; margin: 8px 0; font-variant-numeric: tabular-nums; }
        .timezone { font-size: 12px; color: var(--gray-500); }
        
        .game-toggle {
          display: flex;
          background: var(--Neutral-15);
          border-radius: 12px;
          padding: 4px;
        }
        .game-toggle button {
          flex: 1;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          color: var(--gray-500);
          transition: 0.2s;
        }
        .game-toggle button.active {
          background: var(--Blue-500);
          color: white;
        }

        .draw-cards { display: flex; flex-direction: column; gap: 16px; }
        .draw-card {
          background: var(--Neutral-10);
          border: 1px solid var(--gray-800);
          border-radius: 16px;
          padding: 16px;
        }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .time { font-size: 20px; font-weight: bold; color: white; }
        .status-pill {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-pill.posted { background: var(--Green-700); color: #fff; }
        .status-pill.pending { background: var(--Neutral-30); color: var(--gray-300); }
        .status-pill.late { background: var(--Red-700); color: #fff; }

        .numbers { display: flex; gap: 12px; justify-content: center; min-height: 48px; align-items: center; }
        .number-chip {
          width: 44px;
          height: 44px;
          background: #fff;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: bold;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        .waiting { color: var(--gray-500); font-style: italic; }
        .posted-at { font-size: 11px; color: var(--gray-600); margin-top: 12px; text-align: right; }
      `}</style>
    </div>
  );
};

export default HomeView;
