import { MusicStore } from '@/Interfaces';
import { axiosInstance } from '@/lib/axios';
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
        
    }
}))