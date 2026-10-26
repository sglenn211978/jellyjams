export default function DiveTransition({ isDiving, destinationName }) {
  if (!isDiving) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      background: 'radial-gradient(circle at center, #0284c7 0%, #0369a1 40%, #082f49 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      animation: 'fadeInOut 0.8s ease-in-out'
    }}>
      <div style={{ fontSize: '54px', animation: 'bounce 0.6s infinite alternate' }}>
        🚢
      </div>
      <div style={{
        marginTop: '16px',
        fontSize: '22px',
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: '1px',
        textShadow: '0 4px 12px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}>
        DIVING TO {destinationName?.toUpperCase()}...
      </div>
      <div style={{
        marginTop: '8px',
        fontSize: '13px',
        fontWeight: '700',
        color: '#bae6fd'
      }}>
        Tuning underwater acoustics & waking residents...
      </div>
    </div>
  );
}
