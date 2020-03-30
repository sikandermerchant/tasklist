///Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

///Load all Event Listeners
loadEventListners();

///Load all Event Listener Function.

function loadEventListners(){
   ///Get tasks from local storage event - DOM Load Event
document.addEventListener('DOMContentLoaded',getTaskfromLocalStorage);

  //Add task event
  form.addEventListener('submit',addTask)

  ///Remove task event - this will need 'event delegation' as there are multiple x icons and they will all be created dynamically each time when a new task is added. Hence we will add the event listener to the task list

  taskList.addEventListener('click',removeTask);

  //Clear tasks event
  clearBtn.addEventListener('click',clearTasks);

  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);//The keydown and keyup events provide a code indicating which key is pressed up and down

 
}

//Get Task from LocalStorage function 
function getTaskfromLocalStorage(){
  let tasks;
///we want to now pull whatever there is in the local storage that can be - either added to tasks array or else tasks can be set as an empty array.
//initialise a tasks varibale to create the array

if(localStorage.getItem('tasks') === null){
tasks = [];
}else{
  tasks = JSON.parse(localStorage.getItem('tasks'))///this will be a string and hence we will have to parse this an object that can be used, hence we will add the "JSON parse" wrapper.
}
//We would now want to run a loop and add eack task to the DOM as we do for addTask(); except that when creating a text node and appending it to li we will pass in task instead of taskInput value as we are getting this task from local storage rather than receiving it as an input
tasks.forEach(function(task){
/// We first want to create an li element for when an task input is added as follow:
const li = document.createElement('li');

//Add a class
li.className = 'collection-item';//This is a materialize requirment where for aesthetics a ul has to have a className as 'collection' and each li for that ul className of 'collection-item

//Create a text node and append to the li
li.appendChild(document.createTextNode(task));

///Create new link element for delete item
const link = document.createElement('a');

///Add class to the link element
link.className = 'delete-item secondary-content';///the secondary-content class is needed in materialize to have an element to the right of a list item (li)

///Add icon html (x icon to delete)
link.innerHTML = '<i class = "fa fa-remove"></i>'//fa fa-remove class is a font awesome class for remove item (x) icon

///Append the link to li
li.appendChild(link);

//Append the li to ul(taskList)
taskList.appendChild(li);

})

}


//Add task function
function addTask(e){
  if(taskInput.value === ""){
alert('Please enter a task')
  }
/// We first want to create an li element for when an task input is added as follow:
const li = document.createElement('li');

//Add a class
li.className = 'collection-item';//This is a materialize requirment where for aesthetics a ul has to have a className as 'collection' and each li for that ul className of 'collection-item

//Create a text node and append to the li
li.appendChild(document.createTextNode(taskInput.value));

///Create new link element for delete item
const link = document.createElement('a');

///Add class to the link element
link.className = 'delete-item secondary-content';///the secondary-content class is needed in materialize to have an element to the right of a list item (li)

///Add icon html (x icon to delete)
link.innerHTML = '<i class = "fa fa-remove"></i>'//fa fa-remove class is a font awesome class for remove item (x) icon

///Append the link to li
li.appendChild(link);

//Append the li to ul(taskList)
taskList.appendChild(li);

///Store Task in Local Storage
storeTaskInLocalStorage(taskInput.value);///this will pass on the input value of the task whatever has been added.

//Clear Input after Submit
taskInput.value = '';

// console.log(li);

  e.preventDefault();
}

///Store tasks in local storage
function storeTaskInLocalStorage(task){

  let tasks;
///we want to now pull whatever there is in the local storage that can be - either added to tasks array or else tasks can be set as an empty array.
//initialise a tasks varibale to create the array

if(localStorage.getItem('tasks') === null){
tasks = [];
}else{
  tasks = JSON.parse(localStorage.getItem('tasks'))///this will be a string and hence we will have to parse this an object that can be used, hence we will add the "JSON parse" wrapper.
}
///we would now want to push the task added through the input into this task array

tasks.push(task);

//this wont add anything to the local storage so we need reset(set) local storage with this array
localStorage.setItem('tasks', JSON.stringify(tasks));///but since it has to store strings in local storage we will have to wrap the passed value of task as string in a "JSON stringify" wrapper
}
///At this stage if I now add task, it will be added to the local storage, however, when relaoded, it will disappear from the DOM although still available(persisted) in the local storage 

