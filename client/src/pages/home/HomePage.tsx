import TopBar from "@/components/TopBar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect, useState } from "react"
import FeatureSection from "./components/FeatureSection"
import { ScrollArea } from "@/components/ui/scroll-area"
import SectionGrid from "./components/SectionGrid"
import { usePlayerStore } from "@/stores/usePlayerStore"

const HomePage = () => {
  const {
    isLoading,
    error,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs
  } = useMusicStore()

  const { initializeQueue } = usePlayerStore()

  useEffect(()=>{
    fetchMadeForYouSongs()
    fetchFeaturedSongs()
    fetchTrendingSongs()
  },[fetchMadeForYouSongs, fetchFeaturedSongs, fetchTrendingSongs])

  useEffect(()=>{
    if(madeForYouSongs.length > 0 && trendingSongs.length > 0 && featuredSongs.length > 0){
      initializeQueue([...madeForYouSongs,...trendingSongs,...featuredSongs])
    }
  },[initializeQueue, madeForYouSongs, trendingSongs,featuredSongs])

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        return "Good Morning";
      } else if (hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    setGreeting(getGreeting());
  }, []);
  return (
    <main className="rounded-md overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900 " >
      <TopBar/>
      <ScrollArea className="h-[calc(100vh-180px)] " >
        <div className="p-4 sm:p-6" >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6" >{greeting}</h1>
          <FeatureSection/>

          <div className="space-y-8">
            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} error={error} />
            <SectionGrid title='Trending Songs' songs={trendingSongs} isLoading={isLoading} error={error} />
          </div>
        </div>
      </ScrollArea>
      
    </main>
  )
}

export default HomePage
