let formData={

}


const handleChange=(e)=>{
    formData={...formData, [e.target.id]:e.target.value}
    console.log(formData)
}
const handleSubmit= async(e)=>{
    e.preventDefault();
    let res = await API.register(formData);
    if(res.error){
        return console.log(res.error);
    }
    window.location.href='./index.html'

}


let form = document.getElementById('register');

form.addEventListener('change',handleChange)
form.addEventListener('submit',handleSubmit)

