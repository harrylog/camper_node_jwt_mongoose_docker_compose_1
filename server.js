const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const cookieParser = require('cookie-parser');
const errHandler = require('./middleware/error')
//Route files 
const logger = require('./middleware/logger')

//https://documenter.getpostman.com/view/8923145/SVtVVTzd?version=latest#c49b95be-b3e4-42b2-8320-20727257d3dc

//load env vars
dotenv.config({ path: './config/config.env' })

//connect to db
connectDB();

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express();

//body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser());

//Dev logging middleware
app.use(logger) // custom made
if (process.env.NODE_ENV == 'development') { 
    app.use(morgan('dev'));
}

//mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

app.use(errHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`server is running in ${process.env.NODE_ENV}`.yellow.bold);
    console.log(`server is running on port ${PORT}`.yellow.italic);


})           

//handle unhandled rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`ERROR:${err.message}`.red);
    //close server and exit proc
    server.close(()=>{process.exit(1)})
})    

