//All element variables
const headerDate = document.querySelector('.todo-header-date');
const todoForm = document.querySelector('.todo-form');
const todoFormCheckbox = document.querySelector('.check-custom');
const todoInput = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list');
const uncompletedSpan = document.getElementById('uncompleted');
const completedSpan = document.getElementById('completed');

//All eventlisteners
window.addEventListener('DOMContentLoaded',setDate);
window.addEventListener('DOMContentLoaded',getTodoItemsToScreen);
window.addEventListener('DOMContentLoaded',setSpanTexts);
todoForm.addEventListener('submit',addTodo);
todoFormCheckbox.addEventListener('click',isCompleted);
todoList.addEventListener('click',todoActions);

//variables
let todos = [];

//functions
function setDate(){
    let date = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year:   new Date().getFullYear()
    }
    headerDate.innerText = `${date.day} / ${date.month} / ${date.year}`;
    return date;
}
function createListItem(data){
    let html = `<li class="todo-list-item-container">
                            <div class="todo-item flex">
                                <div class="todo-item-check-text flex">
                                    <label for=${data.id} class="todo-item-checkbox flex">
                                        <input type="checkbox" class="todo-check" id="deneme">
                                        <div class="check-custom">
                                            <!-- if my completed status is true this code add done icon to my element -->
                                            ${(data.completedStatus) ? '<div class="done-item"></div>' : '' }
                                        </div>
                                    </label>
                                    <a class="todo-text">${data.value}</a>
                                </div>
                                <div class="todo-item-icons flex">
                                    <div class="todo-item-edit-icon icon flex">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.93276 14.528C5.92026 14.5405 5.9074 14.5533 5.89423 14.5664C5.74206 14.7176 5.54944 14.9091 5.41256 15.1509C5.27567 15.3926 5.21061 15.6563 5.1592 15.8646C5.15453 15.8835 5.14998 15.902 5.1455 15.9199L4.4403 18.7407C4.4375 18.7519 4.43457 18.7635 4.43155 18.7755C4.39473 18.922 4.34373 19.1249 4.32616 19.3045C4.30594 19.5112 4.29926 19.9632 4.66804 20.332C5.03682 20.7007 5.48877 20.6941 5.69547 20.6738C5.87508 20.6563 6.078 20.6053 6.22448 20.5684C6.23649 20.5654 6.24811 20.5625 6.25932 20.5597L9.0801 19.8545C9.09804 19.85 9.11649 19.8455 9.13541 19.8408C9.34371 19.7894 9.60738 19.7243 9.84914 19.5874L5.93276 14.528ZM5.93276 14.528C5.93338 14.5274 5.93399 14.5268 5.9346 14.5262L13.5037 6.95711C13.5165 6.94427 13.5293 6.93144 13.5421 6.91863C13.8419 6.61871 14.1333 6.32723 14.406 6.11919C14.7134 5.88466 15.1113 5.66421 15.625 5.66421C16.1387 5.66421 16.5366 5.88466 16.844 6.11919C17.1167 6.32723 17.408 6.6187 17.7078 6.91861C17.7206 6.93143 17.7335 6.94426 17.7463 6.95711L17.0392 7.66421L17.7463 6.95711L18.0429 7.25368C18.0557 7.26651 18.0686 7.27934 18.0814 7.29214C18.3813 7.59195 18.6728 7.88331 18.8808 8.15598C19.1153 8.46338 19.3358 8.86134 19.3358 9.375C19.3358 9.88866 19.1153 10.2866 18.8808 10.594C18.6728 10.8667 18.3813 11.1581 18.0814 11.4579C18.0685 11.4707 18.0557 11.4835 18.0429 11.4963L10.4738 19.0654C10.4607 19.0785 10.4473 19.0919 10.4336 19.1058C10.2824 19.2579 10.0909 19.4505 9.84915 19.5874L5.93276 14.528Z" stroke="white" stroke-width="2"/>
                                            <path d="M13.0208 7.8125L16.1458 5.72917L19.2708 8.85417L17.1875 11.9792L13.0208 7.8125Z" fill="white"/>
                                        </svg>
                                    </div>
                                    <div class="todo-item-trash-icon icon flex">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.4167 15.625L10.4167 12.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M14.5833 15.625L14.5833 12.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M3.125 7.29167H21.875V7.29167C20.8256 7.29167 20.3009 7.29167 19.8949 7.48369C19.4766 7.68152 19.1399 8.01827 18.942 8.43656C18.75 8.84255 18.75 9.36726 18.75 10.4167V16.8333C18.75 18.7189 18.75 19.6618 18.1642 20.2475C17.5784 20.8333 16.6356 20.8333 14.75 20.8333H10.25C8.36438 20.8333 7.42157 20.8333 6.83579 20.2475C6.25 19.6618 6.25 18.719 6.25 16.8333V10.4167C6.25 9.36726 6.25 8.84255 6.05798 8.43656C5.86014 8.01827 5.5234 7.68152 5.10511 7.48369C4.69911 7.29167 4.17441 7.29167 3.125 7.29167V7.29167Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M10.4877 3.51103C10.6064 3.40029 10.8679 3.30243 11.2318 3.23263C11.5956 3.16283 12.0414 3.125 12.5 3.125C12.9586 3.125 13.4044 3.16283 13.7683 3.23263C14.1321 3.30242 14.3937 3.40029 14.5124 3.51103" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="todo-item-date">
                                    ${data.createdDate.day} / ${data.createdDate.month} / ${data.createdDate.year}
                            </div>
                        </li>`;
    todoList.innerHTML += html;
}
function addTodo(e){
    e.preventDefault();

    let userTodoValue = todoInput.value;
    let emptyStatus = isEmpty(userTodoValue);

    const todoItem = {
        id: getRandomNumber(),
        value:  userTodoValue,
        completedStatus: isCompleted(),
        createdDate: setDate(),
        endingDate:null
    }

    if(emptyStatus.status){
        addTodoToStorage(todoItem);
        createListItem(todoItem);
        clear(todoInput)
    }else{
        console.log(emptyStatus.message);
    }

}
function addTodoToStorage(todoItem){
    if(localStorage.getItem('raikenTodos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('raikenTodos'));
    }
    todos.push(todoItem);
    localStorage.setItem('raikenTodos',JSON.stringify(todos));
}
function removeTodoFromStorage(id){
    if(localStorage.getItem('raikenTodos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('raikenTodos'));
    }
    todos = todos.filter(item => item.id != id)
    localStorage.setItem('raikenTodos',JSON.stringify(todos));
}
function getTodoItemsToScreen(){
    if(localStorage.getItem('raikenTodos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('raikenTodos'));
    }
    todos.forEach(item => {
        createListItem(item);
    })
}
function todoActions(e){
    e.preventDefault();

    let focusItem = e.target;
    // console.log(focusItem);

    if(focusItem.classList.contains('todo-item-trash-icon')){
        let id = e.target.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute('for');
        let element = e.target.parentElement.parentElement.parentElement;
        element.remove();
        removeTodoFromStorage(id);
    }
    if(focusItem.classList.contains('check-custom')){
        let id = e.target.parentElement.parentElement.firstElementChild.getAttribute('for');
        if(focusItem.children.length == 0){
            focusItem.innerHTML = `<div class="done-item"></div>`;
            makeDone(id);
        }else{
            focusItem.innerHTML = '';
            makeDone(id);
        }
    }
}
function setSpanTexts(){
    if(localStorage.getItem('raikenTodos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('raikenTodos'));
    }
    let completedArray = [];
    let uncompletedArray = [];
    todos.forEach(item => {
        if(item.completedStatus){
            completedArray.push(item.completedStatus);
        }else{
            uncompletedArray.push(item.completedStatus);
        }
    })
    completedSpan.textContent = completedArray.length;
    uncompletedSpan.textContent = uncompletedArray.length;
}

//utils functions
function getRandomNumber(){
    return Math.floor(10000 + Math.random() * 90000);
}
function isEmpty(input){
    if(!input){
        return {
            status: false,
            message: "This input is empty",
        }
    }else{
        return{
            status:true,
            message: "This input is not empty",
        }
    }
}
function isCompleted(){
    let checkbox = todoFormCheckbox.children[0];

    if(checkbox.classList.contains('d-none')){
        checkbox.classList.toggle('d-none');
        return false;
    }else if(!checkbox.classList.contains('d-none')){
        checkbox.classList.toggle('d-none');
        return true;
    }
}
function clear(input){
    input.value = '';
}
function makeDone(id){
    if(localStorage.getItem('raikenTodos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('raikenTodos'));
    }
    todos.map(item => {
        if(item.id == id){
           if(item.completedStatus){
               item.completedStatus = false;
           }else{
               item.completedStatus = true
           }
        }
    });
    localStorage.setItem('raikenTodos',JSON.stringify(todos));
}


