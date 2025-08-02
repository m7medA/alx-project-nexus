export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-t-main border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

        <div className="absolute inset-2 rounded-full border-4 border-main opacity-50 animate-ping"></div>

        <div className="absolute inset-6 rounded-full bg-main shadow-md"></div>
      </div>
    </div>
  );
}
