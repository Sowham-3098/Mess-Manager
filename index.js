const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.get('/', (req, res) => {
    res.send("Hello");
})

app.listen(process.env.PORT ||3000, function() {
    console.log("Server is running");
});
