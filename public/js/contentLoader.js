let content;
let container = document.getElementById('user-container')
let template = document.getElementById('template')



async function loadContent() {
    content = await API.fetch();
    for (user of content) {
        //select all the html elements necessary to build user card
        let card = template.cloneNode(true);
        let name = card.getElementsByClassName('user-name')[0];
        let email = card.getElementsByClassName('user-email')[0];
        let activeButton = card.getElementsByClassName('button')[0];
        let deleteButton = card.getElementsByClassName('button')[1];
        //user name element
        name.innerText = `${user.firstName} ${user.lastName}`;
        //user email element
        email.innerText = `${user.email}`;
        //button
        if (user.state==='active') {
            activeButton.innerText = 'Deactivate';

        }
        else
            activeButton.innerText = 'Activate';
        card.id = user.id
        container.append(card);
    }
}
window.onload=loadContent;


//handles changing of button for live change updates
const toggleButton=(button,active)=>{
    button.innerText= active ? 'Deactivate':'Activate'

}

//handling Active/deactivate of account

async function handleAdminActiveUpdate(e){
    let {innerText} = e.target;
    let id = e.target.parentNode.parentNode.id
    let isPending = innerText==='Activate';
    let data = {
        state: isPending ? 'active':'pending'
    }
    let res = await API.update(id,data);
    console.log(res)
    if(res.error) return console.log(res.error)
    toggleButton(e.target,isPending)

}
//handles admin deletion of account. uses API object
async function handleAdminDelete(e){
    let {id}=e.target.parentNode.parentNode
    let res = await API.deleteUser(id);
    //if deletion failed, dont continue
    if(res.error)return
    //otherwise delete the dom element
    document.getElementById(id).remove();
}

//handle admin clicks on .active-button elements. 
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('active-button'))handleAdminActiveUpdate(e)
    if(e.target.classList.contains('delete-button'))handleAdminDelete(e)
})
