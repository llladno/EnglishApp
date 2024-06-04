import express from 'express'
import mongodb, { ObjectId } from 'mongodb'
import bodyParser from 'body-parser'
import csv from 'fast-csv'
import fs from 'fs'

const app = express()
import cors from 'cors'


const port = 3005
app.listen(port, () => {
  console.log('We are live on ' + port)
})
app.use(bodyParser.json())
app.use(cors())


import { MongoClient, ServerApiVersion } from 'mongodb'
import { log } from 'node:util'
// const uri = "mongodb+srv://man30968:56YxZNv2nOn2Jgd0@englishapp.mbylg4j.mongodb.net/?retryWrites=true&w=majority&appName=EnglishApp";
const uri = 'mongodb://127.0.0.1:27017/'
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
      console.log('this')
      const result = await client.db('EnglishApp').collection(collection).insertOne(query)
      return result
    } else if(method === 'replace') {
      const result = await client.db('EnglishApp').collection(collection).replaceOne(query.find, query.replace)
      return result
    } else if(method === 'push'){
      console.log(query.push)
      const result = await client.db('EnglishApp').collection(collection).updateOne(query.find, {$push: {
         words: {$each: query.push.words}
        }})
      return result
    } else if(method === 'increment'){
      const result = await client.db('EnglishApp').collection(collection).updateOne(query.find, {$inc: query.replace})
      return result
    } else if(method === 'pushComplete'){
      const result = await client.db('EnglishApp').collection(collection).updateOne(query.find, {$addToSet: {
          complite: query.push
        }})
      return result
    } else if(method === 'addToSetWords'){
      const result = await client.db('EnglishApp').collection(collection).updateOne(query.find, {$addToSet: {
          words: { $each: query.push }
        }})
      return result
    } else if(method === 'updateOne'){
      const cursor = await client.db('EnglishApp').collection(collection).updateOne(query.find, query.update)
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
    // await client.close()
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
      let body = req.body
      await baseQuery({theme: body.settings.theme, level: body.settings.level, category: body.settings.category, words: body.words}, 'insert', 'Lessons').catch((e) => console.log(e))
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

app.get('/lessons', async (req, res) => {
  const value = await baseQuery({}, 'find', 'Lessons')
  console.log(value)
  const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );
  res.send(groupBy(value, 'category'))
})

app.get('/lessons/:id', async (req, res) => {

  console.log(req.params.id)
  const id = new ObjectId(req.params.id)
  const value = await baseQuery({_id: id}, 'find', 'Lessons')
  console.log(value)
  res.send(value[0])
})

app.get('/csv', async (req, res) => {
  let arr = []
  await fs.createReadStream('./assets/EnglishApp.csv').pipe(csv.parse({headers: true})).
  on('data', async (row) => {
    arr.push(row)
      // const value = await baseQuery({ theme: row.theme ,category: row.category }, 'find', 'Lessons').then(async (res)=> {
      //   if (res.length === 0) {
      //     await baseQuery({
      //       theme: row.theme,
      //       level: row.level,
      //       category: row.category,
      //       words: [{ word: row.word, translate: row.translate }]
      //     }, 'insert', 'Lessons').catch((e) => console.log(e))
      //   } else {
      //     let data = {
      //       theme: row.theme,
      //       level: row.level,
      //       category: row.category,
      //       words: [{ word: row.word, translate: row.translate }]
      //     } //TODO Сделать
      //     await baseQuery({
      //       find: { theme: row.theme, category: row.category },
      //       push: { words: data.words }
      //     }, 'push', 'Lessons').catch((e) => console.log(e))
      //   }
      // })
  }).on('end', async ()=>{
    const groupBy = (items, key) => items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [
          ...(result[item[key]] || []),
          item,
        ],
      }),
      {},
    );
    console.log('CSV file successfully processed')
    let result = []
    arr = groupBy(arr, 'theme')
    for (let theme in arr){
      console.log(theme)
      let sortwords = []
      sortwords = arr[theme].map(el => ({word: el.word, translate: el.translate}))
      const dataToSet = {
        theme: theme,
        level: arr[theme][0].level,
        category:  arr[theme][0].category,
        words: sortwords
      }
      console.log(dataToSet)
      await baseQuery(dataToSet, 'insert', 'Lessons').catch((e) => console.log(e))
    }
    res.send(arr)
  })
})


app.get('/user/:uuid', async (req, res) => {
  const uuid = new ObjectId(req.params.uuid)
  const value = await baseQuery({_id: uuid}, 'find', 'Users')
  res.send(value[0])
})

app.patch('/user/:uuid/complete_lesson', async (req, res) => {
//TODO Сделать запрос на сервер для добавления правильных ответов и денег
  const {money} = req.body
  const uuid = new ObjectId(req.params.uuid)
  console.log(req.body)
  // await baseQuery({find: { _id: uuid }, replace: {money: money}}, 'increment', 'Users')
  await baseQuery({find: {_id: uuid}, push: {lessonid: req.body._id, theme: req.body.theme, category: req.body.category}}, 'pushComplete', 'Users').then(async ()=>{
    await baseQuery({find: {_id: uuid}, push:req.body.words}, 'addToSetWords', 'Users')
  })
})

app.patch('/user/:uuid/remove_heart', async (req, res) => {
  await baseQuery({find: { _id: new ObjectId(req.params.uuid)}, update: {$inc: {health: -1}} }, 'updateOne', 'Users')
})