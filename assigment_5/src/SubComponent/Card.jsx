import React from "react";
import { Award, Trophy, Computer, Gamepad2 } from "lucide-react";
import {motion} from "framer-motion"

export default function Card(props) {
  console.log("Card props:", props);
  let filteredData = props.data;
  if (props.isPlatformFilterApplied === true) {
    filteredData = [...filteredData].sort((a, b) =>
      a.platform.localeCompare(b.platform)
    );
  }
  if (
    props.searchKeyWord.length > 0
  ) {
    
    filteredData = props.data.filter((game) =>
      game.title.toLowerCase().includes(props.searchKeyWord.toLowerCase())
    );
    if(props.isPlatformFilterApplied === true){
      filteredData = [...filteredData].sort((a, b) =>
        a.platform.localeCompare(b.platform)
      );
    }
  }
  
  return (
    <>
      {filteredData.map((game, index) => (
        <motion.div
        initial={{opacity:0,y:40}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.4,delay:index*0.05}}
        whileHover={{scale:1.05,rotate:1}}
        whileTap={{scale:0.5,rotate:-2}}
          key={index}
          className="relative backdrop-blur-lg bg-white/30 border border-white/40 
                     rounded-2xl shadow-lg p-6 flex flex-col justify-between 
                     transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {/* Award Badge (floating top-right) */}
          {game.editors_choice === "Y" && (
            <div
              className="absolute top-0 right-5 translate-x-3 flex items-center space-x-1 
                            bg-gradient-to-r from-purple-600 to-pink-500 
                            text-white px-2 py-1 rounded-full shadow-md z-50"
            >
              <Award size={18} className="text-yellow-300 scale-110" />
              <span className="text-xs font-semibold z-50">Editor’s Choice</span>
            </div>
          )}

          {/* Title */}
          <h2
            className="text-black text-xl font-bold bg-clip-text text-ellipsis min-w-0.5 
                          "
          >
            {game.title}
          </h2>

          {/* Info */}
          <p className="flex flex-row gap-2 text-sm text-gray-800 m-2 font-bold">
            <Gamepad2 /> Genre: {game.genre}
          </p>
          <p className="flex flex-row gap-2 text-sm text-gray-800 m-2 font-bold">
            <Computer /> Platform: <span className="">{game.platform}</span>
          </p>
          <p className="flex flex-row gap-2 text-sm font-semibold m-2">
            <Trophy className="" style={{ color: "green" }} size={18} /> Score:
            <span
              className={`ml-1 ${
                game.score >= 8
                  ? "text-green-600"
                  : game.score >= 6
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {game.score}/10
            </span>
          </p>
        </motion.div>
      ))}
    </>
  );
}
