function signup() {

    //add user here
    username = document.getElementsByName('username')[0].value;
    password = document.getElementsByName('password')[0].value;
    mail = document.getElementsByName('e-mail')[0].value;

    let user = {
        'username': username,
        'password': password,
        'mail': mail,
        'score': 0
    };

    localStorage.setItem(username, JSON.stringify(user));
    window.location.replace("../signin/signin.html");
    return false;
}

function hasACount() {
    window.location.replace("../signin/signin.html");
    return true;
}