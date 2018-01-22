//BACK-END LOGIC

//create empty arrays to house tasks and removed tasks
var tasks = [];
var removedTasks = [];

//Constructor
function Task (toDo, dueDate) {
  this.todo = toDo;
  this.due = dueDate;
  this.id = Task.prototype.id++;
}

//create a prototype id to attach a unique identifier to every task
Task.prototype.id = 0;

//create a function that will concatenate both the task and the date and returns both
Task.prototype.taskAndDate = function(){
  return this.todo + " | " + this.due;
}

// create function to remove task once the Done button is clicked. id is paramater because we want to remove specific tasks
function removeTask(id){
  //Determine the task that goes with the id
  var task = tasks.filter(function(item){
    return item.id === id;
    //get task's index in task list, & if taskList contains that task, we remove it.
  })[0];
  var taskIndex = tasks.indexOf(task);
  if(taskIndex != -1){
    tasks.splice(taskIndex, 1);
  }
  removedTasks.push(task); // add the removed task to the removedTasks array.
}

//FRONT-END LOGIC
//create function to display tasks
function displayTasks() {
  $("#taskList ul").text(""); // will clear the name of task and due date field once the submit button/enter has been clicked by the user.
  tasks.forEach(function(item){ // loop over the tasks array and add the each task to the <ul>
    $("#taskList ul").append('<li>' + item.taskAndDate() + '<button type="button" class="remove-task" taskid="' + item.id + '">Done</button></li>'); // adds Done button to each task item
    $("#taskList ul li:last-child .remove-task").click(function(){ // vary psecific targeting methid -> find the #taskList, find the <ul> in that taskList, the <li> in that taskList, the last-child (last-element) in the <li> and add click functionality to the button in the class="remove-task"
      var id = parseInt($(this).attr("taskid")); //the task id will come in as astring so it needs to be parsed into an integer
      removeTask(id); // run the remove task function on the specific id
      displayTasks(); //display tasks again everytime a task is added or removed.
    });
  });
}


$(document).ready(function () {

// add submit functionality to the form
  $("form#toDoList").submit(function(event) {
    event.preventDefault();

    // create variables to store the values of the task name and due date
    var taskName = $("#taskName").val();
    var dueDate = $("#dueDate").val();

    // will clear the task name and due date fields everytime the submit button is clicked
    $("#taskName").val("");
    $("#dueDate").val("");

    // new instance of the Task Constructor
    var tasksToDo = new Task(taskName, dueDate);
    tasks.push(tasksToDo); // push tasks and dates entered by the user into the tasks array.

    displayTasks(); //display tasks everytime tasks are added or removed.

  });

});
