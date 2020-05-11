console.log("connected");

// array of images 
var emojis = ['clap-hands.png', 'party-popper.png', 'thumb-up.png', 'worship.png']

// create todo input field and buttons
function createInputFieldnBtn () {
    var inputFieldnBtn = document.createElement("div");
    var inputField = document.createElement("input");
    inputField.setAttribute("class", "task-input-field");
    inputField.setAttribute("placeholder", "new task...");
    var addTaskBtn = document.createElement("button");
    addTaskBtn.innerText = " + ";
    addTaskBtn.setAttribute("class","add-item-btn");

    inputFieldnBtn.appendChild(inputField);
    inputFieldnBtn.appendChild(addTaskBtn);
    return inputFieldnBtn;
}


// create todo list remove button
function createRemoveBtn () {
    var removeListBtn = document.createElement("button");
    removeListBtn.innerText = " x ";
    // removeListBtn.setAttribute("class","remove-list-btn");
    return removeListBtn;
}

// create strike through button
function createStrikeThruBtn () {
    var strikeThruBtn = document.createElement("button");
    strikeThruBtn.innerText = "ST";
    strikeThruBtn.setAttribute("class","strikeThruBtn");
    return strikeThruBtn;
}

// create list board name 
function createBoardName () {
    // the name will be a h3 element
    var boardName = document.createElement("h3");
    // set class for board name for referencing purposes
    boardName.setAttribute("class", "board-name");
    // default name will be Unnamed Board
    boardName.innerText = "Unnamed Board";
    return boardName;
} 

// create list board control field 
function createListControlField () {
    var controlField = document.createElement("div");
    controlField.setAttribute("class", "control-field");
    var removeListBtn = createRemoveBtn();
    removeListBtn.setAttribute("class","remove-list-btn");
    var inputFieldnBtn = createInputFieldnBtn();
    
    controlField.appendChild(inputFieldnBtn);
    controlField.appendChild(removeListBtn);
    return controlField;
}

// create a todo item space
function createTodoItemSpace () {
    var todoItemSpace = document.createElement("div");
    todoItemSpace.setAttribute("class","toDoItemSpace");
    return todoItemSpace;
}

// a function to make new list board
function addListBoard () {
    // make a div with class .list
    var newList = document.createElement("div");
    newList.setAttribute("class", "list");
    newList.setAttribute("draggable", true); 

    // create a board name
    var boardName = createBoardName();
    newList.appendChild(boardName); 
    
    // add a list control field
    var listControlField = createListControlField();
    newList.appendChild(listControlField);
    // add toDoItemSpace 
    var toDoItemSpace = createTodoItemSpace();
    newList.appendChild(toDoItemSpace);
    return document.querySelector("main").appendChild(newList);
} 


// create toDoListItem remove item

// create new todo item
function createNewTodoItem () {
    if (document.querySelectorAll("input").value !== "") {
        var newToDoItem = document.createElement("li");
        // set li newToDoItem's text to value in input field
        // target input field
        var inputField = event.target.parentElement.querySelector("input");
        var newToDoItemName = document.createElement("p");
        newToDoItemName.innerHTML = inputField.value;
        newToDoItemName.setAttribute("class","toDoName");
        newToDoItem.appendChild(newToDoItemName);
        newToDoItem.setAttribute("draggable",true);

        // create strike through button
        var strikeThruBtn = createStrikeThruBtn();

        // create remove button
        var toDoItemRemoveBtn = createRemoveBtn();
        toDoItemRemoveBtn.setAttribute("class","todo-item-remove-btn");
        
        // put the buttons into one div -- hopefully this doesn't crash with the styles
        var buttonDiv = document.createElement("div");
        buttonDiv.appendChild(strikeThruBtn);
        buttonDiv.appendChild(toDoItemRemoveBtn);

        // append the div into newToDoItem
        newToDoItem.appendChild(buttonDiv);
        newToDoItem.setAttribute("class","toDoItem");

        // get the toDoItemSpace
        var toDoItemSpace = event.target.parentElement.parentElement.parentElement.querySelector(".toDoItemSpace");
        toDoItemSpace.appendChild(newToDoItem);
        // console.log(event.target.parentElement.querySelector("input").value)
        // clear current list's input field's value
        event.target.parentElement.querySelector("input").value = "";
    }
}


