const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const PORT = process.env.PORT || 5000;

// Route includes
const avatarRouter = require('./routes/avatar.route');
const commentRouter = require('./routes/comment.router');
const followingRouter = require('./routes/following.router');
const imageRouter = require('./routes/image.router');
const likeRouter = require('./routes/like.router');
const promptRouter = require('./routes/prompt.router');
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/avatar', avatarRouter);
app.use('/api/comment', commentRouter);
app.use('/api/following', followingRouter);
app.use('/api/image', imageRouter);
app.use('/api/like', likeRouter);
app.use('/api/prompt', promptRouter);
app.use('/api/user', userRouter);

// Serve static files
app.use(express.static('build'));

// Listen
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));