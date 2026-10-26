export default function SelectionBadge({ index }) {
  return (
    <div style={{
      position: 'absolute',
      top: '-42px',
      zIndex: 40,
      background: 'linear-gradient(135deg, #a855f7, #6366f1)',
      color: '#ffffff',
      padding: '4px 14px',
      borderRadius: '16px',
      fontWeight: '900',
      fontSize: '12px',
      letterSpacing: '0.5px',
      border: '2px solid #ffffff',
      boxShadow: '0 4px 14px rgba(168, 85, 247, 0.7)',
      whiteSpace: 'nowrap'
    }}>
      ✓ PARENT {index}
    </div>
  );
}
