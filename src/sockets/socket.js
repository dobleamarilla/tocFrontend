const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.emit('test', 'andate a la concha de tu madre');

socket.on('resDatafono', (data) => {
    console.log(data);
});

socket.on('test', (data) => {
    console.log(data);
});
export { socket };