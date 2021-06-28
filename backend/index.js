const express = require('express');
const api_config = require('./config');
const app = express();
const port = api_config.port;
const userRouter = require('./routers/userManager');
const videoRouter = require('./routers/videoManager');
const utilRouter = require('./routers/util');
const queryRouter = require('./routers/queryManager');
const commentRouter = require('./routers/commentManager');
const solutionRouter = require('./routers/solutionManager');


// This is how to initialize Socket.io at backend
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('client connected!!');

    socket.on('sendmsg', (data) => {
        console.log('a message from client');
        console.log(data);

        data.reply = false;
        socket.to(data.community).emit('recmsg', data);
    })

    socket.on('join', (data) => {
        console.log(data);
        socket.join(data);
    })

})


const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/util', utilRouter);
app.use('/video', videoRouter);
app.use('/query', queryRouter);
app.use('/comment', commentRouter);
app.use('/solution', solutionRouter);

app.use(express.static('./uploads'))

server.listen(port, () => {
    console.log('Hurray!!!!! server started on port ' + port);
});