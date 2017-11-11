var five = require("johnny-five");
var board = new five.Board();

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyAGoUf2bAsiOhV5m0BJ4rxj5yg83LpH9fk",
    authDomain: "exbancodadosnosql.firebaseapp.com",
    databaseURL: "https://exbancodadosnosql.firebaseio.com",
    projectId: "exbancodadosnosql",
    storageBucket: "exbancodadosnosql.appspot.com",
    messagingSenderId: "489509149360"
  };
firebase.initializeApp(config);

board.on("ready", function() {
    var lcd = new five.LCD({
        controller: "JHD1313M1"
    });

    console.log("entrou");
    

    var db = firebase.database().ref("nota");
    db.on('value', function(snapshot) {
        console.log(snapshot.val());
        lcd.bgColor("yellow").cursor(0, 0).print(snapshot.val());
    });
});