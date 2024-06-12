const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());




const uri = `mongodb+srv://antudas619:${process.env.DB_PASS}@cluster0.dwjlqnc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const events = client.db("events");
    const eventCollection = events.collection("eventCollection");

    // Get all events
    app.get('/events', async(req, res) => {
        const events = eventCollection.find();
        const result = await events.toArray();
        res.send(result.reverse());
    })

    // Get single event
    app.get('/events/:id', async(req, res) => {
      const id = req.params.id;
      const event = await eventCollection.findOne({_id: new ObjectId(id)});
      res.send(event);
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})