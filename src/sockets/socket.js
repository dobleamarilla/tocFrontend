const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.emit('lal', 'andate a la concha de tu madre');

socket.on('message', (data) => {
    console.log(data);
});
export { socket };