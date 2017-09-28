// Initialize Firebase
var config = {
    apiKey: "AIzaSyDgY_I2hZW76jmFJ4Fvqn7hGoXF_oFF-h8",
    authDomain: "trainscheduleactivity.firebaseapp.com",
    databaseURL: "https://trainscheduleactivity.firebaseio.com",
    projectId: "trainscheduleactivity",
    storageBucket: "trainscheduleactivity.appspot.com",
    messagingSenderId: "736662195923"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

var trainName = "";
var trainDestination = "";
var firstTrainTime = "";
var trainFrequency = 0;

$("#addTrainSubmitButton").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainNameFormInput").val().trim();
    trainDestination = $("#trainDestinationFormInput").val().trim();
    firstTrainTime = $("#firstTrainTimeInput").val().trim();
    trainFrequency = $("#trainFrequency").val().trim();

    // Code for the push
    dataRef.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        firstTrainTime: firstTrainTime,
        trainFrequency: trainFrequency,
    });
})

// Firebase watcher + initial loader.
dataRef.ref().on("child_added", function(childSnapshot){
    //log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().trainFrequency);

    var currentTrainName = childSnapshot.val().trainName;
    var currentTrainDestination = childSnapshot.val().trainDestination; 
    var currentFirstTrainTime = childSnapshot.val().firstTrainTime;
    var currentTrainFrequency = childSnapshot.val().trainFrequency;

    //Should this be ordered by next arrival?
    $("table").find("tbody").append([
        "<tr>",
            "<td>" + currentTrainName,
            "<td>" + currentTrainDestination,
            "<td>" + currentTrainFrequency, 
            "<td>",
            "<td>",
    ].join(""));
})




    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value"). 
    
    /*dataRef.ref().on("child_added", function(childSnapshot) {
        
              // Log everything that's coming out of snapshot
              console.log(childSnapshot.val().name);
              console.log(childSnapshot.val().name);
              console.log(childSnapshot.val().email);
              console.log(childSnapshot.val().age);
              console.log(childSnapshot.val().comment);
              console.log(childSnapshot.val().joinDate);
        
              // full list of items to the well
              $("#full-member-list").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
                " </span><span id='email'> " + childSnapshot.val().email +
                " </span><span id='age'> " + childSnapshot.val().age +
                " </span><span id='comment'> " + childSnapshot.val().comment + " </span></div>");
        
            // Handle the errors
            }, function(errorObject) {
              console.log("Errors handled: " + errorObject.code);
            });
        
            dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        
              // Change the HTML to reflect
              $("#name-display").html(snapshot.val().name);
              $("#email-display").html(snapshot.val().email);
              $("#age-display").html(snapshot.val().age);
              $("#comment-display").html(snapshot.val().comment);
            }); */