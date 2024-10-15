require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routing = require("./routing");
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/", routing);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.BACKEND_PORT}`);
});
