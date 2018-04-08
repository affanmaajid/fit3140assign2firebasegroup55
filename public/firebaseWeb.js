
function Fit3140() {
  this.checkSetup();
  this.initFirebase();
  this.loadMessages();
}
var motionArray = [];
var iPointer = 0;
var goal = 'LSLL';
var visitors = 0;

  Fit3140.prototype.initFirebase = function () {
    this.database = firebase.database();
    this.storage = firebase.storage();
  };


  Fit3140.prototype.loadMessages = function () {
    // Reference to the /messages/ database path.
    this.messagesRef = this.database.ref('/motionSensorData');
    // Make sure we remove all previous listeners.
    this.messagesRef.off();

    // Loads the last 50 messages and listen for new ones.
    var setMessage = function (data) {
      var val = data.val();
      this.displayMessage(val.action, val.count, val.id, val.type);
      motionArray.push(val.action);
      this.checkLength(motionArray);
    }.bind(this);
    this.messagesRef.on('child_added', setMessage);
    //this.messagesRef.limitToLast(50).on('child_changed', setMessage);
  };

  // Saves a new message on the Firebase DB.
  Fit3140.prototype.saveMessage = function () {
    // Add a new message entry to the Firebase Database.
    this.messagesRef.push({
      action: 'off',
      id: 2,
      time: 123456, // you can use Date.now()
      type: 'motion'
    }).then(function () {
      console.log('Done')
    }.bind(this)).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  };


  Fit3140.prototype.displayMessage = function (action, count, id, type,) {
    //document.getElementById('playNotifh5').innerText = action + '  ' + type;
      if (action === 'L'){
          document.getElementById('clickTwo').innerText = count;


      }
      else {
          document.getElementById('clickFive').innerText = count;

      }

  };


  Fit3140.prototype.checkLength = function (motionArray) {
    if(motionArray.length > 3){
        this.detectVisitor(motionArray);

    }
  }

  Fit3140.prototype.detectVisitor = function (motionArray) {
    var stringVar = '';
    for (var i = iPointer; i < motionArray.length; i++){
      stringVar += motionArray[i];

    }

    if (stringVar === goal){
      visitors += 1;
      iPointer += 1;
      document.getElementById('clickEight').innerText = visitors;


    }
    else {
      iPointer += 1;
    }




  }


  // Checks that the Firebase SDK has been correctly setup and configured.
  Fit3140.prototype.checkSetup = function () {
    if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
    } else if (config.storageBucket === '') {
      window.alert('Your Firebase Storage bucket has not been enabled.');
    }
  };


window.onload = function () {
  window.Fit3140 = new Fit3140();
};
