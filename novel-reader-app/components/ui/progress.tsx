
export function Progress({ value, className }) {
  return <div className={className}><div style={{ width: `${value}%` }} className="h-full bg-blue-500"></div></div>;
}
