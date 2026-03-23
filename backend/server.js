import express from "express"
import { connectDatabase } from "./config/db.js";
import { route } from "./Route/userRoute.js";
import cors from "cors"


const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());
connectDatabase()

app.use("/api", route)


app.listen(port, () => {
    console.log(`Server Connected In Port ${port}`);
})