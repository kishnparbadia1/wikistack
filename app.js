const express = require('express');
const layout = require('./views/layout')
const { db } = require('./models')


//logging middleware keeps a log of every http request stdout shows what is inside
const morgan = require('morgan');
//const { INITIALLY_DEFERRED } = require('sequelize/types/lib/deferrable');

//allows us to use express libray methods
const app = express()

//starts listening to all logs
app.use(morgan("dev"))

//serves up static file from some kind of public folder by default looks for index.js file in public folder. link handler displays error to user

//method that allows you have access to public folder
app.use(express.static(__dirname + "/public"));

//when we receive information in object formats it so that it only shows us relevent information
app.use(express.urlencoded({extended: false}))



try{
  db.authenticate()
    console.log('connected to database')
} catch(err){
    console.log(err)
}


const PORT = 5432;

//using async because were going to await for a promise
const createinitialtables = async () => {
  await db.sync({force: true})
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

createinitialtables()



app.get('/', (req, res, next) => {
  res.send(layout('Hello World'))
})


app.listen(3000, () => {
  console.log(`App listening at http://localhost:3000`);
});
