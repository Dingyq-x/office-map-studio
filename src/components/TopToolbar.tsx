import type { MapMode, MapObject } from '../types/map';
import ZoomControls from './ZoomControls';
import SearchBar from './SearchBar';

interface TopToolbarProps {
  mapName: string; mode: MapMode; objects: MapObject[]; zoom: number; searchQuery: string; searchResults: MapObject[];
  onModeChange: (mode: MapMode) => void; onSave: () => void; onReset: () => void; onExport: () => void;
  onZoomChange: (zoom: number) => void; onResetView: () => void; onSearchQueryChange: (query: string) => void; onSearchSelect: (object: MapObject) => void;
}
export default function TopToolbar(props: TopToolbarProps) {
  const stats = props.objects.reduce((acc, object) => ({ ...acc, [object.kind]: acc[object.kind] + 1 }), { space: 0, furniture: 0, seat: 0 });
  return <header className="top-toolbar">
    <div className="brand"><strong>Office Map Studio</strong><span>{props.mapName}</span></div>
    <div className="mode-toggle"><button className={props.mode === 'view' ? 'active' : ''} onClick={() => props.onModeChange('view')}>查看</button><button className={props.mode === 'edit' ? 'active' : ''} onClick={() => props.onModeChange('edit')}>编辑</button></div>
    <SearchBar query={props.searchQuery} results={props.searchResults} onQueryChange={props.onSearchQueryChange} onSelect={props.onSearchSelect} />
    <div className="toolbar-actions"><button onClick={props.onSave}>保存</button><button onClick={props.onReset}>恢复默认</button><button className="primary" onClick={props.onExport}>导出 PNG</button></div>
    <ZoomControls zoom={props.zoom} onZoomChange={props.onZoomChange} onReset={props.onResetView} />
    <div className="stats">空间 {stats.space} / 家具 {stats.furniture} / 座位 {stats.seat}</div>
  </header>;
}
