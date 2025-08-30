import { useState,useEffect, use } from 'react'
import './App.css'
import Card from './SubComponent/Card';
import SearchField from './SubComponent/SearchField';
import SkeletonLoader from './SubComponent/Loader/SkeletonLoader';

function App() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [search,setSearchItem] = useState("")

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
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  if(isLoading){
  return <SkeletonLoader />
  }

  return (
    <>
      {
        !isLoading && (
          <>
            <div className="stars"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>

      <div className="flex flex-col justify-center mt-12">
        <div className="px-10 py-4 rounded-2xl backdrop-blur-lg bg-white/30 border border-white/40 mt-2">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text 
            bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 
            drop-shadow-lg text-center">
            Games Arena
          </h1>
        </div>
        <div className='w-full px-10 py-4 rounded-2xl backdrop-blur-lg bg-white/30 border border-white/40 mt-2 flex justify-center'>
          <SearchField setSearchItem={setSearchItem}/>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-6'>
          <Card data={games} searchKeyWord={search}/>
        </div>
      </div>
          </>
        )
      }
    </>
  )
}

export default App
