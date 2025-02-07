import { ChatStore, Message } from '@/Interfaces';
import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';
import { io } from'socket.io-client';

const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/"

const socket = io(baseUrl, {
    autoConnect : false, //only connect when user is authenticated
    withCredentials : true
})

export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: socket,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],
    selectedUser: null,

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
    },

    initSocket : (userId : string) => {
        if(!get().isConnected){
            socket.auth = { userId };
            socket.connect()
            socket.emit("user_connected", userId)

            socket.on("online_users", (users : string[]) => {
                set({ onlineUsers : new Set(users)});
            });

            socket.on("activities", (activities : [string , string][]) => {
                set({ userActivities : new Map(activities)})
            });

            socket.on("user_connected", (userId : string) => {
                set((state) => ({
                    onlineUsers : new Set([...state.onlineUsers, userId])
                }))
            });

            socket.on("user_disconnected", (userId : string) => {
                set((state) => {
                    const newOnlineUsers = new Set(state.onlineUsers)
                    newOnlineUsers.delete(userId)
                    return { onlineUsers : newOnlineUsers }
                })
            });

            socket.on("receive_message", ( messages : Message) => {
                set((state) => ({
                    messages : [...state.messages, messages]
                }))
            });

            socket.on("message_sent_to_sender", ( messages : Message) => {
                set((state) => ({
                    messages : [...state.messages, messages]
                }))
            });

            socket.on("activity_updated", ({ userId, activity }) => {
                set((state) => {
                    const newActivities = new Map(state.userActivities)
                    newActivities.set(userId, activity)
                    return { userActivities : newActivities }
                })
            });

            set({ isConnected : true });
        }
    },

    disconnectSocket : () => {
        if(get().isConnected){
            socket.disconnect();
            set({ isConnected : false });
        }
    },

    sendMessage : (receiverId: string, senderId : string, content : string) => {
        const socket = get().socket;
        if(!socket) return;
        socket.emit("send_message", { senderId, receiverId, content })
    },

    fetchMessages : async (userId : string) => {
        set({ isLoading: true, error: null });
		try {
			const { data } = await axiosInstance.get(`/users/messages/${userId}`);
			set({ messages: data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
    },
    setSelectedUser : (user) => {
        set({ selectedUser : user })
    }
}))