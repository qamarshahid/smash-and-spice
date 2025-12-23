export default function GrandOpeningBanner() {

  return (
    <div className="bg-green-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto text-center text-xs sm:text-sm">
        <div className="flex items-center justify-center gap-2">
          <span className="font-medium">🎉 We're Now Open! 🎉</span>
          <span className="text-gray-200 hidden sm:inline">•</span>
          <span className="text-gray-200 hidden sm:inline">Come visit us today!</span>
        </div>
      </div>
    </div>
  );
}

