const dbRef = firebase.database().ref();
var storageRef = firebase.storage().ref();
var database = firebase.database();

let t = setInterval(fetch, 20000);
let url = window.location.href;
let code = url.split("index.html?id=");
console.log(code[1]);
if(code[1]!=undefined) {
  document.getElementById("qrSpan").innerHTML = `Code successfully generated, any device with the same code can share data. (ID: ${code[1]}).`;
  document.getElementById("qrBtn").style.display =  "none";
  document.getElementById("qr").style.display = "block";
document.getElementById("qr").src = "https://chart.googleapis.com/chart?cht=qr&chl=https://bridge.avirana.com/index.html?id=" + code[1] + "&chs=160x160&chld=L|0";

}
function fetch() {
  document.getElementById("status").innerHTML = `Fetching`;
dbRef.child("data/ref/" + code[1]).once('value').then((snapshot) => {
  if (snapshot.exists()) {
    var res = snapshot.val();

document.getElementById("clipboard").value = res.data;
var dateFormat= new Date(res.timestamp);
document.getElementById("device").innerHTML = `Posted on ${dateFormat} by ${res.platform}`;
document.getElementById("status").innerHTML = `<i class="fas fa-check-circle"></i>Fetched`;
}
});
}

let platform;
function post() {
  document.getElementById("status").innerHTML = `Posting`;
  if (navigator.userAgent.match(/Android/i)) {
  platform="Android";
  } else if (navigator.userAgent.match(/iPhone/i)) {
    platform="iPhone";
  } else {
  platform="Windows (PC)";
  }
    firebase.database().ref('data/ref/' + code[1]).set({
        data: document.getElementById('clipboard').value,
        platform: platform,
        timestamp: Math.floor(Date.now())
      });
      document.getElementById("status").innerHTML = "<i class='fas fa-cloud'></i>Posted";
      console.log("posted");
}

function qrGen() {
  let qrStamp= Math.floor(Date.now());
    window.location.href=window.location.href + "index.html?id=" + qrStamp;
}