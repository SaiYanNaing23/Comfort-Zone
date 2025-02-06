export interface User {
	_id: string;
	clerkId: string;
	fullName: string;
	imageUrl: string;
}
export interface Song {
    _id : string;
    title : string;
    artist : string;
    albumId : string | null;
    imageUrl : string;
    audioUrl : string;
    duration : number;
    createdAt : string;
    updatedAt : string;
}

export interface Album {
    _id : string;
    title : string;
    artist : string;
    imageUrl : string;
    releaseYear : number;
    songs : Song[];
}

export interface Stats {
    totalSongs : number;
    totalAlbums : number;
    totalUsers : number;
    totalArtists : number;
}

export interface MusicStore {
    albums : Album[];
    songs : Song[];
    isLoading : boolean;
    error : string | null;
    currentAlbum : Album | null;
    madeForYouSongs : Song[];
    featuredSongs : Song[];
    trendingSongs : Song[];
    stats : Stats;

    fetchingAlbums : () => Promise<void>;
    fetchAlbumById : (id: string) => Promise<void>;
    fetchMadeForYouSongs : () => Promise<void>;
    fetchFeaturedSongs : () => Promise<void>;
    fetchTrendingSongs : () => Promise<void>;
    fetchStats : () => Promise<void>;
    fetchSongs : () => Promise<void>;
    deleteSong : (id: string) => Promise<void>;
    deleteAlbum : (id: string) => Promise<void>;
    createSong : (formData : FormData) => Promise<void>;
}

export interface Message {
    _id : string;
    senderId : string;
    receiverId : String;
    content : string;
    createdAt : string;
    updatedAt : string;
}
export interface ChatStore {
    users : any[],
    isLoading : boolean,
    error : string | null,
    socket : any;
    isConnected : boolean;
    onlineUsers : Set<string>;
    userActivities : Map<string, string>;
    messages : Message[];
    selectedUser : User | null;
    
    fetchUsers : () => Promise<void>;
    initSocket : (userId : string) => void;
    disconnectSocket : () => void;
    sendMessage : ( receiverId: string, senderId : string, content : string) => void;
    fetchMessages : (userId : string) => Promise<void>;
    setSelectedUser: ( user: User | null ) => void;
}

export interface AuthStore {
    isAdmin : boolean;
    isLoading : boolean;
    error : string | null,

    checkingAdminStatus : () => Promise<void>;
    reset : () => void;
}

export interface SectionGridProps {
    title : string;
    songs : Song[];
    isLoading : boolean;
    error : string | null;
}

export interface PlayerStore {
    currentSong : Song | null;
    isPlaying :boolean;
    queue : Song[];
    currentIndex : number;

    initializeQueue : (songs : Song[]) => void;
    playAlbum : (songs : Song[], startIndex?: number) => void;
    setCurrentSong : (song : Song | null) => void;
    togglePlay : () => void;
    playNext : () => void;
    playPrevious : () => void;
}
