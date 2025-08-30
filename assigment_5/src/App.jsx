import { useState, useEffect, use } from "react";
import "./App.css";
import Card from "./SubComponent/Card";
import SearchField from "./SubComponent/SearchField";
import SkeletonLoader from "./SubComponent/Loader/SkeletonLoader";
import Error from "./SubComponent/Error";
import { ArrowUpNarrowWide,ArrowDownWideNarrow } from "lucide-react";
import { motion } from "framer-motion";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [search, setSearchItem] = useState("");
  const [error, setError] = useState(null);
  const [platformFilter, setPlatformFilter] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
        );
        const data = await response.json();

        console.log("Fetched data:", data);
        setGames(data.slice(1));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Could not load game data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlatformFilter = () => {
    setPlatformFilter(!platformFilter);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      {!isLoading && (
        <>
          <div className="stars"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>

          <div className="flex flex-col justify-center mt-12">
            <div className="px-10 py-4 rounded-2xl backdrop-blur-lg bg-white/30 border border-white/40 mt-2">
              <h1
                className="text-6xl font-extrabold text-transparent bg-clip-text 
            bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 
            drop-shadow-lg text-center"
              >
                Games Arena
              </h1>
            </div>
            <div className="w-full px-10 py-4 rounded-2xl backdrop-blur-lg bg-white/30 border border-white/40 mt-2 flex flex-row justify-between">
              <SearchField setSearchItem={setSearchItem} />
            </div>
            <div className="flex flex-row w-full justify-center mt-2 items-center gap-6 space-x-3">
              <motion.button
                onClick={() => setPlatformFilter(!platformFilter)}
                type="submit"
                whileTap={{ scale: 0.9 ,rotate: 2}}
                whileHover={{scale:1.05}}
                transition={{type:"spring",stiffness:300,damping:15}}
                className=" cursor-pointer flex flex-row items-center justify-center bg-blue-300 p-4 rounded-2xl font-bold"
              >
                Filter Based on Platform
                {!platformFilter ? <ArrowUpNarrowWide className="gap-6" /> : < ArrowDownWideNarrow/>}
              </motion.button>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-6">
              <Card
                data={games}
                searchKeyWord={search}
                isPlatformFilterApplied={platformFilter}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
