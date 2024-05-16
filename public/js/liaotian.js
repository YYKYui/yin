window.onload = function() {
	document.getElementById('m').focus();
}
function topExtend(te) {
	let topImg = document.getElementById("topImg");
	if (te == 1) {
		TE1 = true;
		topImg.style.height = "6rem";
	} else {
		TE1 = false;
		topImg.style.height = "2rem";
	}
}
document.addEventListener('touchmove', function(ev) {
	ev.preventDefault();
}, {
	passive: false
});
function closeYLK() {
	document.getElementById("YLK").style.visibility = "hidden";
}
window.onresize = function() {
	closeYLK();
}
function openYLK(img) {
	document.getElementById("ylImg").src = img.src;
	document.getElementById("YLK").style.visibility = "visible";
	let yulanImg = document.getElementById("yulanImg");
	let ylImg = document.getElementById("ylImg");
	let chaWin = window.innerHeight / window.innerWidth;
	let chaImg = img.height / img.width;
	if (chaWin > chaImg + 0.1) {
		yulanImg.style.height = "auto";
		yulanImg.style.width = "80%";
		ylImg.style.height = "auto";
		ylImg.style.width = "100%";
	} else {
		yulanImg.style.height = "80%";
		yulanImg.style.width = "auto";
		ylImg.style.height = "100%";
		ylImg.style.width = "auto";
	}
}
function tbuName() {
	if (document.getElementById("userDIY").value == "") {
		document.getElementById("nowName").innerText = "匿名";
	} else {
		document.getElementById("nowName").innerText = document.getElementById("userDIY").value;
	}
}
function okCOls() {
	document.getElementById("userData").style.top = "-100%";
}
function okOpen() {
	document.getElementById("userData").style.top = "0";
	document.getElementById("userDIY").focus();
}
