
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

