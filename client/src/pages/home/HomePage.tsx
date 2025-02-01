import TopBar from "@/components/TopBar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react"
import FeatureSection from "./components/FeatureSection"
import { ScrollArea } from "@/components/ui/scroll-area"
import SectionGrid from "./components/SectionGrid"

const HomePage = () => {
  const {
    isLoading,
    error,
    madeForYouSongs,
    trendingSongs,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs
  } = useMusicStore()

  useEffect(()=>{
    fetchMadeForYouSongs()
    fetchFeaturedSongs()
    fetchTrendingSongs()
  },[fetchMadeForYouSongs, fetchFeaturedSongs, fetchTrendingSongs])
  return (
    <main className="rounded-md overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900 " >
      <TopBar/>
      <ScrollArea className="h-[calc(100vh-180px)] " >
        <div className="p-4 sm:p-6" >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6" >Good Afternoon</h1>
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
