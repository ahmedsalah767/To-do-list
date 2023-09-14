import {login,logout,signup} from './login'
import {create, delTask} from './tasks'


const loginForm = document.querySelector('.login-form')
const signupForm = document.querySelector('.signup-form')
const out = document.querySelector('.logout-btn')

const createForm = document.querySelector('.form-tasks')

const deleteTask = document.querySelector('.del-task-btn')

out.addEventListener('click', logout)

const deleteButtons = document.querySelectorAll('.del-task-btn');
deleteButtons.forEach(button => {
  button.addEventListener('click', e => {
    const id = button.value;
    console.log(id);
    delTask(id)    
});
});


if(loginForm){
    loginForm.addEventListener('submit', e =>{
        e.preventDefault();
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        console.log(email,password)
        login(email,password)
    })
    }



if(signupForm){

    signupForm.addEventListener('submit', e =>{
        e.preventDefault();
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const passwordConfirm = document.getElementById('passwordConfirm').value
        const name = document.getElementById('name').value

        signup(email,password,passwordConfirm, name)
})

}

if(createForm){
    createForm.addEventListener('submit', e =>{
        e.preventDefault();
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const dueDate = document.getElementById('dueDate').value
        const pirorety = document.getElementById('pirorety').value
        const category = document.getElementById('category').value


        create(title, category,description,pirorety,dueDate)
})
}




