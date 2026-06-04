import type { MapMode, OfficeMapConfig } from '../types/map';
import InspectorSection from './InspectorSection';

interface MapSettingsPanelProps {
  config: OfficeMapConfig;
  mode: MapMode;
  onChange: (patch: Partial<OfficeMapConfig>) => void;
}

export default function MapSettingsPanel({ config, mode, onChange }: MapSettingsPanelProps) {
  const disabled = mode === 'view';
  const updateNumber = (key: keyof Pick<OfficeMapConfig, 'width' | 'depth' | 'tileSize'>, value: string) => {
    onChange({ [key]: Number(value) } as Partial<OfficeMapConfig>);
  };

  return (
    <aside className="map-settings-panel">
      <div className="panel-kicker">Map Settings</div>
      <h2>地图设置</h2>
      <p>配置办公室整体尺寸、地砖密度和边界显示。编辑模式下也可以拖拽地板右下角黄色控点调整大小。</p>
      <InspectorSection title="OfficeMapConfig">
        <label>地图名称
          <input disabled={disabled} value={config.name} onChange={(event) => onChange({ name: event.target.value })} />
        </label>
        <div className="form-grid">
          <label>办公室宽度
            <input type="number" min={560} max={1800} disabled={disabled} value={config.width} onChange={(event) => updateNumber('width', event.target.value)} />
          </label>
          <label>办公室深度
            <input type="number" min={360} max={1200} disabled={disabled} value={config.depth} onChange={(event) => updateNumber('depth', event.target.value)} />
          </label>
          <label>地砖尺寸
            <input type="number" min={40} max={140} disabled={disabled} value={config.tileSize} onChange={(event) => updateNumber('tileSize', event.target.value)} />
          </label>
          <label>显示网格
            <select disabled={disabled} value={String(config.showGrid)} onChange={(event) => onChange({ showGrid: event.target.value === 'true' })}>
              <option value="true">显示</option>
              <option value="false">隐藏</option>
            </select>
          </label>
        </div>
        <div className="form-grid">
          <label>地板颜色
            <input type="color" disabled={disabled} value={config.floorColor} onChange={(event) => onChange({ floorColor: event.target.value })} />
          </label>
          <label>边缘颜色
            <input type="color" disabled={disabled} value={config.edgeColor} onChange={(event) => onChange({ edgeColor: event.target.value })} />
          </label>
        </div>
        <label className="toggle-line">
          <input type="checkbox" disabled={disabled} checked={config.showBoundary} onChange={(event) => onChange({ showBoundary: event.target.checked })} />
          显示办公室边界与 resize 控点
        </label>
      </InspectorSection>
    </aside>
  );
}
