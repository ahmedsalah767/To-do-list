import axios from 'axios'
import {showAlert,hideAlert} from './alert'

export const create = async (title, category,description,pirorety,dueDate) => {
    try{
const res = await axios({
    method: 'POST',
    url: '/api/tasks',
    data:{
        title,
        category,
        description,
        pirorety,
        dueDate,
    }
})
if(res.data.status === 'success'){
    showAlert('success', 'Logged in successfully')
}
window.setTimeout(()=>{
    location.assign('/')
}, 1500)
}
catch(err) {
showAlert('error', 'some fields are mandatory') 
console.log(err.response.data)
}
}



export const delTask = async (id) => {
    try{
const res = await axios({
    method: 'DELETE',
    url: `/api/tasks/${id}`,

})
if(res.data.status === 'success'){
    showAlert('success', 'Logged in successfully')
}
window.setTimeout(()=>{
    location.assign('/')
}, 1500)
}
catch(err) {
showAlert('error', 'error') 
console.log(err.response.data)
}
}

