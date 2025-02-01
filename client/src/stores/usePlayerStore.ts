import { PlayerStore } from "@/Interfaces";
import { create } from "zustand";

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue : (songs) => {
        set({
            queue : songs,
            currentSong : get().currentSong || songs[0],
            currentIndex : get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },
    playAlbum : ( songs , startIndex = 0 ) => {
        if(songs.length === 0) return ;

        const song = songs[startIndex];

        set({
            queue : songs,
            currentSong : song,
            currentIndex : startIndex,
            isPlaying : true
        })
    },
    setCurrentSong : (song) => {
        if(!song) return;

        const songIndex = get().queue.findIndex(s => s._id === song._id);

        set({
            currentSong : song,
            isPlaying : true,
            currentIndex : songIndex !== -1 ? songIndex : get().currentIndex,
        })
    },
    togglePlay : () => {
        const willStartPlaying = !get().isPlaying;

        set({
            isPlaying : willStartPlaying,
        })
    },
    playNext : () => {
        const { currentIndex, queue } = get()

        const nextIndex = currentIndex + 1;

        // If there's next song to play, play it
        if(nextIndex < queue.length){
            const nextSong = queue[nextIndex];
            set({
                currentIndex : nextIndex,
                currentSong : nextSong,
                isPlaying : true,
            })
        }else{
            // no next song
            set({
                isPlaying : false,
            })
        }
    },
    playPrevious : () => {
        const { currentIndex, queue } = get()
        const prevIndex = currentIndex - 1;

        if(prevIndex >= 0){
            const prevSong = queue[prevIndex]

            set({
                currentIndex : prevIndex,
                currentSong : prevSong,
                isPlaying : true,
            })
        }else{
            set({
                isPlaying : false,
            })
        }
    },
}))
