import { Song } from "../models/song.model.js";

export const getAllSongs = async ( req, res, next ) => {
    try {
        //  -1 means descending order
        // 1 means ascending order
        // createdAt: -1 means sort by createdAt in descending order (most recent first)

        const songs = await Song.find().sort( { createdAt: -1 } );
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in getAllSongs Controller", error);
        next(error);
    }
}

export const getFeaturedSongs = async ( req, res, next ) => {
    try {
        // fetch 6 random songs using mongoose's aggregate 
        const songs = await Song.aggregate([
            {
                $sample: { size: 6}
            },
            {
                $project : {
                    _id : 1,
                    title : 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])

        res.status(200).json(songs);

    } catch (error) {
        console.log("Error in getFeaturedSongs Controller", error);
        next(error);
    }
}

export const getMadeForYouSongs = async ( req, res, next ) => {
    try {
        // fetch 4 random songs using mongoose's aggregate 
        const songs = await Song.aggregate([
            {
                $sample: { size: 4}
            },
            {
                $project : {
                    _id : 1,
                    title : 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])

        res.status(200).json(songs);
        
    } catch (error) {
        console.log("Error in getMadeForYouSongs Controller", error);
        next(error);
    }
}

export const getTrendingSongs = async ( req, res, next ) => {
    try {
        // fetch 4 random songs using mongoose's aggregate 
        const songs = await Song.aggregate([
            {
                $sample: { size: 4}
            },
            {
                $project : {
                    _id : 1,
                    title : 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])

        res.status(200).json(songs);
        
    } catch (error) {
        console.log("Error in getTrendingSongs Controller", error);
        next(error);
    }
}