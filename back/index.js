const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {userRouter} = require("./routes/userRoute"); 

const MONGO_URI = 'mongodb+srv://hiyoungkimmy:heeyoung123@cluster0.nxb3hhp.mongodb.net/?retryWrites=true&w=majority';


const server = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('debug', true);
        app.use(express.json());

        app.use('/user', userRouter);

        app.listen(3000, () => console.log('server listening on port 3000'))
    } catch (err) {
        console.log(err);
    }
}

server();