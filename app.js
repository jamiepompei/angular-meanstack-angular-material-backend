let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dataBaseConfig = require('./database/db');

//Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db,{
    userNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connected successfully ')
},
error => {
    console.log('Could not connect to the database: ' + error)
    }
)

//set up express js port
const studentRoute = require('./routes/student.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

//setting up static directory
app.use(express.static(path.join(_dirname, 'dist/angular-meanstack-angular-material')));

//RESTful API root
app.use('/api', studentRoute)

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Connected to port ' + port)
})

//Find 404 and hand over to error handler
app.use((req, res, next)=>{
    next(createError(404));
});

//Index route
app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.json(_dirname, 'dist/angular-meanstack-angular-material/index.html'))
});

//error handler
app.use(function (err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})
