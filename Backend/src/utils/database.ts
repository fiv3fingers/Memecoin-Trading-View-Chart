import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/config';

export const connectToDatabase = async () => {
    let isConnected = false;
    const connect = async () => {
        try {
            if (MONGODB_URI) {
                const connection = await mongoose.connect(MONGODB_URI);
                console.log(`MONGODB CONNECTED : ${connection.connection.host}`);
                isConnected = true;
            } else {
                console.log("No Mongo URL");
            }
        } catch (error) {
            console.log(`Error : ${(error as Error).message}`);
            isConnected = false;
            // Attempt to reconnect
            setTimeout(connect, 1000); // Retry connection after 1 seconds
        }
    };

    connect();

    mongoose.connection.on("disconnected", () => {
        console.log("MONGODB DISCONNECTED");
        isConnected = false;
        // Attempt to reconnect
        setTimeout(connect, 1000); // Retry connection after 5 seconds
    });

    mongoose.connection.on("reconnected", () => {
        console.log("MONGODB RECONNECTED");
        isConnected = true;
    });
};
