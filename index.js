const dbRef = firebase.database().ref();
var database = firebase.database();

let t = setInterval(fetch, 20000);

function fetch() {
dbRef.child("data/ref/avi").once('value').then((snapshot) => {
  if (snapshot.exists()) {
    var res = snapshot.val();
console.log(res.timestamp);
document.getElementById("clipboard").value = res.data;
var dateFormat= new Date(res.timestamp);
document.getElementById("device").innerHTML = `Posted from ${res.platform} on ${dateFormat}`;
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
    firebase.database().ref('data/ref/avi').set({
        data: document.getElementById('clipboard').value,
        platform: platform,
        timestamp: Math.floor(Date.now())
      });
      document.getElementById("status").innerHTML = "Posted";
      console.log("posted");
}

function qrGen() {
    document.getElementById("qr").src = "https://chart.googleapis.com/chart?cht=qr&chl=xqr&chs=160x160&chld=L|0";
}


