import { useEffect, useMemo, useRef, useState } from 'react';
import AssetPalette from './components/AssetPalette';
import ConfirmDialog from './components/ConfirmDialog';
import MapCanvas, { type MapCanvasHandle } from './components/MapCanvas';
import PropertyPanel from './components/PropertyPanel';
import Toast from './components/Toast';
import TopToolbar from './components/TopToolbar';
import { demoMap, demoMapName } from './data/demoMap';
import type { AssetTemplate, MapMode, MapObject } from './types/map';
import { loadObjects, resetObjects, saveObjects } from './utils/storage';
import { searchObjects } from './utils/search';

type ConfirmState = { type: 'reset' } | { type: 'delete'; id: string } | null;
const cloneDemo = () => demoMap.map((object) => ({ ...object }));
const center = { x: 520, y: 270 };

export default function App() {
  const [objects, setObjects] = useState<MapObject[]>(() => loadObjects() ?? cloneDemo());
  const [selectedObjectId, setSelectedObjectId] = useState<string | undefined>();
  const [mode, setMode] = useState<MapMode>('view');
  const [zoom, setZoom] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedObjectId, setHighlightedObjectId] = useState<string | undefined>();
  const [focusedObjectId, setFocusedObjectId] = useState<string | undefined>();
  const [toast, setToast] = useState<string>();
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const canvasRef = useRef<MapCanvasHandle>(null);
  const selectedObject = objects.find((object) => object.id === selectedObjectId);
  const searchResults = useMemo(() => searchObjects(objects, searchQuery), [objects, searchQuery]);

  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(undefined), 2200); return () => window.clearTimeout(timer); }, [toast]);
  useEffect(() => { if (!highlightedObjectId) return; const timer = window.setTimeout(() => setHighlightedObjectId(undefined), 1500); return () => window.clearTimeout(timer); }, [highlightedObjectId]);

  const showToast = (message: string) => setToast(message);
  const updateObject = (id: string, patch: Partial<MapObject>) => setObjects((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  const addObject = (asset: AssetTemplate) => {
    if (mode !== 'edit') return;
    const id = `${asset.kind}-${asset.id}-${Date.now().toString(36)}`;
    const object: MapObject = { id, kind: asset.kind, label: asset.defaults.label || '新对象', x: center.x + Math.round(Math.random() * 60 - 30), y: center.y + Math.round(Math.random() * 60 - 30), width: asset.defaults.width || 80, height: asset.defaults.height || 60, rotation: asset.defaults.rotation || 0, color: asset.defaults.color, spaceType: asset.defaults.spaceType, furnitureType: asset.defaults.furnitureType, seatType: asset.defaults.seatType, status: asset.defaults.status, note: asset.defaults.note };
    setObjects((items) => [...items, object]); setSelectedObjectId(id); setFocusedObjectId(id); showToast('已新增对象');
  };
  const focusObject = (object: MapObject) => { setSelectedObjectId(object.id); setFocusedObjectId(object.id); setHighlightedObjectId(object.id); };
  const exportPng = () => { const dataUrl = canvasRef.current?.toDataURL(); if (!dataUrl) return; const link = document.createElement('a'); link.href = dataUrl; link.download = 'office-map-studio.png'; link.click(); showToast('PNG 已导出'); };
  const handleConfirm = () => { if (confirm?.type === 'reset') { resetObjects(); setObjects(cloneDemo()); setSelectedObjectId(undefined); showToast('已恢复默认演示地图'); } if (confirm?.type === 'delete') { setObjects((items) => items.filter((item) => item.id !== confirm.id)); setSelectedObjectId(undefined); showToast('对象已删除'); } setConfirm(null); };

  return <div className="app"><TopToolbar mapName={demoMapName} mode={mode} objects={objects} zoom={zoom} searchQuery={searchQuery} searchResults={searchResults} onModeChange={setMode} onSave={() => { saveObjects(objects); showToast('布局已保存'); }} onReset={() => setConfirm({ type: 'reset' })} onExport={exportPng} onZoomChange={setZoom} onResetView={() => { setZoom(1); setFocusedObjectId(undefined); }} onSearchQueryChange={setSearchQuery} onSearchSelect={focusObject} />
    <div className="workspace"><AssetPalette mode={mode} onAdd={addObject}/><MapCanvas ref={canvasRef} objects={objects} selectedObjectId={selectedObjectId} highlightedObjectId={highlightedObjectId} focusedObjectId={focusedObjectId} mode={mode} zoom={zoom} onSelect={setSelectedObjectId} onObjectMove={(id, x, y) => updateObject(id, { x, y })}/><PropertyPanel object={selectedObject} mode={mode} onChange={updateObject} onDelete={(id) => setConfirm({ type: 'delete', id })}/></div>
    <Toast message={toast}/><ConfirmDialog open={Boolean(confirm)} title={confirm?.type === 'reset' ? '恢复默认布局？' : '删除对象？'} message={confirm?.type === 'reset' ? '这会清空 localStorage 中保存的布局，并重新加载演示地图。' : '删除后需要重新添加对象，确认继续吗？'} confirmText={confirm?.type === 'reset' ? '恢复默认' : '删除'} onConfirm={handleConfirm} onCancel={() => setConfirm(null)} />
  </div>;
}
