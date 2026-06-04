interface ZoomControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onReset: () => void;
}

const clamp = (value: number) => Math.min(2, Math.max(0.5, value));

export default function ZoomControls({ zoom, onZoomChange, onReset }: ZoomControlsProps) {
  return (
    <div className="zoom-controls" aria-label="缩放控制">
      <button onClick={() => onZoomChange(clamp(zoom - 0.1))}>−</button>
      <span>缩放 {Math.round(zoom * 100)}%</span>
      <button onClick={() => onZoomChange(clamp(zoom + 0.1))}>＋</button>
      <button onClick={onReset}>重置</button>
    </div>
  );
}
