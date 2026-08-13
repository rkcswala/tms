import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
dotenv.config();
const app = express();

import connectdb from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





connectdb();

// routes.........

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);





// Static Routes....


app.get("/",(req, res)=>{
    res.send('server is start! ')
})




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.bgRed);
})