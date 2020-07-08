const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const save = require('./controllers/save');
const posts = require('./controllers/posts');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'speech-to-text'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
  res.json('working');
});

app.post('/signin', (req,res)=>{signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req,res)=>{register.handleRegister(req, res, db, bcrypt)});

app.put('/save',(req,res) => {save.handleSave(req,res,db)});

app.post('/posts',(req,res)=>{posts.handlePosts(req,res,db)});

app.post('/posts',(req,res)=>{posts.updateCount(req,res,db)});

app.listen(process.env.PORT || 2000, () => {
  console.log(`app is running on port 2000`);
});
