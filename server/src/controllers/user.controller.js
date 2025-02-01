import { User } from "../models/user.model.js";
export const gatAllUsers = async ( req, res, next ) => {
    try {
        const currentUserId = req.auth.userId
        const users = await User.find( { clerkId : { $ne : currentUserId }});
        console.log("users", users);

        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getAllUsers", error);
        next(error);
    }
}