// add addListBaord function to addList btn
document.querySelector("#add-list-btn").addEventListener("click", addListBoard);

// ***************************** Clicking in buttons/elements in  *****************************
document.querySelector(".to-do-list-title").addEventListener("dblclick", function(event) {
    if (event.target.id == "to-do-list-name") {
        var originalToDoListName = event.target.innerText;
        // change to an input field
        event.target.outerHTML = "<input autofocus type = 'text' id = 'to-do-list-name-input-field' placeholder = 'Define to-do list name...'>";
    
        // if press enter then that means you want to submit
        // if enter but input field value is "" that means go back to previous name
        document.querySelector("#to-do-list-name-input-field").addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
                if (event.target.value != "") {
                    event.target.outerHTML = "<h1 id = 'to-do-list-name'>" + event.target.value +"</h1>";
                } else if (event.target.value == ""){
                    // var newToDoListName = event.target.value;
                    event.target.outerHTML = "<h1 id = 'to-do-list-name'>" + originalToDoListName +"</h1>";
                }       
            } else if (event.key == "Escape") {
                event.target.outerHTML = "<h1 id = 'to-do-list-name'>" + originalToDoListName + "</h1>";
            }
        });
    }
});                            
                                                        

// ***************************** Clicking in buttons/elements in main *****************************
// e.g. remove button
// attach event listener to the parent element of the list
// when the main area is clicked, it will see if the click(event) comes from the remove-list-btn
// if yes, then remove the list 
document.querySelector("main").addEventListener("click", function(event) {
    console.log("clicked: " + event.target.parentElement);
    if (event.target.className == "remove-list-btn") {
        event.target.parentElement.parentElement.remove();

    } else if (event.target.className == "todo-item-remove-btn") {
        event.target.parentElement.parentElement.remove();

    } else if (event.target.className == "add-item-btn" && event.target.parentElement.querySelector("input").value !=="") {
        createNewTodoItem();

    } else if (event.target.className == "strikeThruBtn") {
        // item was not done
        // Window.taskItemBackgroundColor = event.target.parentElement.style.backgroundColor;
        if (event.target.parentElement.parentElement.querySelector("p").style.fontStyle == "") {
            event.target.parentElement.parentElement.querySelector("p").style.textDecoration = "line-through";
            event.target.parentElement.parentElement.querySelector("p").style.fontStyle = "italic";
            var emoji = document.createElement("IMG");
            // emoji will be randomly selected among the array
            var randomIndex = Math.floor(Math.random()*emojis.length);
            var randomEmoji = emojis[randomIndex];
            var emojiSrc = "emojis/" + randomEmoji
            emoji.setAttribute("class","emojis");
            emoji.setAttribute("src",emojiSrc);
            event.target.parentElement.parentElement.querySelector("p").appendChild(emoji);

        // item was done
        } else if (event.target.parentElement.parentElement.querySelector("p").style.textDecoration == "line-through") {
            var ptag = event.target.parentElement.parentElement.querySelector("p") 
            ptag.style.textDecoration = "";
            ptag.style.fontStyle = "";
            ptag.firstElementChild.remove();
            
        }
    }
});
// trigger button click on enter
document.querySelector("main").addEventListener("keyup", function(event) {
    console.log(event.key);
    if (event.key == "Enter") {
        if (event.target.className == "task-input-field") {
            if (event.target.value != "") {
                // trigger the add todo item button
                event.target.parentElement.querySelector("button").click();
            }
        } 
    }
});


