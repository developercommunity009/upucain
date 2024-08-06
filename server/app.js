const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const path = require('path')
const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const { createServer} =  require("http");
const { Server } = require("socket.io");
const AppError = require("./Utils/appError");
const globalErrorHandler = require("./controller/errorController");


const usersRouter = require("./routes/userRouter");
const { initializeSocketIO } = require("./socket/index.js");



dotenv.config({path : "./config.env"});
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {                    // <===
    pingTimeout: 60000,
    cors: {
      origin: `http://localhost:5173`,
      credentials: true,
      },
  });
  
  app.set("io", io); 
 
app.use(express.json({limit : "10kb"}));
app.use(bodyParser.json())

// Data sanitization against NoSQL query Injection
app.use(mongoSanitize());



app.get("/" , (req, res) => {
    res.json("UPU-Chain Corrier Project")
})

// Secure Header HTTP
app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Enable sending cookies with CORS
  }));
  
  // Middleware to parse JSON requests
  app.use(express.json());
  
  app.get('/api/user/me', (req, res) => {
    // Your logic to get user data
    res.json({ id: 1, name: 'John Doe' });
  });
  
  
  
  //  Globle MiddelWare
if(process.env.NODE_ENV == "developement"){
    app.use(morgan("dev"))
    }

    
const ratelimit = rateLimit({
    // if user trafic are high on webste then can incress the value of max
    max :1000,
    windowMs: 60 * 60 * 1000,
    message:" Too many request from this IP , pleace try again an hour",
})

// here we are apply Limit on every Single Route
app.use("/api" , ratelimit);

// SERVING TEMPLATE DATA
app.use('/static', express.static(path.join(__dirname, 'public/assets')))




app.use("/api/v1/users" , usersRouter );
app.use("/api/v1/company" , companyRoutes );
app.use("/api/v1/shipment" , shipmentRoutes );
app.use("/api/v1/tracking" , trackingRoutes );
app.use("/api/v1/invoice" , invoiceRoutes );

initializeSocketIO(io);

app.all("*" , (req , res, next)=>{
    
    next( new AppError(`Can't find ${req.originalUrl} on this server` , 404))
})

// Globle error handling
app.use(globalErrorHandler)



// module.exports = app; 
module.exports = httpServer;