const dbRef = firebase.database().ref();
var database = firebase.database();

let t = setInterval(fetch, 20000);
let url = window.location.href;
let code = url.split("/Webship/index.html?id=");
console.log(code[1]);

document.getElementById("qr").src = "https://chart.googleapis.com/chart?cht=qr&chl=https://avi-rana-1718.github.io/Webship/index.html?id=" + code[1] + "&chs=160x160&chld=L|0";


function fetch() {
  document.getElementById("device").innerHTML = `Posting`;
dbRef.child("data/ref/" + code[1]).once('value').then((snapshot) => {
  if (snapshot.exists()) {
    var res = snapshot.val();

document.getElementById("clipboard").value = res.data;
var dateFormat= new Date(res.timestamp);
document.getElementById("device").innerHTML = `Posted on ${dateFormat}`;
document.getElementById("status").innerHTML = "Fetched";
}
});
}

let platform;
function post() {
  if (navigator.userAgent.match(/Android/i)==true) {
  platform="Android";
  } else if (navigator.userAgent.match(/iPhone/i)==true) {
    platform="iPhone";
  } else {
  platform="Windows (PC)";
  }
    firebase.database().ref('data/ref/' + code[1]).set({
        data: document.getElementById('clipboard').value,
        platform: platform,
        timestamp: Math.floor(Date.now())
      });
      document.getElementById("status").innerHTML = "Posted";
      console.log("posted");
}

function qrGen() {
  let qrStamp= Math.floor(Date.now());
    window.location.href=window.location.href + "index.html?id=" + qrStamp;
}


