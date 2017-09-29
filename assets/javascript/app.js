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
var trainFrequency = "";

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

// Firebase reference code that uses momentJS to append to HTML Table ================================================
// Firebase watcher + initial loader.
dataRef.ref().on("child_added", function(childSnapshot){
    //log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().trainFrequency);
    //this is how you'd convert this to a string. May not need. 
    console.log(Number(childSnapshot.val().trainFrequency));

            
    var displayedTrainName = childSnapshot.val().trainName;
    var displayedTrainDestination = childSnapshot.val().trainDestination; 
    var displayedFirstTrainTime = childSnapshot.val().firstTrainTime;
    var displayedTrainFrequency = childSnapshot.val().trainFrequency;

    //MomentJS logic: =======================================
    var howOftenTrainRuns = (Number(childSnapshot.val().trainFrequency));
    console.log("Next train: " + howOftenTrainRuns);

    var firstTrainTimeConverted = moment(displayedFirstTrainTime, "hh:mm").subtract(1, "years");
    console.log("converted time: " + firstTrainTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % howOftenTrainRuns;
    console.log("tRemainder: " + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = howOftenTrainRuns - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain); 

    //converts next Train to be displayed in proper time format
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //converts to Hour/Minutes/AMorPM typical display style
    var nextTrainConverted = moment(nextTrain).format("h:mm A");

    //=====================================================
    //appends each input to the table. Currently displays as first in first up. Might want to eventually change to display based on time away?
    $("table").find("tbody").append([
        "<tr>",
            "<td>" + displayedTrainName,
            "<td>" + displayedTrainDestination,
            "<td>" + displayedTrainFrequency, 
            "<td>" + nextTrainConverted,
            "<td>" + tMinutesTillTrain
    ].join(""));
})
