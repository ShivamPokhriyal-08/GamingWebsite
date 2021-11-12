const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require("mongoose")
const bodyparser = require("body-parser"); // used to process data that come through http req
mongoose.connect('mongodb://localhost/contactGaming');

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String, // restriction in mongoose schema that data type is always string
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

 // Converting or compile schema into model
const Contact = mongoose.model('Contact', contactSchema);  

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);  // jaise hi contact pe koi post req marega vaise hi me ek new Contact obj bnauga kisse banuga jo req.body se ari h usse content leke
    // fr use save krdo but yeh ek promise return magega and Promises are used to handle asynchronous operations in JavaScript.
    myData.save().then(()=>{
        res.send("Items has been saved to database")
    }).catch(()=>{
      res.status(400).send("Items were not saved to data base")
    })
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});