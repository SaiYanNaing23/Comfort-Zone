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

export interface MusicStore {
    albums : Album[];
    songs : Song[];
    isLoading : boolean;
    error : string | null;
    currentAlbum : Album | null;
    madeForYouSongs : Song[];
    featuredSongs : Song[];
    trendingSongs : Song[];

    fetchingAlbums : () => Promise<void>;
    fetchAlbumById : (id: string) => Promise<void>;
    fetchMadeForYouSongs : () => Promise<void>;
    fetchFeaturedSongs : () => Promise<void>;
    fetchTrendingSongs : () => Promise<void>;
}

export interface ChatStore {
    users : any[],
    isLoading : boolean,
    error : string | null,

    fetchUsers : () => Promise<void>;
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