document.querySelector("main").addEventListener("dblclick", function(event) {
    if (event.target.className == "board-name") {
        console.log("Last Board Name: " + event.target.innerText);
        var originalBoardName = event.target.innerText; 
        console.log("originalBoardName: " + originalBoardName);
        // window.lastBoardName = originalBoardName;

        // change to input field
        event.target.outerHTML = "<input autofocus value = '" + originalBoardName + "' type='text' placeholder = 'Enter new board name:' class = 'board-name-input-field'>";
        // console.log(event.target);  -- at this point the event target is still the h3 tag
        // i think the input field exist now
        document.querySelector(".board-name-input-field").addEventListener("keyup", function(event) {
            if (event.key == "Enter") {
                // ready to submit board name
                if (event.target.value != "") {
                    var newBoardName = event.target.value;
                    event.target.outerHTML = "<h3 class='board-name'>" + newBoardName + "</h3>";
                } else if (event.target.value == "") {
                    // revert to original value
                    event.target.outerHTML = "<h3 class='board-name'>" + originalBoardName + "</h3>";
                }
            } else if (event.key == "Escape") {
                // cancel input attempt
                // revert to original value
                event.target.outerHTML = "<h3 class='board-name'>" + originalBoardName + "</h3>";
            }
        })

    } else if (event.target.className == "toDoName") {
        var originalTaskName = event.target.innerText;
        // window.originalTaskName = originalTaskName; // sent to global for Enter keypress use
        event.target.outerHTML = "<input autofocus value = '" + originalTaskName + "' type='text' placeholder = 'change task to:' class = 'change-task-name-input-field' value = >";
        
        document.querySelector(".change-task-name-input-field").addEventListener("keyup", function(event) {
            if (event.key == "Enter") {
                if (event.target.value != "") {
                    var newToDoItemName = event.target.value;
                    event.target.outerHTML = "<p class = 'toDoName'>" + newToDoItemName + "<p>";
                } else if (event.target.value == "") {
                    event.target.outerHTML = "<p class = 'toDoName'>" + originalTaskName + "<p>";
                }
            } else if (event.key == "Escape") {
                event.target.outerHTML = "<p class = 'toDoName'>" + originalTaskName + "<p>";
            }
        })
    } 
});

// footer message remove button
document.querySelector("button#remove-footer").addEventListener("click",function(){
    document.querySelector("footer").remove();
});

// ***************************** Drag and Drop Operation Zone *****************************
// make all the toDoItems drag and drop
document.querySelector("main").addEventListener("dragstart", function (event) {
    // make draggedItem accessible to other listener like drop
    var draggedItem = event.target;
    window.draggedItem = draggedItem;
    // without settimeout the display will be none -- item will disappear -- once dragged
    setTimeout(function () {
        event.target.style.display = "none";
    },0);
});

document.querySelector("main").addEventListener("dragend", function (event) {
    setTimeout(function () {
        // return to original display 
        event.target.style.display = "flex";
    });
});

// setting up drop zone !!is this making everywhere available for drop...
document.querySelector("main").addEventListener("dragover", function (event) {
    if (draggedItem.className == "toDoItem" && event.target.className=="toDoItemSpace") {
        event.preventDefault();
    } else if (draggedItem.className == "list" && event.target.className == "listArea" ) {
        event.preventDefault();
    }
});


document.querySelector("main").addEventListener("dragenter", function(event){
    // enter only if the item is a todoItem
    if (draggedItem.className == "toDoItem" && event.target.className == "toDoItemSpace") {
        event.preventDefault();
        event.target.style.backgroundColor = "rgba(35, 39, 41, 0.527)";
    }
});

// area leaving from
document.querySelector("main").addEventListener("dragleave", function (event) {
    if (event.target.className == "toDoItemSpace") {
        event.target.style.backgroundColor = "rgba(57, 62, 65, 0.527)";
    } else if (event.target.className == "listArea") {
        event.target.style.backgroundColor = "rgba(73, 73, 73, 0.979)";
    } 
});

document.querySelector("main").addEventListener("drop", function (event) {
    event.target.append(draggedItem);
    if (event.target.className == "toDoItemSpace") {
        event.target.style.backgroundColor = "rgba(57, 62, 65, 0.527)";
    }
});


console.log("scripted loaded");




