const welcomeMsg = document.querySelector('#WelcomeMsg');
const logoutBtn = document.querySelector('#logoutBtn');
if (localStorage.getItem("userName")) {
    var userName = localStorage.getItem("userName");
    welcomeMsg.innerHTML=`Welcome ${userName}`

}
else {
    welcomeMsg.innerHTML=`You're Not Logged In, Redirecting To Login Page .....`
    setTimeout(() => {
        window.location.href = "login.html";
    }
    ,1000);
}
const logout = () => {
    localStorage.removeItem("userName");
    welcomeMsg.innerHTML = `You're Now Logging Out, Redirecting To Login Page .....`;
    setTimeout(() => {
        window.location.href = 'login.html';
    },2000)
}
logoutBtn.addEventListener('click',logout)