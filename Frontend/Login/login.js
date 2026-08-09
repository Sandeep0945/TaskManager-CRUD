const email = document.getElementById("email");
const password = document.getElementById("password");
const loginbtn = document.getElementById("loginbtn");

loginbtn.addEventListener("click", async () => {
    const userData = {
        email: email.value,
        password: password.value
    }
    try{
        const response = await fetch("http://localhost:3000/api/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const data = await response.json();
        console.log(data);

        if(response.ok){
            localStorage.setItem("user", JSON.stringify(data.user));

            if(data.token){
                localStorage.setItem("token",data.token);
            }
            alert("Login Successful");
            window.location.replace ("../CreateTask/task.html");
        }
        else{
            alert( data.message || "Login Failed");
        }
    }
    catch(error){
        console.log(error);
        alert("Something went wrong. Please try again.");
    }
});