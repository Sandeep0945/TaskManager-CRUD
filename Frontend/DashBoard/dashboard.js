const taskcontainer = document.getElementById("taskcontainer");

async function getAllTasks(params) {
    try{
        const response = await fetch("http://localhost:3000/api/task/read",{
            method : "GET"
        })

        const data = await response.json();

        taskcontainer.innerHTML = "";

        data.tasks.forEach((task)=>{
            const card = document.createElement("div");
            card.id = task._id;
            card.classList.add(
                "items-center", "text-center", "flex", "flex-col",
                "min-h-70", "w-64", "rounded-2xl",
                "bg-[#1a1a2e]", "border", "border-[#3a2f5c]",
                "shadow-[0_0_15px_rgba(168,85,247,0.25)]", "p-6"
            );
            card.innerHTML = `<h1 class="mt-4 mb-6 font-semibold text-[#f1e9ff] wrap-break-word w-full">Title = ${task.title}</h1>
                <p class="mb-6 text-sm text-[#f1e9ff]/80 wrap-break-word w-full">Description = ${task.description}</p>
                <div class="p-2 flex gap-3 mt-auto">
                    <button class="updatebtn w-22 p-1.5 rounded-full bg-[#a855f7] text-[#12121f] font-medium hover:bg-[#c084fc] transition">Update</button>
                    <button class="deletebtn w-22 p-1.5 rounded-full bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7] font-medium hover:bg-[#a855f7]/30 transition">Delete</button>
                </div>`
            taskcontainer.appendChild(card);

            const deletebtn = card.querySelector(".deletebtn");
            deletebtn.addEventListener("click", deleteTask);
    
            const updatebtn = card.querySelector(".updatebtn");
            updatebtn.addEventListener("click", () => {
                window.location.href = `../CreateTask/task.html?id=${task._id}`;
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}

getAllTasks();

async function deleteTask(){
    taskid = this.parentElement.parentElement.id;

    const response = await fetch(`http://localhost:3000/api/task/delete/${taskid}`,{
        method : "DELETE"
    })

    if(response.ok){
        alert("Task Deleted Successfully");
    }

    getAllTasks();
}

async function updateTask(task){
    let editTaskId = null;
    const titleInput = document.getElementById("title");
    const textInput = document.getElementById("text");
    titleInput.value = task.title;
    textInput.value = task.description;
    editTaskId = task._id;
    createbtn.innerText = "Update Task";
}

const profilePanel = document.getElementById("profilePanel");
const closeProfileBtn = document.getElementById("closeProfileBtn");
const profileBtn = document.getElementById("profileBtn");
const profileOverlay = document.getElementById("profileOverlay");
const avatarLetter = document.getElementById("avatarLetter");
const avatarLetterNav = document.getElementById("avatarLetterNav");

const name = document.getElementById("name");
const email = document.getElementById("email");
const logoutBtn = document.getElementById("logoutBtn");


const loadUserIntoPanel = async () => {
    const storedUser = localStorage.getItem("user");

    if(!storedUser) return;

    const user = JSON.parse(storedUser);
    const name = user.name || "User";
    const email = user.email || "";
    const firstLetter = name.charAt(0).toUpperCase();

    avatarLetter.innerText = firstLetter;
    avatarLetterNav.innerText = firstLetter;
    profileName.innerText = name;
    profileEmail.innerText = email;
}

loadUserIntoPanel();

function openProfilePanel(){
    loadUserIntoPanel();
    profilePanel.classList.remove("translate-x-full");
    profileOverlay.classList.remove("hidden");
}

function closeProfilePanel(){
    profilePanel.classList.add("translate-x-full");
    profileOverlay.classList.add("hidden");
}

if(profileBtn){
    profileBtn.addEventListener("click", openProfilePanel);
}
if(closeProfileBtn){
    closeProfileBtn.addEventListener("click", closeProfilePanel);
}

if(profileOverlay){
    profileOverlay.addEventListener("click", closeProfilePanel);
}


logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.replace("../Login/login.html");
});
