var admin = require("firebase-admin");
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');


/*app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});*/
// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fit3140assignment2group55.firebaseio.com"  // IMPORTANT: repalce the url with yours 
});
// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/motionSensorData"); // channel name
ref.on("value", function(snapshot) {   //this callback will be invoked with each new object
  console.log(snapshot.val());         // How to retrive the new added object
}, function (errorObject) {             // if error
  console.log("The read failed: " + errorObject.code);
});

//var b = require('bonescript');
var msgCount = 0;
var led = "P8_13";
//b.pinMode(led, 'out');
//b.pinMode('P8_19', b.INPUT);
var detect = 0;
var firstZeroes = true;
var zeroesSeen = 0;
var longCount = 0;
var shortCount = 0;
var sensorRead = true;
var personTwo = false;






io.on('connection', function(socket){
    console.log('Client Connected!');

    socket.on('ledOn', function() {
        b.digitalWrite(led, 1);
        console.log('LED On!');
        socket.emit('ledOnSuccess', 'LED Turned On');


    });


    socket.on('ledOff', function() {
        b.digitalWrite(led, 0);
        console.log('LED Off!');
        socket.emit('ledOffSuccess', 'LED Turned Off');


    });


    socket.on('sensorOn', function() {
        sensorRead = true;
        console.log('Sensor On!');
        socket.emit('sensorOnSuccess', 'Sensor Turned On');


    });


    socket.on('sensorOff', function() {
        sensorRead = false;
        console.log('Sensor Off!');
        socket.emit('sensorOffSuccess', 'Sensor Turned Off');


    });


    socket.on('resetDB', function() {
        //admin.database().ref("/motionSensorData").remove();
        console.log('Database Reset!');
        socket.emit('resetDbSuccess', 'Database has been reset');


    });


    socket.on('personDetected', function() {
        personDetected();


    });

    socket.on('personTwoDetected', function() {
        personTwo = true;


    });



    //event for recognizing when a player leaves
    socket.on('disconnect', function() {
        console.log('Client left');


    });


});













server.listen(5000, function() {
    console.log("Listening on port 5000");
});



/*
function lightOff() {
    b.digitalWrite(led, 0);
    personTwo = false;


}


function simPersonDetected() {
    if (personTwo){
        setTimeout(lightOff, 5000);

    }
    else {
        setTimeout(lightOff, 100);
    }


}


function personDetected() {
    b.digitalWrite(led, 1);
    setTimeout(simPersonDetected, 18000);

}

function checkPIR(){
    if (sensorRead) {
        b.digitalRead('P8_19', printStatus);
    }
    else {
        b.digitalRead('P9_14', printStatus);
    }

}

function identifyLength(motions) {
    if(motions > 3) {
        longCount += 1;
        msgCount += 1;
        ref.push({
            id:msgCount,
            type:'motion',
            action:'L',
            count:longCount
        });



    }
    else {
        shortCount += 1;
        msgCount += 1;
        ref.push({
            id:msgCount,
            type:'motion',
            action:'S',
            count:shortCount
        });
    }

}

function printStatus(x){
    if(x.value === 1){
        if (firstZeroes) {
            zeroesSeen += 1; //to ignore all non motions before the first motion
        }
        else {
            identifyLength(detect); //identify long or short message
            detect = 0;

        }

    }
    else {
        firstZeroes = false; //check if we have seen a motion
        detect += 1;   //count number of motions
    }
    }


setInterval(checkPIR, 1000);
*/
var c = 0;
function pushToDb(){


    ref.push({
        id:1,
        type:'motion',
        action:'L',
        count:1
    });


    ref.push({
        id:2,
        type:'motion',
        action:'S',
        count:1
    });


    ref.push({
        id:3,
        type:'motion',
        action:'S',
        count:2
    });


    ref.push({
        id:4,
        type:'motion',
        action:'L',
        count:2
    });


    ref.push({
        id:5,
        type:'motion',
        action:'S',
        count:3
    });

    ref.push({
        id:6,
        type:'motion',
        action:'L',
        count:3
    });

    ref.push({
        id:7,
        type:'motion',
        action:'L',
        count:4
    });





}


pushToDb();

//setInterval(pushToDb, 3000);
