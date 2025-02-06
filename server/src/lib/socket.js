import { Server } from 'socket.io'
import { Message } from '../models/message.model.js';


export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3001",
            credentials: true,
        }
    });

    const userSockets = new Map(); // { userId : socketId }
    const userActivities = new Map(); // { userId : activity }

    io.on("connection", (socket) => {
        // connnection between server and client with socket.on
        socket.on("user_connected", (userId) => {
            userSockets.set(userId, socket.id);
            console.log(`User ${userId} connected, socket is ${socket.id}`);
            userActivities.set(userId, "Idle");

            // broadcast to all connected users 
            // io.emit is when server wnat to push to client
            io.emit("user_connected", userId);

            socket.emit("online_users", Array.from(userSockets.keys()))

            io.emit("activities", Array.from(userActivities.entries()))
        })

        socket.on("update_activity", ({ userId, activity }) => {
            console.log("activity", userId, activity);
            userActivities.set(userId, activity);
            io.emit("activity_updated", {userId, activity});
        })

        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data

                const message = await Message.create({
                    senderId,
                    receiverId,
                    content,
                })

                // send to receiver in realtime if they are online ...
                const receiverSocketId = userSockets.get(receiverId)
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("receive_message", message)
                }

                socket.emit("message_sent_to_sender", message)

            } catch (error) {
                console.log("Error in send_message", error);
                socket.emit("message_error", error.message)
            }
        })

        socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId, socketId] of userSockets.entries()) {
				// find disconnected user
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSockets.delete(userId);
					userActivities.delete(userId);
					break;
				}
			}
			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);
			}
		});
    })
}