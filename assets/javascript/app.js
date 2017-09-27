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
var trainFrequency = 0 + " minutes";

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

