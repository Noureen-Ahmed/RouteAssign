const loginBtn = document.querySelector("#loginBtn");
const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');
const Succeeded = document.querySelector('#Succeeded');
const errorMsg = document.querySelector('#errorMsg');
const form = document.querySelector("form");
let userArray = [];
if (localStorage.getItem("users")) {
    userArray = JSON.parse(localStorage.getItem("users"));
}
const validateInputs = (input) => {
    const regex = {
        userEmail: /^[A-Za-z0-9_-]{3,}@(gmail|outlook|yahoo|msn|hotmail)\.(com|org)$/gm,
        userPassword: /^[A-Z][A-Za-z0-9!@#$%^&*]{2,9}$/gm

    }
    if (regex[input.id].test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    }
    else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}
const loginUser = () => {
    if (validateInputs(userEmail) && validateInputs(userPassword)) {
        errorMsg.classList.replace('d-block', 'd-none');
        for (let i = 0; i < userArray.length; i++) {
            if (userArray[i].email === userEmail.value && userArray[i].password === userPassword.value) {
                Succeeded.classList.replace('d-none', 'd-block');
                localStorage.setItem("userName", userArray[i].name)
                console.log('login');
            
                setTimeout(() => {
                    window.location.href = 'Home.html'
                }, 1000)
                return;
            }
        }
        errorMsg.classList.replace('d-none', 'd-block');

    }
}
loginBtn.addEventListener('click', loginUser);
form.addEventListener("submit", (event) => {
    event.preventDefault();
})
userEmail.addEventListener("input", () => { validateInputs(userEmail) });
userPassword.addEventListener("input", () => { validateInputs(userPassword) });