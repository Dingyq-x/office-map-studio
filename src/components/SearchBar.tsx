import type { MapObject } from '../types/map';
interface SearchBarProps { query: string; results: MapObject[]; onQueryChange: (query: string) => void; onSelect: (object: MapObject) => void; }
const kindName = { space: '空间', furniture: '家具', seat: '座位' } as const;
function meta(object: MapObject) { return object.kind === 'seat' ? `座位 · ${object.label}${object.department ? ` · ${object.department}` : ''}` : object.kind === 'space' ? `空间 · ${object.spaceType}` : `家具 · ${object.furnitureType}`; }
export default function SearchBar({ query, results, onQueryChange, onSelect }: SearchBarProps) {
  const hasQuery = query.trim().length > 0;
  return <div className="search-box">
    <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="搜索员工、部门、座位号、空间、家具" />
    {hasQuery && <span className="result-count">{results.length ? `${results.length} 个匹配` : '无结果'}</span>}
    {hasQuery && <div className="search-results">
      {results.length === 0 ? <div className="search-empty">没有找到匹配对象</div> : results.map((object) => <button key={object.id} onClick={() => onSelect(object)}>
        <strong>{object.employeeName || object.label}</strong><span>{meta(object)}</span><em>{kindName[object.kind]}</em>
      </button>)}
    </div>}
  </div>;
}
