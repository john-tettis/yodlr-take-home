let registerLink = document.getElementById('register-link')


//when page loads, check local storage for user object.
window.addEventListener('load',(e)=>{
    updateRegisterLink()
    

})

async function updateRegisterLink(){
    let user = JSON.parse(window.localStorage.getItem('user'));
    
    if(user){
        let db_user = await API.getUser(user.id)
        if(db_user.firstName!==user.firstName){
            logOut();
            return
        }
        //change to logout function
        registerLink.innerText=`Logout(${user.firstName})`
        registerLink.href=`#`
        registerLink.onclick=()=>{
            logOut()
            updateRegisterLink()
        }
    }
    else{
        //change to link to registration page
        registerLink.innerText=`Register`
        registerLink.href=`./signup.html`
    }

}
function logOut() {
    window.localStorage.setItem('user', null);
}
