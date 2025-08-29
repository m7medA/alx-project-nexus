function Error({ error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-2">⚠️ Error</h2>
        <p className="text-lg">
          {error?.message || error?.toString() || "Something went wrong!"}
        </p>
      </div>
    </div>
  );
}

export default Error;
