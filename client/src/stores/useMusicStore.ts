import { MusicStore } from '@/Interfaces';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useMusicStore = create<MusicStore>(( set ) => ({
    albums : [],
    songs : [],
    isLoading : false,
    error : null,
    currentAlbum : null,
    madeForYouSongs : [],
    featuredSongs : [],
    trendingSongs : [],
    stats : {
        totalSongs : 0,
        totalAlbums : 0,
        totalUsers : 0,
        totalArtists : 0
    },

    fetchingAlbums : async () => {
        set({ isLoading : true, error : null });
        try {
            const { data } = await axiosInstance.get("/albums");
            set({ albums : data });
        } catch (error : any) {
            set({ error : error.response.data.message });
        }finally {
            set({ isLoading : false });
        }
    },
    
    fetchAlbumById : async(id : string) => {
        set({ isLoading : true, error : null });
        try {
            const { data } = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum : data });
        } catch (error : any) {
            set({ error : error.response.data.message });
        }finally {
            set({ isLoading : false });
        }
    },
    
    fetchFeaturedSongs : async() => {
        set({ isLoading : true, error : null });
        try {
            const { data } = await axiosInstance.get("/songs/featured");
            set({ featuredSongs : data });
        } catch (error : any) {
            set({ error : error.response.data.message });
        }finally {
            set({ isLoading : false });
        }
    },
    
    fetchMadeForYouSongs : async() => {
        set({ isLoading : true, error : null });
        try {
            const { data } = await axiosInstance.get("/songs/made-for-you");
            set({ madeForYouSongs : data });
        } catch (error : any) {
            set({ error : error.response.data.message });
        }finally {
            set({ isLoading : false });
        }
    },
    
    fetchTrendingSongs : async() => {
        set({ isLoading : true, error : null });
        try {
            const { data } = await axiosInstance.get("/songs/trending")
            set({ trendingSongs : data });
        } catch (error : any) {
            set({ error : error.response.data.message });
        }finally {
            set({ isLoading : false });
        }
        
    },

    fetchSongs : async() => {
        set({ isLoading : true, error : null });
        try {
            const { data } = await axiosInstance.get("/songs");
            set({ songs : data });
        } catch (error : any) {
            set({ error : error.response.data.message });
            console.error(error);
        } finally {
            set({ isLoading : false });
        }
    },

    fetchStats : async() => {
        set({ isLoading : true, error : null });
        try {
            const { data } = await axiosInstance.get("/stats")
            set({ stats : data });
        } catch (error : any) {
            set({ error : error.response.data.message });
        }finally {
            set({ isLoading : false });
        }
    },

    deleteSong : async(id : string) => {
        set({ isLoading : true, error : null });
        try {
            await axiosInstance.delete(`/admin/delete-song/${id}`);

            set(state => ({
                songs : state.songs.filter(song => song._id !== id)
            }))
            toast.success("Song is deleted successfully.");
        } catch (error : any) {
            toast.error("Failed to delete song.");
            set({ error : error.response.data.message });
        } finally {
            set({ isLoading : false });
        }
    },

    deleteAlbum : async(id : string) => {
        set({ isLoading : true, error : null });
        try {
            await axiosInstance.delete(`/admin/delete-album/${id}`);
            set(state => ({
                albums : state.albums.filter(album => album._id !== id),
                songs : state.songs.map((song)=> 
                    song.albumId === state.albums.find((a) => a._id === id )?._id ? { ...song, album : null } : song
                )
            }))
            toast.success("Album is deleted successfully.");
        } catch (error : any) {
            toast.error("Failed to delete album.");
            set({ error : error.response.data.message });
        } finally {
            set({ isLoading : false });
        }
    },

    createSong : async(formData : FormData) => {
        try {
            await axiosInstance.post("/admin/create-song", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error : any) {
            toast.error(error)
        }
        
    }
}))