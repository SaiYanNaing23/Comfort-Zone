import { AuthStore } from "@/Interfaces";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin : false,
    isLoading : false,
    error : null,

    checkingAdminStatus : async() => {
        set({ isLoading : true, error : null });
        try {
            const { data } = await axiosInstance.get("/admin/check");
            set({ isAdmin : data.admin})
        } catch (error : any) {
            set({ error : error.response.data.message , isAdmin : false})
        } finally {
            set({ isLoading : false})
        }
    },
    
    reset: () =>{
        set({
            isAdmin : false,
            isLoading : false,
            error : null,
        })
    },
}))