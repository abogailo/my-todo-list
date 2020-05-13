
//importing modules

const mongo             = require('mongodb')
const connectionString  = 'mongodb+srv://abogailo:9YOokxlwF2qWq3Pa@cluster0-vlfaj.mongodb.net/test?retryWrites=true&w=majority'

const express           = require('express');
const bodyParser        = require('body-parser')
const path = require('path');

//global variables
const app = express();
const PORT = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
let db, toDoCollection;

MongoClient.connect((process.env.MONGODB_URI || connectionString), {
    useUnifiedTopology: true, useNewUrlParser: true
},(err, client) => {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', connectionString);
      }
    db = client.db('to-do-list')
    toDoCollection = db.collection('todos')
  // perform actions on the collection object
});

//config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '/views')));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

app.listen(PORT, function(){
    console.log('listening on' + app.get('port'))
})

app.get('/', (req, res) => {
    console.log(toDoCollection)
    console.log(db)
    console.log("sdkfjlsdjf")
    toDoCollection.find().toArray()

    .then(results => {
    res.render('index.ejs', { todos: results })
    })
    .catch(error => console.error(error))
})

app.get("/todos", (request, response) => {
    toDoCollection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post('/todos', (req, res) => {
    toDoCollection.insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.get("/todos/:id", (request, response) => {
    toDoCollection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.delete("/todos/:id", (req, res) => {
    console.log(req.params.id)
    let id = req.params.id
    toDoCollection.deleteOne({_id: new mongo.ObjectId(id) })
    
    .then(result => console.log(`Deleted ${result.deletedCount} item.`))
    .catch(err => console.error(`Delete failed with error: ${err}`))
    });

app.patch('/todos/:id', (req, res) =>{// {last_name : "smith", age: 44}
    
    let id = req.params.id;
    let today = new Date()
    let dd = today.getDate();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();
    
    
    let dateStr = mm + "-" + dd + "-" + yyyy;
    toDoCollection.updateOne({_id  : new mongo.ObjectId(id)}, {
        $set: { completed: true, completed_date: dateStr}
    });

    
});


