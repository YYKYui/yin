var username;

var socket = io('', {
	path: '/socket.io',
	transports: ['websocket'],
	secure: true,
});

function getCurrentTime() {
	var date = new Date();
	var month = zeroFill(date.getMonth() + 1);
	var day = zeroFill(date.getDate());
	var hour = zeroFill(date.getHours());
	var minute = zeroFill(date.getMinutes());
	var second = zeroFill(date.getSeconds());
	var curTime = "time: " + month + "-" + day +
		" " + hour + ":" + minute + ":" +second;

	return curTime;
}
function zeroFill(i) {
	if (i >= 0 && i <= 9) {
		return "0" + i;
	} else {
		return i;
	}
}
socket.on('renshu', (renshu) => {
	document.getElementById("RS").innerText = "当前在线人数: " + renshu;
})
function SendM() {
	let m = document.getElementById("m");

	if (m.value != "") {
		if (document.getElementById("userDIY").value == "") {
			socket.emit('sendMessage', {
				username: "匿名小白",
				msg: m.value
			});

		} else {
			username = document.getElementById("userDIY").value;
			socket.emit('sendMessage', {
				username: username,
				msg: m.value
			});
		}
		m.value = "";
	}
	document.getElementById('m').focus();
}
document.getElementById("inputImg").onclick = function(e) {
	e.target.value = "";
}

function sendImg(input) {
	let file = input.files[0];
	let size = file.size / 1024;
	let imgTs = document.getElementById("imgTs");
	if (size < 750) {
		let reader = new FileReader();
		imgTs.style.visibility = "visible";
		imgTs.innerText = "读取中...";
		reader.readAsDataURL(file);
		reader.onload = function() {
			if (document.getElementById("userDIY").value == "") {
				imgTs.innerText = "发送中...";
				socket.emit('sendimage', {
					username: "匿名",
					img: reader.result
				});
			} else {
				imgTs.innerText = "发送中...";
				username = document.getElementById("userDIY").value;
				socket.emit('sendimage', {
					username: username,
					img: reader.result
				});
			}
			imgTs.style.visibility = "hidden";
		}
	} else {
	}
	input.value = "";
}


const messages = document.getElementById('messages');
socket.on('sendMessage', function(data) {
	if (data.username == username) {
		messages.innerHTML += '<li class="mySelf"><div class="msgIco"></div><h5>' + getCurrentTime() +
			'</h5> <h4>我 (' + data.username + ')</h4><br /><span>' + data.msg + '</span></li>';
	} else {
		messages.innerHTML += '<li class="qiTa"><div class="msgIco"></div><h4>' + data.username + '</h4> <h5>' +
			getCurrentTime() + '</h5><br /><span>' + data.msg + '</span></li>';
	}
	setTimeout(smoothscroll, 100);
});
socket.on('sendimage', function(data) {
	if (data.username == username) {
		messages.innerHTML += '<li class="mySelf"><div class="msgIco"></div><h5>' + getCurrentTime() +
			'</h5> <h4>我 (' + data.username + ')</h4><br /><img src="' + data.img +
			'" onclick="openYLK(this)" /></li>';
	} else {
		messages.innerHTML += '<li class="qiTa"><div class="msgIco"></div><h4>' + data.username + '</h4> <h5>' +
			getCurrentTime() + '</h5><br /><img src="' + data.img + '" onclick="openYLK(this)" /></li>';
	}
	setTimeout(smoothscroll, 200);
});
function smoothscroll() {
	const currentScroll = messages.scrollTop;
	const clientHeight = messages.offsetHeight;
	const scrollHeight = messages.scrollHeight;
	if (scrollHeight - 10 > currentScroll + clientHeight) {
		window.requestAnimationFrame(smoothscroll);
		messages.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2);
	}
}
document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && e.keyCode == 13) {
		SendM();
	} else if (e && e.keyCode == 113) {
		qKong();
	}
}
function qKong() {
	document.getElementById('m').value = '';
	document.getElementById('m').focus();
}
