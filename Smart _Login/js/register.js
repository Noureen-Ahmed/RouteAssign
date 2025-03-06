const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');
const Succeeded = document.querySelector('#Succeeded');
const errorMsg = document.querySelector('#errorMsg');
const userPassword = document.querySelector('#userPassword');
const registerBtn = document.querySelector('#registerBtn');
const form = document.querySelector("form");
let userArray = [];
if (localStorage.getItem('users')) {
    userArray = JSON.parse(localStorage.getItem('users'));
}
const validateInputs = (input) => {
    const regex = {
        userName: /^[A-Z][a-z]{2,11}$/gm,
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
const registerUser = () => {
    if (validateInputs(userName) && validateInputs(userEmail) && validateInputs(userPassword)) {
        errorMsg.classList.replace('d-block', 'd-none');
        if (userArray.find((user) => user.email === userEmail.value)) {
            errorMsg.classList.replace('d-none', 'd-block');
            return;
        }
        const user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        }
        userArray.push(user);
        localStorage.setItem('users', JSON.stringify(userArray));
        Succeeded.classList.replace('d-none', 'd-block');
        setTimeout(() => {
            window.location.href = 'login.html';

        }, 1);
        location.href = 'login.html';
    }
}
registerBtn.addEventListener('click', registerUser);
form.addEventListener("submit", (event) => {
    event.preventDefault();
})
userName.addEventListener("input", () => { validateInputs(userName) });
userEmail.addEventListener("input", () => { validateInputs(userEmail) });
userPassword.addEventListener("input", () => { validateInputs(userPassword) });