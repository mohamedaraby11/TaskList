// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load the event
loadEventListner();

// load all events
function loadEventListner(){
    // Dom Load Event 
    document.addEventListener('DOMContentLoaded',getTasks);
    // Add Task
    form.addEventListener('submit',addTask);
    // Remove Task Event
    taskList.addEventListener('click',removeTask);
    // Clear Task event 
    clearBtn.addEventListener('click',clearTasks);
    // Filter Tasks Event 
    filter.addEventListener('keyup',filterTasks)

}

// Get TAsks From Ls

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
            // create li element
    const li = document.createElement('li');
    // Add Class
    li.className='collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create New Link elemnt 
    const link = document.createElement('a');
    // Add Class 
    link.className='delete-item secondary-content';
    // Add Icon Html
    link.innerHTML= '<i class="fa fa-remove"></i>';
    // Append Link To Li
    li.appendChild(link);

    // Append Li To The Ul
    taskList.appendChild(li);

    });
}

// Add Task

function addTask(e){

    if(taskInput.value ===''){
        alert(' You Need To Add Task')

    }

    // create li element
    const li = document.createElement('li');
    // Add Class
    li.className='collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // Create New Link elemnt 
    const link = document.createElement('a');
    // Add Class 
    link.className='delete-item secondary-content';
    // Add Icon Html
    link.innerHTML= '<i class="fa fa-remove"></i>';
    // Append Link To Li
    li.appendChild(link);

    // Append Li To The Ul
    taskList.appendChild(li);

    // Store In LocalStoorage
     StoreTAskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value =' ';





    e.preventDefault();
}

// store TAsk 

function StoreTAskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks))
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm(' Are you Sure?')){
            e.target.parentElement.parentElement.remove();

            // remove task from ls

            removeTaskFromLoacalStorage(e.target.parentElement.parentElement);
 
        }
    }

}

// Remove From Ls

function removeTaskFromLoacalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
        task.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Tasks

function clearTasks()
{
   // taskList.innerHTML = '';

   // while loop 

   while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
   }

   // clear From Ls

   clearTasksFromLocalStorage();
}

// Clear Tasks From Ls 
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1){
         task.style.display = ' block';

        }

        else {
            task.style.display  = 'none';
        }
    });
}