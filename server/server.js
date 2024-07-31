const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app =require("./app");


process.on("uncaughtException" , (err)=>{
    console.log("uncaughtException Shutting down application");
    console.log(err.name , err.message);
    process.exit(1);
})


dotenv.config({path : "./config.env"});
const DB = process.env.DATABASE;

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('Database connection error:', err));


const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`App listing on port  ${port}....`);
})


process.on("uncaughtException" , (err)=>{
    console.log("uncaughtException Shutting down application");
    console.log(err.name , err.message);

    server.close(()=>{
        process.exit(1);
    })
})


