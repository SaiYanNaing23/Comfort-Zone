import { ChatStore } from '@/Interfaces';
import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axiosInstance.get('/users');
            set({ users: data, isLoading: false });
        } catch (error : any) {
            set({ error: error.message, isLoading: false });
        }finally {
            set({ isLoading: false, error: null });
        }
    }
}))