let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Array to store tasks
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
	arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// Clear the input field after submitting
submit.onclick = function () {
	if (input.value) {
		addTaskToArray(input.value);
		input.value = "";
	}
};

// Delete btn Functionality
tasksDiv.addEventListener("click", (e) => {
	if (e.target.classList.contains("del")) {
		// Remove From Local Storage
		deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
		// Remove From Page
		e.target.parentElement.remove();
	}
	if (e.target.classList.contains("task")) {
		// Toggle Completed in the class
		toggleTaskStatuewith(e.target.getAttribute("data-id"));
		// Toggle Done Class
		e.target.classList.toggle("done");
	}
});

function addTaskToArray(taskTxt) {
	const task = {
		id: Date.now(),
		title: taskTxt,
		completed: false,
	};
	// Add tasks to the array
	arrayOfTasks.push(task);
	// Add tasks to the Page
	addElementsToPageFrom(arrayOfTasks);
	// Add tasks to the Local Storage
	addDataToLocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
	tasksDiv.innerHTML = ""; // Empty the tasks div first then we can fill it with new data
	arrayOfTasks.forEach((task) => {
		let div = document.createElement("div");
		div.className = "task";
		// Check if Done
		if (task.completed) {
			div.className = "task done";
		}
		div.setAttribute("data-id", task.id);
		div.appendChild(document.createTextNode(task.title));
		// Add Delete span to the Created Div
		let span = document.createElement("span");
		span.className = "del";
		span.appendChild(document.createTextNode("Delete"));
		div.appendChild(span);
		tasksDiv.appendChild(div); // Add the Created Element to the page
	});
}

function addDataToLocalStorage(arrayOfTasks) {
	window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
	let data = window.localStorage.getItem("tasks");
	if (data) {
		let tasks = JSON.parse(data);
		addElementsToPageFrom(tasks);
	}
}

function deleteTaskWith(taskId) {
	arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
	addDataToLocalStorage(arrayOfTasks);
}

function toggleTaskStatuewith(taskId) {
	for (let i = 0; i < arrayOfTasks.length; i++) {
		if (arrayOfTasks[i].id == taskId) {
			arrayOfTasks[i].completed = !arrayOfTasks[i].completed;
		}
	}
	addDataToLocalStorage(arrayOfTasks);
}
