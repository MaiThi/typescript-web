import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user.route';
import prodRoute from './routes/product.route';
import config from './config/config';
import http from 'http';
import jwt from 'jsonwebtoken';


const app = express();

/** Connect to Mongo */

mongoose.set("strictQuery", false);
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => console.log(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
  
    app.use((req, res, next) => {
        /** Log the req */
        console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
  
        res.on('finish', () => {
            /** Log the res */
            console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
  
        next();
    });

    
  
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
      if (req.method == 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
          return res.status(200).json({});
      }
  
      next();
  });
//   app.use(bodyParser.json());
//   app.use(bodyParser.urlencoded({
//     extended: true
//   }));

//handle the token
    // app.use((req, res, next) => {
       
    //     if(req.headers.authorization) {
    //         var tokenStr = (<string>req.headers.authorization).split(" ")[1];
    //         jwt.verify(tokenStr, config.jwt.key, (err: any, valid: any ) => {
    //             if(err) {
    //                 res.send({result: "Please give the key"});
    //             }else {
    //                 next()
    //             }
    //         } );
    //     } else {
    //         res.send({result: "Please give the token"});
    //     }
        
    // });

   app.use(express.json());
    /** Routes */
   

    app.use('/users', userRoute);
    app.use('/products', prodRoute);
    //app.use('/products', prodRoute);
    /** Healthcheck */
    app.get('/ping', (req, res) => res.status(200).json({ hello: 'world' }));
    
    app

    http.createServer(app).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
  }
