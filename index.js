import express from "express";
import axios from "axios";
import 'dotenv/config';

const app = express();

const apiKey = process.env.API_KEY;
const url = process.env.API_URL;
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.post("/weather", async (req, res) => {

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const config = { params: {  key: apiKey, q : `${latitude}, ${longitude}` }};

    try {
        const response = await axios.get(`${url}`, config);
        const result = response.data;
        res.render("index.ejs", { content : result });
      } catch (error) {
        console.error("Failed: ", error.message);
        res.render("index.ejs", { error: error.message });
      }
});

app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
});