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
//converted this to a string because 0 wasn't working...
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

    //MomentJS logic:
    var howOftenTrainRuns = (Number(childSnapshot.val().trainFrequency));
    console.log("Next train: " + howOftenTrainRuns);

    var firstTrainTimeDisplayed = displayedFirstTrainTime;

    var firstTrainTimeConverted = moment(firstTrainTimeDisplayed, "hh:mm").subtract(1, "years");
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

    // Next Train
    //var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); 

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("hh:mm");


    //Should this be ordered by next arrival?
    //appends each input to the table
    $("table").find("tbody").append([
        "<tr>",
            "<td>" + displayedTrainName,
            "<td>" + displayedTrainDestination,
            "<td>" + displayedTrainFrequency, 
            "<td>" + nextTrainConverted,
            "<td>" + tMinutesTillTrain
    ].join(""));
})

//This outputs first because script tag is first
console.log(moment());

//MomentJS, train arrival logic =============================

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






 // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21


    

    

    // Assumptions
    /*var tFrequency = 3;
        // Time is 3:30 AM
        var firstTime = "03:30";
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); */