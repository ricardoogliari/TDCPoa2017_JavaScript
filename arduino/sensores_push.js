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

var FCM = require('fcm-push');

var serverKey = 'AIzaSyDsCCWnkBBumuR4gmtRHvCd7LrkS-Sh5G8';
var fcm = new FCM(serverKey);

var messageOn = {
    to: 'e8_C8V6hHEI:APA91bHYz3TSjZvd4444CRGa2JRIYBnwnT1_FlIvHYLoqFlPRKP8DKhmdf6izp8IdcKZ0vTN3XT0hcET4hnd21c8sy4Jof5jDYCVWTOtRwKoCfctQhlJ4efirirwVgKd_tTwopcKsIj2', // required
    data: {
        estado: 'Ligado'
    },
    notification: {
        title: 'Música pausada',
        body: 'Usuário pausou a musica'
    }
};

board.on("ready", function() {
  var light = new five.Light("A0");
  light.on("change", function() {
    //console.log(this.level);
    firebase.database().ref('luz/').set({
        valor: this.level
    });
  });

  var rotary = new five.Sensor("A1");

  // Set scaling of the Rotary angle
  // sensor's output to 0-255 (8-bit)
  // range. Set the LED's brightness
  // based on the value of the sensor.
  rotary.on("change", function() {
    console.log(rotary.scaleTo(0, 16));
    firebase.database().ref('potenciometro/').set({
        valor: rotary.scaleTo(0, 16)
    });
  });

  var touch = new five.Button(6);
  touch.on("press", function() {
    console.log("touch");
    firebase.database().ref('touch/').set({
        valor: true
    });

    fcm.send(messageOn, function(err, response){
        if (err) {
            console.log("Something has gone wrong! " + err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
  });

  touch.on("release", function() {
    console.log("release");
    firebase.database().ref('touch/').set({
        valor: false
    });
  });
});