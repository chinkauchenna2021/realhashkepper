const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

// mongoose.connect(process.env.MONGO_CONNECTION).then(()=> {
//     console.log('connection established')
// }).catch((err) => {
//     console.log("connection failed" , err);
// })
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("../routers/MainRouter.js"));

app.listen(PORT, () => console.log("app is running on port 3000"));
