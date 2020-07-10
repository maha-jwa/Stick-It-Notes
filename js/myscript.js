if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
}

let i;
// get the window count saved sticky notes from local storage but in type of number 
let count = Number(window.localStorage.getItem("count"));
// intiate count to zero if not exsists.
if (!count) {
    window.localStorage.setItem("count", 0);
}
// to still show the notes after page refresh, data of notes shoud be fetchet (gotten) from localstorage
for (i = 0; i < count + 1; i++) {
    let noteTitle = window.localStorage.key(i);
    let noteBody = window.localStorage.getItem(noteTitle);
    if (noteTitle !== "count" && noteTitle) {
        createNote(noteTitle, noteBody);
    }
}

// first step: add event to submit button which call createNoteFromInput function
// false- Default. The event handler is executed in the bubbling phase
document.getElementById("inputForm").addEventListener("submit", createNoteFromInput, false);
var itemList = document.getElementById("notes");
itemList.addEventListener("click", removeItem);
// second step: excute function excuted
function createNoteFromInput(e) {
    // 6 steps 
    // 1. first stop the defualt function of submit button
    e.preventDefault();
    // 2. save the values in the 2 inputs the client enterd
    var noteTitle = document.getElementById("new-note-title-input").value;
    var noteBody = document.getElementById("new-note-body-input").value;
    // 3. then clear the 2 inputes
    document.getElementById("new-note-title-input").value = "";
    document.getElementById("new-note-body-input").value = "";
    // use the code below = required attribute in the input tags
    // if (!noteTitle || !noteBody) {
    //     alert("Both Title and body of the note must be provided");
    //     return;
    // }

    // 4.  increase the count (no. of keys with their values) by one and save current count in localstorage
    count += 1;
    window.localStorage.setItem("count", count);
    // debug the code to let user enter same data as a copy istead of replacing the saved value
    while (window.localStorage.getItem(noteTitle)) {
        noteTitle += "-1";
    }
    // 5. then save the values in two inputs in localstorage as key and value
    window.localStorage.setItem(noteTitle, noteBody);
    // 6. then call createNote function by sending 2 attributes
    createNote(noteTitle, noteBody);
}

// third step:  excute createNote function by recieving 2 attributes
function createNote(noteTitle, noteBody) {
    // 1.  Chech if there is any note, hide the string with id no-notes
    if (count > 0) {
        document.getElementById("no-notes").className = "hidden";
    }
    // 2. create the HTML elements in each noteStick all childs of UL parent html element
    var li = document.createElement("li");
    var a = document.createElement("a");
    var h2 = document.createElement("h2");
    var p = document.createElement("p");
    let xButton = document.createElement("button");
    // 3. get the ul html element 
    var ul = document.getElementById("notes");
    // HTML elements often consists of both an element node and a text node.
    // 4. so we should create the text node for the 2 inputs and the button.
    let xText = document.createTextNode("X");
    let h2TN = document.createTextNode(noteTitle);
    let pTN = document.createTextNode(noteBody);
    // 5. then add text node to each elenemt
    h2.appendChild(h2TN);
    p.appendChild(pTN);
    xButton.appendChild(xText);
    // 6. set and arrange the html elements
    // h2, xbutton, p are childs of a which is child of li which is child of ul
    a.appendChild(h2);
    a.appendChild(xButton);
    a.appendChild(p);
    // 7. The setAttribute() method adds the specified attribute to an element, and gives it the specified value.
    a.setAttribute("href", "#");
    li.appendChild(a);
    ul.appendChild(li);
    //  add class delete to the x butthon which is styled in css sheet
    xButton.classList.add("delete");
}

function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure to delete the " + e.target.previousElementSibling.innerText + " " + "note?")) {
            //grab the parent
            // e.taget = button , e.target.parentElement = a,  e.target.parentElement.parentElement=li
            var li = e.target.parentElement.parentElement;
            itemList.removeChild(li);
            count -= 1;
            window.localStorage.setItem("count", count);
            // delete the saved value from the localstorage
            window.localStorage.removeItem(e.target.previousElementSibling.innerText);
            // to show the messeage no notes if there is no notestick
            if (count < 1) {
                document.getElementById("no-notes").className = "";
            }
        }
    }
}