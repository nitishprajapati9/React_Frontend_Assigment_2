import React from 'react'

export default function SkeletonLoader() {
  const skeletons = Array(8).fill(0); // 8 placeholders

  return (
    <div className="mt-4">
      {/* Title Placeholder */}
      <div className="flex justify-center items-center animate-pulse">
        <div className="bg-gray-300 rounded w-64 h-16 mb-4"></div>
      </div>
      {/* Search Placeholder */}
      <div className="flex justify-center items-center animate-pulse">
        <div className="bg-gray-300 rounded w-1/2 h-16 mb-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-full p-8">
        {skeletons.map((_, idx) => (
          <div
            key={idx}
            role="status"
            className={`
              animate-pulse p-6 border border-gray-200 rounded-2xl shadow 
              bg-white/40 backdrop-blur-md h-64 flex flex-col justify-between
              ${idx > 2 ? "hidden sm:block" : ""} 
            `}
          >
            <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-3/6"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ))}
      </div>
    </div>
  )
}
