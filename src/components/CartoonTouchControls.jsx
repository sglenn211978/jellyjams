export default function CartoonTouchControls({
  zoomLevel = 1.0,
  onZoomIn,
  onZoomOut,
  onResetView,
  minZoom = 0.75,
  maxZoom = 1.4
}) {
  return (
    <div 
      className="cartoon-touch-controls"
      style={{
        position: 'absolute',
        right: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        pointerEvents: 'auto',
        userSelect: 'none'
      }}
    >
      {/* Zoom In Button */}
      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoomLevel >= maxZoom}
        className={`cartoon-bubble-btn ${zoomLevel >= maxZoom ? 'btn-disabled' : 'btn-yellow'}`}
        title="Zoom In on Creatures"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: zoomLevel >= maxZoom ? 'not-allowed' : 'pointer'
        }}
      >
        <span style={{ fontSize: '24px', lineHeight: '1' }}>➕</span>
        <span style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '0.5px' }}>ZOOM</span>
      </button>

      {/* Zoom Out Button */}
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoomLevel <= minZoom}
        className={`cartoon-bubble-btn ${zoomLevel <= minZoom ? 'btn-disabled' : 'btn-cyan'}`}
        title="Zoom Out for Full Reef Panorama"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: zoomLevel <= minZoom ? 'not-allowed' : 'pointer'
        }}
      >
        <span style={{ fontSize: '24px', lineHeight: '1' }}>➖</span>
        <span style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '0.5px' }}>ZOOM</span>
      </button>

      {/* Reset Camera View Button */}
      {(zoomLevel !== 1.0) && (
        <button
          type="button"
          onClick={onResetView}
          className="cartoon-bubble-btn btn-purple"
          title="Reset to Center View"
          style={{
            padding: '6px 12px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '14px' }}>🏝️</span>
          <span style={{ fontSize: '10px', fontWeight: '900' }}>100%</span>
        </button>
      )}
    </div>
  );
}
