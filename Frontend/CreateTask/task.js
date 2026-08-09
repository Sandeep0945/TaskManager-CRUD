const token = localStorage.getItem("token");

if (!token) {
    window.location.replace("../Login/login.html");
}

// Back/Forward se task page restore hone par
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        window.location.replace("../Login/login.html");
    }
});

const title = document.getElementById("title");
const text = document.getElementById("text");
const createbtn = document.getElementById("createbtn");
const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");


let editTaskId = null;

async function loadTaskForEdit(){
    if(!taskId) return;

    try {
        const response = await fetch("http://localhost:3000/api/task/read", {
            method: "GET",
            "Authorization": `Bearer ${token}`
        });
        const data = await response.json();

        const task = data.tasks.find((t) => t._id === taskId);
        if(!task) return;

        title.value = task.title;
        text.value = task.description;
        editTaskId = task._id;
        createbtn.innerText = "Update Task";
    } 
    catch (error) {
        console.log(error);
    }
}

loadTaskForEdit();

createbtn.addEventListener("click", async () => {
    const taskData = {
        title: title.value,
        description: text.value
    }

    let response;

    if (editTaskId) {

        // Update
        response = await fetch(`http://localhost:3000/api/task/update/${editTaskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        });

        alert("Task Updated Successfully");

        editTaskId = null;
        createbtn.innerText = "Create Task";

    } else {

        // Create
        response = await fetch("http://localhost:3000/api/task/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        });

        alert("Task Created Successfully");
    }

    title.value = "";
    text.value = "";

    window.location.replace("task.html");
});