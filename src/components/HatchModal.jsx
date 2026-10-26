export default function HatchModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.78)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        userSelect: 'none',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="game-modal-frame"
        style={{
          background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
          maxWidth: '460px',
          width: '100%',
          textAlign: 'center',
          color: '#ffffff',
          position: 'relative',
          padding: '36px 28px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '64px', marginBottom: '8px', animation: 'bounceSoft 1.5s ease infinite' }}>
          {data.isNew ? '🎉' : '⭐'}
        </div>

        <div style={{
          display: 'inline-block',
          background: data.isNew ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'linear-gradient(135deg, #d97706, #b45309)',
          border: data.isNew ? '2.5px solid #7dd3fc' : '2.5px solid #fde047',
          color: '#ffffff',
          fontWeight: '900',
          fontSize: '13.5px',
          letterSpacing: '1px',
          padding: '6px 20px',
          borderRadius: '18px',
          marginBottom: '14px',
          fontFamily: "'Lilita One', sans-serif",
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          {data.isNew ? '✨ BRAND NEW DISCOVERY!' : '🧬 DUPLICATE BREEDING FUSION!'}
        </div>

        <h2 style={{
          fontFamily: "'Lilita One', cursive, sans-serif",
          fontSize: '32px',
          color: data.isNew ? '#e0f2fe' : '#fef08a',
          marginBottom: '14px',
          letterSpacing: '1px',
          textShadow: data.isNew ? '0 3px 0 #0284c7' : '0 3px 0 #b45309'
        }}>
          {data.speciesName}
        </h2>

        <p style={{
          fontSize: '15px',
          color: '#e2e8f0',
          lineHeight: '1.6',
          marginBottom: '22px',
          fontWeight: '600'
        }}>
          {data.message}
        </p>

        <div style={{
          background: 'rgba(250, 204, 21, 0.15)',
          border: '2.5px solid #facc15',
          borderRadius: '22px',
          padding: '16px 20px',
          marginBottom: '26px',
          fontWeight: '900',
          color: '#fef08a',
          fontSize: '17px',
          fontFamily: "'Lilita One', sans-serif",
          letterSpacing: '0.5px',
          boxShadow: '0 6px 18px rgba(250, 204, 21, 0.25)'
        }}>
          {data.rewardText}
        </div>

        <button
          onClick={onClose}
          className={`game-btn ${data.isNew ? 'game-btn-cyan' : 'game-btn-yellow'}`}
          style={{
            padding: '16px 48px',
            fontSize: '18px'
          }}
        >
          {data.isNew ? '🎵 JOIN THE BAND!' : '🪙 COLLECT REWARD!'}
        </button>
      </div>
    </div>
  );
}
