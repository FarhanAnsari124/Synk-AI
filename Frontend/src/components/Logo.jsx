export default function Logo({ size = 24 }) {
  return (
    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
      <img src="./public/favicon.png" alt="Logo" className="w-full h-full object-cover"/>
    </div>
  );
}