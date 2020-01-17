const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const promptRouter = require('./routes/prompt.router');
const imageRouter = require('./routes/image.router');




// AWS stuff
// const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const bluebird = require('bluebird');
// const multiparty = require('multiparty');

// // configure the keys for accessing AWS
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// // configure AWS to work with promises
// AWS.config.setPromisesDependency(bluebird);

// // create S3 instance
// const s3 = new AWS.S3();

// // abstracts function to upload a file returning a promise
// const uploadFile = (buffer, name, type) => {
//   const params = {
//     ACL: 'public-read',
//     Body: buffer,
//     Bucket: process.env.S3_BUCKET,
//     // ContentEncoding: 'base64',
//     ContentType: type.mime,
//     Key: `${name}.${type.ext}`
//   };
//   return s3.upload(params).promise();
// };

// // Define POST route for AWS
// app.post('/test-upload', (request, response) => {
//   const form = new multiparty.Form();
//     form.parse(request, async (error, fields, files) => {
//       if (error) throw new Error(error);
//       try {
//         const path = files.file[0].path;
//         const buffer = fs.readFileSync(path);
//         const type = fileType(buffer);
//         const timestamp = Date.now().toString();
//         const fileName = `bucketFolder/${timestamp}-lg`;
//         const data = await uploadFile(buffer, fileName, type);
//         return response.status(200).send(data);
//       } catch (error) {
//         return response.status(400).send(error);
//       }
//     });
// });




// Body parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/prompt', promptRouter);
app.use('/api/image', imageRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
