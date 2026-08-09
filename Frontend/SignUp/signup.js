const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signupbtn = document.getElementById("signupbtn");

signupbtn.addEventListener("click", async () => {
    const userData = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    const response = await fetch("http://localhost:3000/api/auth/signup",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(userData)
    })

    const data = await response.json();
    console.log(data);

    if(response.ok){
        alert("Signup successful");

        name.value = "";
        email.value = "";
        password.value = "";

        window.location.href = "../Login/login.html";
    }
    else {
        alert(data.message || "Signup failed");
    }
});