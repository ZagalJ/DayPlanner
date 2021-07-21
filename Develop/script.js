var myDay = [ //array for hours, time, reminder ans position
    {
        id: "0",
        hour: "09",
        time: "09",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        reminder: ""
    },
    ]

getTodaysDate(); //call function for header's date
function getTodaysDate() { //get today's date for the header using moment
    var todaysDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(todaysDate); //set the currentDay id to todays date
}

function saveReminders() { //save schedule to local storage
    localStorage.setItem("mySchedule", JSON.stringify(myDay));//Saved  array to local storage, array can be looked at by going into inspect> Application
}

function displayReminders() { //function to show the reminders saved in the array
    myDay.forEach(function (thisTime) { 
        $(`#${thisTime.id}`).val(thisTime.reminder);//sets the reminder based on the assigned id
    })
}

init(); //calls function
function init() { 
    var storedDay = JSON.parse(localStorage.getItem("mySchedule")); //get data from array to a new variable
    if (storedDay) { //looks for content inside the array. 
        myDay = storedDay; 
    }
    saveReminders(); //calls function to save the reminders
    displayReminders();// calls function to display reminders in textarea
}

myDay.forEach(function(thisHour) { //create visual for each hour
    // creates timeblocks row
    var hourRow = $("<form>").attr({ //add form to hour
        "class": "row" //assign row class
    });
    $(".container").append(hourRow); //display in container id

    var hourField = $("<div>") //create hour field 
        .text(`${thisHour.hour}`) //set text to hour
        .attr({ //set the class attribute to be used with bootstrap
            "class": "col-md-2 hour" 
    });

    var hourPlan = $("<div>") //creates scheduler data to determine if it's past a time
        .attr({
            "class": "col-md-9 description p-0" //add class to the div for bootstrap
        });
    var planData = $("<textarea>"); //creates a textarea for the scheduler.
    hourPlan.append(planData); //appends hourPlan to planData
    planData.attr("id", thisHour.id); //calls the data based on the id found on hour
    if (thisHour.time < moment().format("HH")) { //if for adding the past class to past hours
        planData.attr ({
            "class": "past", //add past class to the text area
        })
        document.getElementsByClassName("past").disabled =true; //first try to disable past hours. 
    } else if (thisHour.time === moment().format("HH")) { //if for looking at the current time.
        planData.attr({
            "class": "present" //add present class to the text area
        })
    } else if (thisHour.time > moment().format("HH")) {//if after current time sets future class
        planData.attr({
            "class": "future" //add future class to the text area
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>") //Creates saving button with icon 
    var savePlan = $("<button>") //creating button 
        .attr({
            "class": "col-md-1 saveBtn" //setting class atributes
    });
    savePlan.append(saveButton); //append button to show icon
    hourRow.append(hourField, hourPlan, savePlan); //append to show field and reminders
})

$(".saveBtn").on("click", function(event) { //when clicking save button will save data in localStorage
    event.preventDefault(); //preventDefault event to avoid reload of the page
    var saveIndex = $(this).siblings(".description").children(".future").attr("id"); //var saveIndex calls for id of an event saved in a future description field
    // if(saveIndex = "undefined"){
    //     alert("Even't can't be saved for that time, Please use a future time.")
    // } 
    //tried to add an alert to avoid saving for past hours
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();// calls for that value and to save it within array 
    saveReminders(); //calls the save reminders function
    displayReminders(); //calls the display reminders
})