import Coin from './Coin';
import SelectionBadge from './SelectionBadge';
import CostumeOverlay from './CostumeOverlay';
import AudioReactiveMouth from './AudioReactiveMouth';

export default function Jellyfish({ 
  name, 
  color, 
  accentColor, 
  isSleeping, 
  isSupercharged, 
  hasCoin, 
  coinAmount = 1,
  level = 1,
  costumeId = null,
  tempoSpeed, 
  isNight, 
  isSelecting, 
  selectionIndex, 
  onCoinCollect, 
  onClick,
  audioEngine = null
}) {
  const isDiva = name.includes('Diva');
  let danceClass = '';
  if (isSupercharged) {
    danceClass = 'supercharged-jelly';
  } else if (!isSleeping) {
    danceClass = isDiva ? 'dancing-diva' : 'dancing-zap';
  }

  const animDuration = isSupercharged 
    ? '0.38s' 
    : isDiva 
      ? `${2 / tempoSpeed}s` 
      : `${0.66 / tempoSpeed}s`;

  const mouthDur = isSupercharged
    ? '0.26s'
    : isDiva
      ? `${0.48 / tempoSpeed}s`
      : `${0.40 / tempoSpeed}s`;

  const scaleFactor = 1 + (level - 1) * 0.04;

  return (
    <div 
      onClick={onClick}
      className={isNight && !isSleeping ? 'bioluminescent-glow' : ''}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.4s ease, filter 0.4s ease',
        transform: isSleeping ? 'translateY(40px) scale(0.9)' : `scale(${scaleFactor})`,
        filter: isSleeping ? 'grayscale(45%) opacity(0.75)' : 'none'
      }}
    >
      {selectionIndex > 0 && <SelectionBadge index={selectionIndex} />}

      {isSelecting && selectionIndex === 0 && !isSleeping && (
        <div style={{
          position: 'absolute',
          top: '-15px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '3px dashed #a855f7',
          animation: 'podSwirlSpin 4s linear infinite',
          pointerEvents: 'none'
        }} />
      )}

      {!isSleeping && hasCoin && (
        <Coin onCollect={onCoinCollect} isSupercharged={isSupercharged} amount={coinAmount} />
      )}

      {isSupercharged && (
        <div style={{
          position: 'absolute',
          top: '-26px',
          zIndex: 20,
          background: '#ec4899',
          color: '#ffffff',
          padding: '3px 12px',
          borderRadius: '14px',
          fontWeight: '900',
          fontSize: '11px',
          letterSpacing: '1px',
          boxShadow: '0 4px 10px rgba(236, 72, 153, 0.5)',
          whiteSpace: 'nowrap'
        }}>
          ⚡ SUGAR RUSH! 3x COINS!
        </div>
      )}

      <div className={danceClass} style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 180 215">
          <defs>
            <clipPath id={`bellClip-${isDiva ? 'diva' : 'zap'}`}>
              <path d="M 38 88 C 38 22, 142 22, 142 88 C 122 99, 106 91, 90 94 C 74 91, 58 99, 38 88 Z" />
            </clipPath>
          </defs>

          {/* Floating musical notes / sparks */}
          {!isSleeping && isDiva && (
            <g transform="translate(90, 42)">
              <text x="-52" y="-12" fill="#f472b6" stroke="#0f172a" strokeWidth="1" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-10;-18;-10" dur={mouthDur} repeatCount="indefinite" />
              </text>
              <text x="38" y="-16" fill="#fde047" stroke="#0f172a" strokeWidth="1" fontSize="24" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-18;-10;-18" dur={mouthDur} repeatCount="indefinite" />
              </text>
            </g>
          )}

          {!isSleeping && !isDiva && (
            <g transform="translate(90, 46)">
              <text x="-58" y="6" fill="#facc15" stroke="#0f172a" strokeWidth="1" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="8;0;8" dur={mouthDur} repeatCount="indefinite" />
              </text>
              <text x="44" y="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="1" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="0;8;0" dur={mouthDur} repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* Sleeping Zzz */}
          {isSleeping && (
            <g transform="translate(68, 16) rotate(-12)">
              <path d="M 0 28 Q 28 -8 52 18 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="52" cy="18" r="7" fill="#86efac" stroke="#0f172a" strokeWidth="2" />
              <text x="62" y="-2" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" fontSize="19" fontWeight="900" fontFamily="'Lilita One', sans-serif">Zzz</text>
            </g>
          )}

          {/* Diva Cel-Shaded Royal Crown */}
          {!isSleeping && isDiva && (
            <g transform="translate(70, 16)">
              <polygon points="0,20 8,2 18,14 26,2 34,14 42,2 50,20" fill="#facc15" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
              {/* Crown shadow */}
              <polygon points="26,14 34,2 42,2 50,20 38,20" fill="#ca8a04" opacity="0.6" />
              {/* Crown jewels */}
              <circle cx="8" cy="2" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="26" cy="2" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="42" cy="2" r="3.5" fill="#a855f7" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="25" cy="14" r="2.5" fill="#ffffff" opacity="0.9" />
            </g>
          )}

          {/* Zap Cel-Shaded Headphones & Lightning Horn */}
          {!isSleeping && !isDiva && (
            <g>
              {/* Antenna Lightning Bolt */}
              <polygon points="90,26 84,8 94,8 89,-4 102,12 93,12" fill="#fef08a" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
              {/* Headband with heavy ink */}
              <path d="M 38 84 C 38 24, 142 24, 142 84" stroke="#0f172a" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M 38 84 C 38 24, 142 24, 142 84" stroke="#334155" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Left Earcup */}
              <rect x="30" y="66" width="16" height="30" rx="8" fill="#0284c7" stroke="#0f172a" strokeWidth="3" />
              <rect x="33" y="70" width="4" height="22" rx="2" fill="#38bdf8" />
              {/* Right Earcup */}
              <rect x="134" y="66" width="16" height="30" rx="8" fill="#0284c7" stroke="#0f172a" strokeWidth="3" />
              <rect x="143" y="70" width="4" height="22" rx="2" fill="#38bdf8" />
            </g>
          )}

          {/* MAIN JELLY BELL (Base Color + Bold Ink Contour) */}
          <path
            d="M 38 88 C 38 22, 142 22, 142 88 C 122 99, 106 91, 90 94 C 74 91, 58 99, 38 88 Z"
            fill={color}
            stroke="#0f172a"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* HARD-CUT CEL-SHADOW CRESCENT (Underside & Right flank) */}
          <g clipPath={`url(#bellClip-${isDiva ? 'diva' : 'zap'})`}>
            <path
              d="M 94 24 C 126 24, 144 52, 144 88 C 122 99, 106 91, 90 94 C 78 92, 68 95, 60 97 C 100 84, 126 70, 116 46 C 108 30, 99 26, 94 24 Z"
              fill={isDiva ? '#be123c' : '#ca8a04'}
            />
            {/* Dark Skirt Under-Rim Band */}
            <path
              d="M 38 88 C 58 99, 74 91, 90 94 C 106 91, 122 99, 142 88 C 142 94, 122 104, 90 100 C 58 104, 38 94, 38 88 Z"
              fill="#0f172a"
              opacity="0.25"
            />
          </g>

          {/* CEL SPECULAR HIGHLIGHT (Gloss Reflection Arc on Upper Left) */}
          <path
            d="M 52 38 C 66 26, 88 25, 98 28 C 86 31, 68 35, 58 46 C 54 51, 51 57, 50 62 C 49 54, 50 44, 52 38 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          <circle cx="106" cy="31" r="3.5" fill="#ffffff" opacity="0.85" />

          {/* CARTOON EYES & FACE EXPRESSIONS */}
          {isSleeping ? (
            <g>
              {/* Cute sleeping cartoon curved eyelids with lashes */}
              <path d="M 60 67 Q 70 77 80 67" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 100 67 Q 110 77 120 67" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 87 77 Q 90 81 93 77" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : isSupercharged ? (
            <g>
              {/* Starry Supercharged Eyes */}
              <circle cx="68" cy="63" r="11" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
              <text x="68" y="68" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">★</text>
              <circle cx="112" cy="63" r="11" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
              <text x="112" y="68" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">★</text>
              {/* Cheeks */}
              <ellipse cx="52" cy="72" rx="7" ry="4" fill="#fb7185" opacity="0.85" />
              <ellipse cx="128" cy="72" rx="7" ry="4" fill="#fb7185" opacity="0.85" />
              {/* Huge Animated Supercharged Singing Mouth */}
              <path d="M 75 72 Q 90 104 105 72 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 75 72 Q 90 106 105 72 Z; M 75 72 Q 90 76 105 72 Z; M 75 72 Q 90 102 105 72 Z; M 75 72 Q 90 77 105 72 Z; M 75 72 Q 90 106 105 72 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              <ellipse cx="90" cy="83" rx="6" ry="4" fill="#fb7185">
                <animate attributeName="ry" values="4;0.8;3.8;0.8;4" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              <rect x="83" y="72" width="14" height="3.2" rx="1.2" fill="#ffffff" />
            </g>
          ) : isDiva ? (
            <g>
              {/* Big Expressive Cartoon Eyes */}
              {/* Left Eye */}
              <ellipse cx="68" cy="62" rx="9.5" ry="13" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
              <ellipse cx="70" cy="63" rx="6" ry="8.5" fill="#1e1b4b" />
              <circle cx="67.5" cy="58" r="3.5" fill="#ffffff" />
              <circle cx="73" cy="66" r="1.6" fill="#ffffff" />
              {/* Lashes */}
              <path d="M 59 53 L 56 47 M 68 49 L 68 43 M 76 52 L 80 46" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

              {/* Right Eye */}
              <ellipse cx="112" cy="62" rx="9.5" ry="13" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
              <ellipse cx="110" cy="63" rx="6" ry="8.5" fill="#1e1b4b" />
              <circle cx="107.5" cy="58" r="3.5" fill="#ffffff" />
              <circle cx="113" cy="66" r="1.6" fill="#ffffff" />
              {/* Lashes */}
              <path d="M 104 52 L 100 46 M 112 49 L 112 43 M 121 53 L 124 47" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

              {/* Rosy Cheek Blushes with Hash Marks */}
              <ellipse cx="52" cy="72" rx="7.5" ry="4.5" fill="#fb7185" opacity="0.75" />
              <line x1="49" y1="70" x2="52" y2="74" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="53" y1="70" x2="56" y2="74" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="128" cy="72" rx="7.5" ry="4.5" fill="#fb7185" opacity="0.75" />
              <line x1="125" y1="70" x2="128" y2="74" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="129" y1="70" x2="132" y2="74" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />

              {/* Audio-Reactive Diva Lip-Sync Mouth */}
              <AudioReactiveMouth
                monsterId="diva"
                audioEngine={audioEngine}
                isSleeping={isSleeping}
                restingD="M 76 74 Q 90 82 104 74"
                centerX={90}
                centerY={70}
                mouthWidth={28}
                mouthHeight={26}
                lipColor="#881337"
                tongueColor="#f43f5e"
                strokeColor="#0f172a"
                strokeWidth={2.8}
                hasTeeth={true}
                toothCount={1}
              />
            </g>
          ) : (
            <g>
              {/* Zap Jelly Cel-Shaded Sunglasses / Visor */}
              <g transform="translate(56, 49)">
                <path d="M 0 4 L 68 4 L 62 21 L 34 24 L 6 21 Z" fill="#0f172a" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
                {/* Comic Visor Shine Bars */}
                <polygon points="8,7 18,7 13,18 3,18" fill="#38bdf8" />
                <polygon points="26,7 60,7 54,14 20,14" fill="#67e8f9" />
                <circle cx="58" cy="11" r="2.2" fill="#ffffff" />
              </g>
              {/* Audio-Reactive Zap Lip-Sync Mouth */}
              <AudioReactiveMouth
                monsterId="zap"
                audioEngine={audioEngine}
                isSleeping={isSleeping}
                restingD="M 76 77 Q 90 85 104 77"
                centerX={90}
                centerY={74}
                mouthWidth={30}
                mouthHeight={26}
                lipColor="#881337"
                tongueColor="#fb7185"
                strokeColor="#0f172a"
                strokeWidth={2.8}
                hasTeeth={true}
                toothCount={1}
              />
            </g>
          )}

          {/* CEL-SHADED TENTACLES (Dark Ink Outlines + Vibrant Inner Body) */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''}>
            {isDiva ? (
              <>
                {/* Tentacle 1 */}
                <path d="M 56 92 Q 46 135 62 178" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M 56 92 Q 46 135 62 178" stroke={accentColor} strokeWidth="4" strokeLinecap="round" fill="none" />
                {/* Tentacle 2 */}
                <path d="M 78 95 Q 88 135 76 182" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
                <path d="M 78 95 Q 88 135 76 182" stroke={accentColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                {/* Tentacle 3 */}
                <path d="M 102 95 Q 92 135 104 182" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
                <path d="M 102 95 Q 92 135 104 182" stroke={accentColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                {/* Tentacle 4 */}
                <path d="M 124 92 Q 134 135 118 178" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M 124 92 Q 134 135 118 178" stroke={accentColor} strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Diva Vintage Microphone */}
                {!isSleeping && (
                  <g transform="translate(132, 125) rotate(14)">
                    <rect x="0" y="9" width="6" height="20" rx="3" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
                    <ellipse cx="3" cy="5" rx="8.5" ry="10.5" fill="#fbcfe8" stroke="#0f172a" strokeWidth="2.5" />
                    <line x1="-3" y1="5" x2="9" y2="5" stroke="#db2777" strokeWidth="2" />
                    <line x1="3" y1="-3" x2="3" y2="13" stroke="#db2777" strokeWidth="2" />
                    <circle cx="1" cy="2" r="2" fill="#ffffff" opacity="0.9" />
                  </g>
                )}
              </>
            ) : (
              <>
                {/* Zap Jagged Electric Tentacles with Ink Outlines */}
                <path d="M 58 92 L 48 116 L 62 142 L 50 174" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 58 92 L 48 116 L 62 142 L 50 174" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                <path d="M 78 95 L 88 120 L 76 146 L 86 178" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 78 95 L 88 120 L 76 146 L 86 178" stroke={accentColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                <path d="M 102 95 L 92 120 L 104 146 L 94 178" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 102 95 L 92 120 L 104 146 L 94 178" stroke={accentColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                <path d="M 122 92 L 132 116 L 118 142 L 130 174" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 122 92 L 132 116 L 118 142 L 130 174" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
