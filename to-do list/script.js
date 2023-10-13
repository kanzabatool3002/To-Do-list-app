const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {

        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let update = document.createElement("update");
        update.textContent = "Edit";
        update.onclick = function () {
            editTask(li);
        };
        li.appendChild(update);

        let span = document.createElement("span");
        span.innerHTML = "\Delete";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        const editButton = e.target.querySelector("update");
        if (editButton) {
            editButton.style.display = e.target.classList.contains("checked") ? "none" : "inline";
        }
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);
function editTask(li) {
    const taskText = li.firstChild.textContent;
    const newText = prompt("Edit the task:", taskText);

    if (newText === '') {
        alert("You must write something");
    } else if (newText !== null) {
        li.firstChild.textContent = newText;
    }
    saveData();
}
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();