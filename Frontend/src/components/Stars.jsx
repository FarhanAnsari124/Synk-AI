export default function Stars() {
  return <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <div key={i} className="star"/>)}</div>;
}