import app from "./app.js";
import { connectToDatabase, disconnectFromDatabase } from "./src/configs/dbConfig.js";

const port = process.env.PORT;
app.set("port", port || 3000);

// Connect to the database first
connectToDatabase()
    .then(() => {
        // Start the server only after the database connection is established
        const server = app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);

            // Log important information
            console.log("Press Ctrl+C to gracefully shut down the server.");
        });

        // Handle graceful shutdown on SIGINT and SIGTERM signals
        const handleShutdown = async () => {
            console.log("Server shutting down...");

            await disconnectFromDatabase();

            server.close((err) => {
                if (err) {
                    console.error("Error closing the server:", err);
                    process.exit(1); // Exit with error code
                }

                console.log("Server shut down gracefully.");
                process.exit(0); // Exit with success code
            });
        };

        // Listen for SIGINT and SIGTERM signals to gracefully shut down the server
        process.on("SIGINT", handleShutdown);
        process.on("SIGTERM", handleShutdown);
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
