'use client';

interface ResourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESOURCES = [
  { id: '1', title: 'Relaxation', description: 'Release tension you didn\'t know you were holding.', duration: '5 min', vimeoId: '1178026091' },
  { id: '2', title: 'Releasing Guilt', description: 'A quick exercise to reframe and release guilt.', duration: '5 min', vimeoId: '1178023823' },
  { id: '3', title: 'Self-Compassion for Residents', description: 'Why being hard on yourself after a mistake makes the next one more likely.', duration: '6 min', vimeoId: '1178023823' },
  { id: '4', title: 'Wind-Down Breathing for Sleep', description: 'Extended exhale pattern that activates your parasympathetic nervous system.', duration: '3 min', vimeoId: '1178026630' },
  { id: '5', title: 'Post-Night-Float Recovery', description: 'How to reset your circadian rhythm after nights.', duration: '8 min', vimeoId: '1178026630' },
  { id: '6', title: 'Body Scan for Insomnia', description: 'Can\'t turn off your brain after a shift? This was designed for exactly that.', duration: '10 min', vimeoId: '1178026630' },
  { id: '7', title: 'Ready and Empowered', description: 'Powerful grounding technique. Pulls you out of your head and back into your values.', duration: '2 min', vimeoId: '1178027075' },
];

export function ResourceDrawer({ isOpen, onClose }: ResourceDrawerProps) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1a1a2e' }}>Resources</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {RESOURCES.map((resource) => (
          <div key={resource.id} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #f0f0f0', borderRadius: '8px', background: '#fafafa' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#1a1a2e' }}>{resource.title}</h3>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>{resource.description}</p>
            <div style={{ fontSize: '12px', color: '#999' }}>{resource.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
