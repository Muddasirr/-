const express = require('express'); 
const mongoose = require('mongoose');
const app = express();  
const port= 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
async function connectToDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/new")
        console.log("Connected to DB")
    } catch (error) {
        console.error(error)
    }
}

connectToDB()

const router=require('./routes/index')

app.use('/',router);




app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`)    
})