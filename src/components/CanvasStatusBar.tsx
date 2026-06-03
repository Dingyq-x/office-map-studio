import type { MapMode } from '../types/map';
export default function CanvasStatusBar({ mode, zoom, count }: { mode: MapMode; zoom: number; count: number }) {
  return <div className="canvas-status"><span>{mode === 'edit' ? '编辑模式：可拖拽/新增/修改对象' : '查看模式：点击对象查看详情'}</span><span>缩放 {Math.round(zoom*100)}%</span><span>对象 {count}</span></div>;
}
