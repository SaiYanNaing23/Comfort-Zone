import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { formatDuration } from "@/utils/DateFormatter"
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1, VolumeOff } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const PlayBackControls = () => {

    const navigate = useNavigate()

    const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore()

    const [ volume, setVolume ] = useState(75)
    const [ currentTime, setCurrentTime ] = useState(0)
    const [ duration, setDuration ] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [showLyrics, setShowLyrics] = useState<boolean>(true)
    // const [ clickShuffle, setClickShuffle] = useState<boolean>(false);
    // const [ clickRepeat, setClickRepeat] = useState<boolean>(false);

    useEffect(()=> {
        audioRef.current = document.querySelector('audio')
        const audio = audioRef.current

        if(!audio) return;
        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)

        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying : false })
        }

        audio.addEventListener('ended', handleEnded)

        return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
    }, [currentSong])

    const handleSeek = (value : number[]) => {
        if(audioRef.current){
            audioRef.current.currentTime = value[0]
        }
    }

    const checkLyrics = () => {
        setShowLyrics(!showLyrics)
        if(showLyrics){
            navigate("/lyrics")
        }else{
            navigate("/")
        }
    }
    // https://www.google.com/search?q=Taylor

    const redirectGoogle = (value : string) => {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(value)}`, "_blank")
    }
    
    return <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4" >
        <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto " >
            {/* Current playing song */}
            <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
                {currentSong && (
                    <>
                        <img
                            src={currentSong.imageUrl}
                            alt={currentSong.title}
                            className='w-14 h-14 object-cover rounded-md'
                        />
                        <div className='flex-1 min-w-0'>
                            <div onClick={() => redirectGoogle(currentSong.title)} className='font-medium truncate hover:underline cursor-pointer'>
                                {currentSong.title}
                            </div>
                            <div onClick={() => redirectGoogle(currentSong.artist)} className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
                                {currentSong.artist}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* player controls */}
            <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
                <div className='flex items-center gap-4 sm:gap-6'>
                    <Button
                        size='icon'
                        variant='ghost'
                        className='hidden sm:inline-flex hover:text-white text-zinc-400'
                    >
                        <Shuffle className='h-4 w-4' />
                    </Button>

                    <Button
                        size='icon'
                        variant='ghost'
                        className='hover:text-white text-zinc-400'
                        onClick={playPrevious}
                        disabled={!currentSong}
                    >
                        <SkipBack className='h-4 w-4' />
                    </Button>

                    <Button
                        size='icon'
                        className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
                        onClick={togglePlay}
                        disabled={!currentSong}
                    >
                        {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
                    </Button>
                    <Button
                        size='icon'
                        variant='ghost'
                        className='hover:text-white text-zinc-400'
                        onClick={playNext}
                        disabled={!currentSong}
                    >
                        <SkipForward className='h-4 w-4' />
                    </Button>
                    <Button
                        size='icon'
                        variant='ghost'
                        className='hidden sm:inline-flex hover:text-white text-zinc-400'
                    >
                        <Repeat className='h-4 w-4' />
                    </Button>
                </div>

                <div className='hidden sm:flex items-center gap-2 w-full'>
                    <div className='text-xs text-zinc-400'>{formatDuration(currentTime)}</div>
                    <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={1}
                        className='w-full hover:cursor-grab active:cursor-grabbing'
                        onValueChange={handleSeek}
                    />
                    <div className='text-xs text-zinc-400'>{formatDuration(duration)}</div>
                </div>
            </div>
            {/* volume controls */}
            <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
                <Button onClick={checkLyrics} size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                        <Mic2 className='h-4 w-4' />
                </Button>
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                    <ListMusic className='h-4 w-4' />
                </Button>
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                    <Laptop2 className='h-4 w-4' />
                </Button>

                <div className='flex items-center gap-2'>
                    <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                        { volume === 0 ? <VolumeOff className='h-4 w-4' /> : <Volume1 className='h-4 w-4' /> }
                    </Button>

                    <Slider
                        value={[volume]}
                        max={100}
                        step={1}
                        className='w-24 hover:cursor-grab active:cursor-grabbing'
                        onValueChange={(value) => {
                            setVolume(value[0]);
                            if (audioRef.current) {
                                audioRef.current.volume = value[0] / 100;
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    </footer>
}

export default PlayBackControls
