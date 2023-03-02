function login() {
    let flag = validateFildes();
    if (flag == true) {
        let userLoggedIn = {
            "loggedIn": true,
            "username": enteredUsername = document.getElementsByName("username")[0].value
        }
        localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
        window.location.assign("../home/home.html");
    } else {
        alert("wrong username or passeord");
    }
}

function validateFildes() {
    enteredUsername = document.getElementsByName("username")[0].value;
    enteredPassword = document.getElementsByName("password")[0].value;

    let user = JSON.parse(localStorage.getItem(enteredUsername));

    if (user != undefined) {
        password = user['password'];
        enteredPassword = enteredPassword;
        if (enteredPassword == password) {
            return true;
        }
    }
    return false;
}

function seePassword() {
    var x = document.getElementById("pass");

    if (x.type === "password") {
        x.type = "text";
    }
    else {
        x.type = "password";
    }
}
