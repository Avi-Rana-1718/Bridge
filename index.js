const dbRef = firebase.database().ref();
var database = firebase.database();

function fetch() {
dbRef.child("data/ref/avi").once('value').then((snapshot) => {
  if (snapshot.exists()) {
    var res = snapshot.val();
console.log(res.data);
document.getElementById("clipboard").value = res.data;
}
});
}

function post() {
    firebase.database().ref('data/ref/avi').set({
        data: document.getElementById('clipboard').value
      });
      console.log("posted");
      fetch();
}

function qrGen() {
    document.getElementById("qr").src = "https://chart.googleapis.com/chart?cht=qr&chl=xqr&chs=160x160&chld=L|0";
}