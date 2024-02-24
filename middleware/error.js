
const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {

    let error = { ...err }
    //log for dev

    error.message = err.message
    console.log(err)

    console.log(err.stack.blue)


    //mongoose baf obj ID
    console.log(err.name.blue)
    if (err.name == 'CastError') {
        const message = `SRC NOT A FORMATTED OBJ ID bootcamp not found with id ${err.value}`;
        error = new ErrorResponse(message, 404)
    }

    // mongoos dup key
    if (err.code === 11000) {
        const msg = `duplicate field val entered`
        error = new ErrorResponse(msg, 400)
    }

    //mongoose validation err

    if (err.name == 'ValidationError') {
        const msg = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(msg, 400)

    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server err'
    })
}

module.exports = errorHandler; 