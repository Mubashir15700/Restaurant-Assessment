import mongoose from "mongoose";

let isConnected = false; // Flag to track connection status

export const connectToDatabase = async () => {
    try {
        const URL = process.env.DB_URL;

        if (!URL) {
            throw new Error("Database URL is not defined in the environment variables.");
        }

        mongoose.set("strictQuery", false);

        if (isConnected) {
            console.log("Already connected to the database.");
            return;
        }

        await mongoose.connect(URL);

        console.log("Connected to database succesfully.");
        isConnected = true; // Set isConnected to true on successful connection
    } catch (error) {
        console.log("Error connecting to the database: ", error.message);
        process.exit(1); // Exit the process with failure
    }
};

export const disconnectFromDatabase = async () => {
    try {
        if (isConnected) {
            await mongoose.connection.close();
            console.log("Database disconnected succesfully");
            isConnected = false; // Reset isConnected on disconnection
        }
    } catch (error) {
        console.log(`Error closing the database connection: ${error}`);
    }
};
