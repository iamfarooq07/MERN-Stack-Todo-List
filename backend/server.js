import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import { route } from "./Route/userRoute.js";
import { todoRoute } from "./Route/todoRoute.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// connectDatabase();


app.use("/api", route);
app.use("/api/todos", todoRoute);

connectDatabase().then(() => {
    app.listen(port, (req, res) => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.log(error);

})
