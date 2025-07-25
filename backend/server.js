const express = require("express")

const app = express();

app.get("/", (req, res)=>{
    res.send("Hello World!")
    console.log("Web Page Reloded!")
});

app.listen(3000, () =>{
    console.log("server running on port 3000")
})