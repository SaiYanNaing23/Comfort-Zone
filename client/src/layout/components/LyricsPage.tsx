import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LyricsPage = () => {
    const { currentSong } = usePlayerStore()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!currentSong){
            navigate("/")
        }
    }, [currentSong])
  return (
    <div className="min-h-screen bg-zinc-700/90 rounded-md text-white text-6xl font-bold flex items-center justify-center " >
        <h1 className="max-w-[500px] leading-relaxed " >
           Ooops! Looks like we don't have the lyrics for this song yet.
        </h1>
    </div>
  )
}

export default LyricsPage
