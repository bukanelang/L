
export function Switch({ checked, onCheckedChange, id }) {
  return <input type="checkbox" id={id} checked={checked} onChange={e => onCheckedChange(e.target.checked)} />;
}
