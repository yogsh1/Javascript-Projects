const addBtn = document.querySelector('#add-btn');
// newTaskInput = <input type="text" placeholder="Task to be done...">
const newTaskInput = document.querySelector("#wrapper input")
const tasksContainer = document.querySelector("#tasks")
const error = document.getElementById("error")

const countValue = document.querySelector(".count-value")
let taskCount = 0;
// An Arrow function = displayCount
// it behaves just like any regular function. Introduced in ES6 (modern Javascript) 
// Uses => insted of the function keyword
// Assigned to a variable const, So its a function expression and not a declaration.

// When to use an ordinary function and when to use an arrow function
// this refers to the object calling the function.
// Arrow functions do not have their own this; they use the this from where they were defined.
// In class methods or objects, use regular functions if you rely on this.

// Counting the number of new tasks are to be added
const displayCount = (taskCount) => {
    // updating the countValue (text content) with the number of tasks [taskCount an interger value].
    countValue.innerText = taskCount;
}

// defining an arrow function addTask, it is likely called when the user tries to add a new task. Triggers when you click the add Button.
const addTask = () => {
    // getting the text the user typed Using (.value) inside the <input> and by using (.trim()) we trim/remove the extra spaces from both ends.
    const taskName = newTaskInput.value.trim();

    // setting the css style of the tag <p> to not display. ensuring every time when we try to add a task, the old error is hidden first. 
    error.style.display = "none"; // hide error

    // !taskName is best form validation (catches empty, null, undefined).
    // === "" is safer (strict equality), more predictable -- no automatic type conversion. Only runs if taskName is exactly the empty sting "". 
    // == "" also works is taskName is "" (empty string) but not recommended because it will also return true if taskName is something coercible to an empty string -- although rare, but this can lead to bugs. e.g. can return true if taskName is not literally an empty string cuz of type coercion (Javascript trying to "convert" things to make the comparison work.) e.g.1 -> if, let taskName = false; it'll return true cuz false becomes "" (empty string) when loosely compared(false = "" -> true). Javascript tries to make types match under the hood.
    // another example would be if taskName = 0; it'll also return true. So,

    // displaying the erro msg after 200 miliseconds of delay
    if (!taskName) {
        setTimeout(() => {
            // Making the error msg visible again. display = "block" makes the element behave like an block element e.g. <div>
            error.style.display = "block"; // show  error
        })
        // ending the function early
        return;
    }

    // creating a div element with the class .task so when we click the add button it creates a new task
    // and all the styling and everything to automatically create the new task div with other buttons and checkbox with just a click of a button

    // ` (backtick) is a template literal allows multi-line strings and variable embedding.
    // ${taskName} is a placeholder that will be replaced with the value of the taskName variable (e.g. "Buy milk").
    // the result is a full HTML black representing one task.
    const task =
    `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="far fa-trash-alt"></i></button>
    </div> `;

    // This inserts the HTML stored in task into an existing DOM element called taskContainer.
    // Syntax --> element.insertAdjacentHTML(position, htmlString);
    // position = "beforeend" -> adds the HTML inside the element at the very end
    // task is the string of HTML we want to add. [ajacent = situated next to or close to something]
    tasksContainer.insertAdjacentHTML("beforeend", task);

    // we added the functionality to dynamically add .task at the bottom of the task list. 
    // Now working on the functionalities of the various buttons inside the task tab.

    // .querySelectorAll() is a DOM method that selects all elements in the document that match the given CSS selector. It returns a NodeList(like an array of elements, but not exactly an array)
    // NodeList:- It is an array-like object that holds a list of DOM nodes (like elements, text nodes, etc.). It is returned by methods like below ... / It has .forEach() loop so you can loop through it. Not a real array so you cannot use / it doesn't have all array methods like (map, filter etc.) unless converted. But you can access items liek list[1], list[1].... so on.....
    const deleteButtons = document.querySelectorAll(".delete");

    // It adds a click event to all the ".delete" buttons.When you click a delete button: it removes the task from the page, Decresess the task Count and Updates the visible count.

    // .forEach((button) => {.....}) --> looping over every .delete button.
    // in a forEach loop you can name the parameter anything like we named it button here, it could be named anything.
    // button here is just a variable name for each item in the list.
    deleteButtons.forEach((button) => {
        // Assigns a click event handler to each button when clicked.
        // Event Handler --> It is a function that gets called when an event happens -- like a click, keypress, or mouse movement. in short A handler is just a function that handles an event like a click. It's called automatically when that event happens/occurs.

        // ways to add handlers -->
        // button.onclick = () => { ... };

        // you can also ---> 
        // button.addEventListener("click", () => { ... });
        // This one is more flexible and preferred method because it allows multiple handlers on the same event.

        button.onclick = () => {
            // button.parentNode =(is equal to) <div class="task"> that holds the entire task.
            // .remove() Deletes that task from the DOM.
            button.parentNode.remove();
            // Decreasing the taskCount variable by 1.
            taskCount -= 1;
            // Updating the visible counter on screen with the new task Count.
            displayCount(taskCount);
        };
    });

    // selecting all the elements with the .edit class / selecting all the edit buttons
    const editButtons = document.querySelectorAll(".edit");

    // loops through every edit button and adds a click handler to each one.
    editButtons.forEach((editBtn) => {
        // event handler 
        //Defines what should happen when the edit button is clicked. The e (event) object contains details about the click, including e.target --> the exact element clicked.
        editBtn.onclick = (e) => {
            // e.target = the exact element clicked and not all

            // Handling clicks on <i> inside the button
            let targetElement = e.target;
            // if you click the <i> inside the button, e.target is the <i> (not the .edit button itself).
            // so you check if the clicked element is not the button, then go to its parent (which is the button).

            // <button class="edit"><i class="fas fa-edit"></i></button>
            // Clicking <i> → e.target = <i>
            // So you go e.target.parentElement → which is the <button>.
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }

            // Fills the input box with the text from the task name.
            // targetElement.previousElementSibling finds the <span class="taskname"> just before the edit button.
            // so previousElementSibling of the button --> span.taskname.
            // ?.innerText safely gets the text (avoids error if span doesn't exist).
            newTaskInput.value = targetElement.previousElementSibling?.innerText;

            // removes the entire <div class="task"> From the DOM.
            targetElement.parentNode.remove();
            // updates the task Count
            taskCount -= 1;
            // calls the displayCount method to update the visible counter.
            displayCount(taskCount);
            // Summary so, basically when we click the edit icon inside the button it goes to the parent element which is the exact same button in which the icon is inside. and it takes the text from the parent sibling which is button sibling the span the task name. it takes the text from task name and put it to the in the input field beside the add button. and it removes/deletes the entire task element of the text selected from.
        };
    });


    // selecting all the elements with the .task-check class
    const tasksCheck = document.querySelectorAll(".task-check");

    // looping through every checkbox
    tasksCheck.forEach((checkBox) => {
        // Runs when a checkbox  is checked or unchecked
        checkBox.onchange = () => {
            // toggling completed class to span element (task text) next / right after the input element <span class="taskname">${taskName}</span>
            checkBox.nextElementSibling.classList.toggle("completed")
            // if checked means the task completed the task count decreases by 1
            if (checkBox.checked) {
                taskCount -= 1;
                console.log("checked");
            } 
            // else the count increases by 1
            else {
                taskCount += 1;
            }
            // updating display
            displayCount(taskCount);
        };
    });

    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};


// this line attaches a click event listener to your "add" button
// when clicked the addTask() ^^ function is called
addBtn.addEventListener("click", addTask);

// Adding new task just by pressing Enter aswell 
newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// This code runs once the entire page is loaded, including all HTML, CSS and assets.
window.onload = () => {
    // Initializes the task counter to 0.
    taskCount = 0;
    // Updates the task counter display 
    displayCount(taskCount);
    // Clears the input box (in case anything was left inside)
    newTaskInput.value = "";
};







console.log("kal-END")