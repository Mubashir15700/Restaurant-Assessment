import express from "express";
import cors from "cors";
import corsOptions from "./src/configs/corsOptions.js";
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import menuRoutes from "./src/routes/menuRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/api/test", (req, res) => {
    res.send("Hello World!");
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

// Global error handling middleware
app.use(errorMiddleware);

export default app;
