import { useEffect } from 'react';

export default function ComicPopText({ item, onDone }) {
  useEffect(() => {
    if (!item) return;
    const timer = setTimeout(() => {
      onDone?.();
    }, 1800);
    return () => clearTimeout(timer);
  }, [item, onDone]);

  if (!item) return null;

  const colorClass = {
    gold: 'comic-pop-gold',
    cyan: 'comic-pop-cyan',
    pink: 'comic-pop-pink',
    green: 'comic-pop-green'
  }[item.type || 'gold'];

  return (
    <div
      style={{
        position: 'fixed',
        top: '18%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 350,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className={`comic-pop-banner ${colorClass}`}>
        <span style={{ fontSize: '32px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
          {item.icon || '⭐'}
        </span>
        <span style={{ fontSize: '28px', whiteSpace: 'nowrap' }}>
          {item.text}
        </span>
      </div>
    </div>
  );
}
