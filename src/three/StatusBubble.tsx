import { Html } from '@react-three/drei';

interface StatusBubbleProps {
  label: string;
  color?: string;
  position?: [number, number, number];
  visible?: boolean;
}

export default function StatusBubble({ label, color = '#2f8cff', position = [0, 1.25, 0], visible = true }: StatusBubbleProps) {
  if (!visible) return null;
  return (
    <Html position={position} center distanceFactor={7} className="three-html-layer">
      <div className="status-bubble" style={{ ['--bubble-color' as string]: color }}>
        <span />{label}
      </div>
    </Html>
  );
}
