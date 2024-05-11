import express from 'express'
import mongodb from 'mongodb'
import bodyParser from 'body-parser'

const app = express()
import cors from 'cors'


const port = 3005
app.listen(port, () => {
  console.log('We are live on ' + port)
})
app.use(bodyParser.json())
app.use(cors())


import { MongoClient, ServerApiVersion } from 'mongodb'
// const uri = "mongodb+srv://man30968:56YxZNv2nOn2Jgd0@englishapp.mbylg4j.mongodb.net/?retryWrites=true&w=majority&appName=EnglishApp";
const uri = 'mongodb://localhost:27017/'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const uri = 'mongodb://adminEnglishApp:qwerty@109.68.215.157:27017/?authMechanism=DEFAULT'
//'mongodb://adminEnglishApp:qwerty@109.68.215.157:27017/?authMechanism=DEFAULT'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false })

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('EnglishApp').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

run().catch(console.dir)
//mongodb://adminEnglishApp:qwerty@109.68.215.157:27017
//109.68.215.157
// adminEnglishApp

async function baseQuery(query, method, collection) {
  try {
    await client.connect()
    // const database = client.db('EnglishApp')
    // const data = database.collection('Users')
    if (method === 'insert') {
      const result = await client.db('EnglishApp').collection(collection).insertOne(query)
      return result
    } else if(method === 'replace') {
      const result = await client.db('EnglishApp').collection(collection).replaceOne(query.find, query.replace)
      return result
    } else if(method === 'push'){
      const result = await client.db('EnglishApp').collection(collection).updateOne(query.find, {$push: query.push})
      return result
    }
    else {
      const cursor = await client.db('EnglishApp').collection(collection).find(query)
      const result = await cursor.toArray()
      return result
    }
  } catch (err) {
    console.log(err)
    return 'error'
  } finally {
    await client.close()
  }
}

async function test() {
  try {
    await client.connect()
    console.log('work')
    await client.db('EnglishApp').collection('EnglishApp').find().toArray(function(err, result) {
      if (err) throw err
      console.log(result)
    })
  } finally {
    await client.close()
  }
}

test().catch(console.dir)

app.get('', async (req, res) => {
  const value = await baseQuery({}, 'find')
  res.send(value)
})

app.post('/registration', async (req, res) => {
  const check = await baseQuery(req.body, 'find', 'Users')
  if (check.length > 0) res.status(401).send(false)
  else {
    const value = await baseQuery(req.body, 'insert', 'Users')
    if (value.insertedId) res.status(200).send(true)
    else res.status(422).send(false)
  }
})

app.post('/login', async (req, res) => {
  const value = await baseQuery(req.body, 'find', 'Users')
  value.length > 0 ? res.send(value[0]) : res.status(401).send(false)
})

app.post('/words', async (req, res) => {
  console.log(req.body)
  const value = await baseQuery({ theme: req.body.settings.theme ,category: req.body.settings.category }, 'find', 'Lessons').then(async (res)=>{
    if (res.length === 0) {
      await baseQuery(req.body[0], 'insert', 'Lessons').catch((e) => console.log(e))
    } else {
      let data = {
        ...req.body.settings,
        words: req.body.words
      } //TODO Сделать
      await baseQuery({ find: { theme: req.body.settings.theme ,category: req.body.settings.category}, push: {words: data.words}}, 'push', 'Lessons').catch((e) => console.log(e))
    }
  })
  // if (value.length === 0) {
  //   let value2 = await baseQuery(req.body[0], 'insert', 'Lessons').catch((e) => console.log(e))
  //   console.log(value2)
  // }
  // console.log(value)
  // console.log(req.body)
})


