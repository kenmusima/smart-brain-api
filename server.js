const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'Ken',
		password : '123',
		database : 'smart-brain' 
	}
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();

app.use(cors());
app.use(bodyParser.json());
// const database = {
// 	users: [
// 		{
// 			id:'123',
// 			name:'Jon',
// 			email: 'kingslayer@gmail.com',
// 			password: 'king of the north',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id:'144',
// 			name:'Danareys',
// 			email: 'queen@gmail.com',
// 			password: 'Tagaryan',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	]
// }

app.get('/', (req, res) => {
	res.send('fggggg')
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req,res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})

/*
?
/ --> res= this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET =user
/image --> PUT --> user

*/