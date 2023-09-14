import axios from 'axios'
import {showAlert,hideAlert} from './alert'
export const login = async (email, password) => {
    try{
const res = await axios({
    method: 'POST',
    url: 'http://localhost:3000/api/auth/login',
    data:{
        email,
        password
    }
})
if(res.data.status === 'success'){
    showAlert('success', 'Logged in successfully')
}
window.setTimeout(()=>{
    location.assign('/')
}, 1500)
console.log(res,email,password)
}
catch(err) {
showAlert('error', err.response.data.message) 
console.log(err.response.data)
}
}

export const logout = async () => {
    try{
        const res = await axios({

            method: 'GET',
            url: 'http://localhost:3000/api/auth/logout',
        })
        if(res.data.status === 'success'){
            location.reload(true)
        }
        window.setTimeout(()=>{
            location.assign('/')
        }, 1500)
    } catch(err){
showAlert('error', 'Error loggin out, try again')
    }
}




export const signup = async (email, password, passwordConfirm, name) => {
    try{
const res = await axios({
    method: 'POST',
    url: 'http://localhost:3000/api/auth/signup',
    data:{
        email,
        password,
        passwordConfirm,
        name
    }
})
if(res.data.status === 'sucecss'){
    showAlert('success', 'signed up successfully')
}
window.setTimeout(()=>{
    location.assign('/')
}, 1500)
console.log(res,email,password)
}
catch(err) {
showAlert('error', err.response.data.message) 
console.log(err.response.data)
}
}