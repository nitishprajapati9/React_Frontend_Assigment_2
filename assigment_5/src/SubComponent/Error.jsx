import React from 'react'
import { TriangleAlert } from 'lucide-react';

export default function Error({error}) {
  return (
         <div className="flex flex-col justify-center items-center h-screen">
        <div className="px-6 py-4 rounded-2xl backdrop-blur-lg bg-red-200/70 border border-red-400 shadow-lg">
          <p className="text-red-800 flex flex-row space-x-2"><TriangleAlert style={{color:'red'}} />{error}</p>
        </div>
      </div>
  )
}
