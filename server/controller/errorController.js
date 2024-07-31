
const AppError = require("../Utils/appError");

const handleJWTError = () => {
    new AppError("Invalid Token , Please Loged In  again", 401);
}


const handleJWTExpiredError = () => {
    new AppError("your Token Expired please LogedIn  again", 401);
}
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid Input Data ${errors.join(". ")}`;
    return new AppError(message , 400);
}
const handleDuplicateFieldsBD = (err) => {
    const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/);
    const message = `Douplicate fields values ${value} H. Plese use another value`;
    return new AppError(message , 400);
}

const handleCastErrorDB = (err) => {
    const message = `Invalid${err.path}: ${err.value}`;
    return new AppError(message , 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}



const sendErrorPro = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        res.status(500).json({
            status: "error",
            message: "someThing went very wrong"
        })
    }
}



module.exports = (err, req, res, next) => {
    // console.log(err)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";


    if (process.env.NODE_ENV === "developement") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = {...err};
        if(error.name === "CastError") error = handleCastErrorDB(error);
        if(error.code === 11000) error = handleDuplicateFieldsBD(error);
        if(error.name === "ValidatorError") error = handleValidationError(error);
        if(error.name === "JsonWebTokenError") error = handleJWTError();
        if(error.name === "TokenExpiredError") error = handleJWTExpiredError();

        sendErrorPro(err, res);
    }
    next();
}
