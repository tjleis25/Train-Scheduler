 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAGQuTypoenVVx3aBOUBjNJFYzAH7efcFY",
    authDomain: "train-2-a7cdc.firebaseapp.com",
    databaseURL: "https://train-2-a7cdc.firebaseio.com",
    projectId: "train-2-a7cdc",
    storageBucket: "",
    messagingSenderId: "914237702548"
};
firebase.initializeApp(config);

//Reference to firebase.database
var trainData = firebase.database();

//Connect to firebase and store inputs everytime button is clicked
$("#addTrainBtn").on("click", function(event){
    
    event.preventDefault();
    // console.log("hi");
    
    //grab users input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    
    //Converting everything to be on one line with moment.JS
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();
    
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    
    //create local "temp" object for holding train data
    var newTrain = {
        name: trainName,
        destintation: destination,
        firstTime: firstTrain,
        frequency: frequency,
    };
    
     //Reference Firebase. 
     trainData.ref().push(newTrain);
 
     console.log(newTrain.name);
     console.log(newTrain.destination);
     console.log(newTrain.firstTime);
     console.log(newTrain.frequency);
    
})

//firebase watcher and initial loader: similar to .on("value")(array)
trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTime


    console.log(name, destination, frequency, firstTrain);
    console.log(snapshot.val());
    //() gives the actual result

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    
    $("#trainTable > tBody").append("<tr><th>" + name + "</th><th>" + destination + "</th><th>" + frequency +"</th><th>"+arrival+"</th><th>"+minutes+"</th></tr>"); 
})

function clock()  {
    
    const fullDate = new Date();
    var hours = fullDate.getHours();
    var mins = fullDate.getMinutes();
    var secs = fullDate.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (secs < 10) {
        secs = "0" + secs;
    }

    
}
    
   


setInterval(clock, 100);