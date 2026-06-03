import type { MapObject } from '../types/map';

interface SearchBarProps {
  query: string;
  results: MapObject[];
  onQueryChange: (query: string) => void;
  onSelect: (object: MapObject) => void;
}

const kindName = { space: '空间', furniture: '家具', seat: '座位' } as const;
const icon = { space: '◇', furniture: '▣', seat: '●' } as const;

function meta(object: MapObject) {
  if (object.kind === 'seat') {
    return `${object.label}${object.department ? ` · ${object.department}` : ''}${object.workStatus ? ` · ${object.workStatus}` : ''}`;
  }
  if (object.kind === 'space') return `${object.spaceType || 'space'} · ${object.note || '功能空间'}`;
  return `${object.furnitureType || 'furniture'} · ${object.note || '办公室组件'}`;
}

export default function SearchBar({ query, results, onQueryChange, onSelect }: SearchBarProps) {
  const hasQuery = query.trim().length > 0;

  return (
    <div className="search-box">
      <span className="command-symbol">⌘</span>
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="搜索员工、部门、座位、空间、家具" />
      {hasQuery && <span className="result-count">{results.length ? `${results.length} 个匹配` : '无结果'}</span>}
      {hasQuery && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">没有找到匹配对象，试试员工名、部门或座位号。</div>
          ) : (
            results.map((object) => (
              <button key={object.id} onClick={() => onSelect(object)}>
                <span className={`result-icon ${object.kind}`}>{icon[object.kind]}</span>
                <strong>{object.employeeName || object.label}</strong>
                <small>{kindName[object.kind]} · {meta(object)}</small>
                <em>定位 →</em>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