///We would now want to show it inside the ul (on the DOM). For that on load, we will have to get Tasks from the local storage.
//An event called DOMContentLoadedEvent (in loadEventListners function) and another function called getTaskfromLocalStorage will be added for this above


//Remove task function
function removeTask(e){

if(e.target.parentElement.classList.contains('delete-item')){
  if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    
    //Remove task from Local Storage - as removing from DOM wil not remove it from local storage and hence it will re-appear on reload
    removeTaskFromLocalStorage(e.target.parentElement.parentElement); ////since we dont have any id for each element, we will directly pass the element 

  }  
} 
}


///Remove task from local storage function

function removeTaskFromLocalStorage(taskItem){
  
  console.log(taskItem);
  //As we did earlier, we want to check local storage 
  let tasks;
///we want to now pull whatever there is in the local storage that can be - either added to tasks array or else tasks can be set as an empty array.
//initialise a tasks varibale to create the array

if(localStorage.getItem('tasks') === null){
tasks = [];
}else{
  tasks = JSON.parse(localStorage.getItem('tasks'))///this will be a string and hence we will have to parse this an object that can be used, hence we will add the "JSON parse" wrapper.
}
//We would now want to run a loop through each task and using an if statement 
tasks.forEach(function(task,index){
  if(taskItem.textContent === task){
    tasks.splice(index, 1)
    // The splice() method adds/removes items to/from an array, and returns the removed item(s). 
    //Syntax array.splice(index, howmany, item1, ....., itemX)
    /*Parameter Values
    Parameter	Description
    index	- Required. An integer that specifies at what position to add/remove items, Use negative values to specify the position from the end of the array
    howmany -	Optional. The number of items to be removed. If set to 0, no items will be removed
    item1, ..., itemX	Optional. The new item(s) to be added to the array*/
    //In this case Remove 1 item from the index passed if the taskItem content is equal to the task.

  }

})
//finally we set the local storage so that it loads the existing task list without the task that was removed
localStorage.setItem('tasks', JSON.stringify(tasks));

}


///Clear task Function - this can be done by couple of ways:

function clearTasks(){

  // taskList.innerHTML = ('');///here we set the innerHTML of tasklist as empty so all child elements are cleared
  ///however the second way which is 'faster' is using the while loop to remove each one (more about this on https://jsperf.com/innerhtml-vs-removechild/47)  as follows:
 if(confirm('Are you sure?')){
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
 } 
 ///Clear All Tasks from Local Storage
 clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear()
}

//Filter Task Function
function filterTasks(e){

//first we identify whatever is being typed in the input field for filter
const text = e.target.value.toLowerCase() //declare a variable text to identify the search value for filter input and convert it to lower case, so we can match characters correctly.
  // console.log(text);
///Now we would want to get all the list items that have the class 'collection-item' as declared above when creating dynamic list items; and then we want to loop through those using forEach();
////We can use forEach() as querySelectorAll returns a NodeList which allows us to loop through them directly. Whereas getElement by class or id returns an html list which have to be the converted into an array to then be looped.

const collection = document.querySelectorAll('.collection-item').forEach(function(task){ ///we will pass in the function here with task as our iterator
const item = task.firstChild.textContent;
///We will now check if the search value and the item text content lower case are a match using an if else statement and 
//indexOf() method, determines the index of character for a string that is passed and will return the index character when identied on first occurence left to right;when the indexOf() method doesnt find the required character it returns -1

if(item.toLowerCase().indexOf(text) != -1){
  task.style.display = 'block'; //if it matches the task will display the item as a block

}else{
  task.style.display = 'none';  //if it doesn't matches the task will display none
}

});
}
