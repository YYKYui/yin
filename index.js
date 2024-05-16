var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
const stringRandom = require('string-random');
var renshu = 0;

// 使用express托管静态资源
app.use(require('express').static('public'));

// 对于处理首页的路由
app.get('/', function(req, res) {
	// 重定向到index.html
	res.redirect('liaotian.html');
});


io.on('connection', function(socket) {
	// 用户连接
	renshu++;
	io.emit('renshu', renshu);
	socket.on('disconnect', function() {
		// 用户断开
		renshu--;
		io.emit('renshu', renshu);
	});

	// 进行消息广播
	socket.on('sendMessage', (data) => {
		// console.log(data);
		io.emit('sendMessage', data);
	});

	// 进行图片消息广播
	socket.on('sendimage', (data) => {
		// console.log(data.img);
		io.emit('sendimage', data);
	});
});

// 服务器监听端口,可修改
http.listen(3000, function() {
	console.log("运行成功，正在监听3000端口");
});
