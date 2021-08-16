const express = require('express');


require('./src/db/conn');

const app = express();
const port = process.env.PORT || 4000;

const User = require("./src/models/userModel");
const router1 = require("./src/routers/user");

app.use(express.json());
app.use(router1);


app.listen(port, () => {
    console.log(`connection created at port no ${port}`);
})

