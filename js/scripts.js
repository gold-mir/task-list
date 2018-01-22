// CONSTRUCTOR

var tasks = [];
var removedTasks = [];

function Task (toDo, dueDate) {
  this.todo = toDo;
  this.due = dueDate;
  this.id = Task.prototype.id++;
}

Task.prototype.id = 0;

Task.prototype.taskAndDate = function(){
  return this.todo + " | " + this.due;
}

function removeTask(id){
  //Determine the task that goes with the id
  var task = tasks.filter(function(item){
    return item.id === id;
  })[0];
  var taskIndex = tasks.indexOf(task);
  if(taskIndex != -1){
    tasks.splice(taskIndex, 1);
  }
  removedTasks.push(task);
}

//FRONT-END

function displayTasks() {
  $("#taskList ul").html("");
  tasks.forEach(function(item){
    $("#taskList ul").append('<li>'+item.taskAndDate() + '<button type="button" class="remove-task" taskid="' + item.id + '">Done</button></li>');
    $("#taskList ul li:last-child .remove-task").click(function(){
      var id = parseInt($(this).attr("taskid"));
      removeTask(id);
      displayTasks();
    });
  });
  // $("#taskList ul").append("#taskList");
  // $(".display-task ul:last-of-type").append("datesList");
}


$(document).ready(function () {

  $("form#toDoList").submit(function(event) {
    event.preventDefault();

    // alert("hi");
    var taskName = $("#taskName").val();
    var dueDate = $("#dueDate").val();

    $("#taskName").val("");
    $("#dueDate").val("");

    var tasksToDo = new Task(taskName, dueDate);
    tasks.push(tasksToDo);

    displayTasks();

  });

});
