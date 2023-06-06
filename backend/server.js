import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import mongoData from "./mongoData";

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://VatsalAjmeri:20dcs001@cluster0.rkudppk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
    console.log(`DB connected`);

})

app.get("/", (req, res) => {
    res.status(200).send("Hello Vatsal here");
});

app.post("/new/channel", (req, res) => {
    const dbData = req.body;

    mongoData.create(dbData, (err, data) => {
        if (err) {
             res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.post("/new/message", (req, res) => {
    const id = req.query.id;
    const newMessage = req.body;

    mongoData.update(
        {_id: id },
        { $push: { conversation: newMessage }},
        (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            }
        }
    );
    
});

app.get("/get/channelList", (req, res) => {
    mongoData.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            let channels = [];

            data.map(channelData => {
                const channelInfo = {
                    id: channelData._id,
                    name: channelData.channelName
                }

                channels.push(channelInfo);
            });
            res.status(200).send(channels);
        }
    });
});

app.get("/get/conversation", (req, res) => {
    const id = req.query._id;

    mongoData.find({ _id: id }, (err, data) => {
        if (err) {
             res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`LISTENING TO PORT 9000`);
});