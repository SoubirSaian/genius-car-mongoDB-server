const express = require('express');

// import mongo db 
const { MongoClient } = require('mongodb');

// import cors 
const cors = require('cors');

// configure dotenv 
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())

// myMongoDb1
// 2fIoBfbWCFNO9Cf7

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncoou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);
async function run(){
    try{
        await client.connect();
        
        const database = client.db('carMechanic')
        const serviceCollection = database.collection('services');

        app.post('/services',async (req,res)=>{
            const service = req.body;
             console.log('data hitting',service)

            const result = await serviceCollection.insertOne(service);
            // console.log(result);
            res.json(result);
        });

        // get api 
        app.get('/services',async (req,res)=>{
            const cursor = serviceCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })

    }
    finally{
        // await client.close();
    }
};

run().catch(console.dir);



app.get("/",(req,res)=>{
    res.send("server is working smoothly");
});

app.listen(port,()=>{
    console.log("server hitting successfully");
});