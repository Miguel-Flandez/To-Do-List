const addButton = document.getElementById("addList");
const listContainer = document.getElementById("listContainer")

const popupModal = document.getElementById("popupModal");
const todoTitleInput = document.getElementById("todoTitleInput");
const submitButton = document.getElementById("submitButton");

const popupModal2 = document.getElementById("popupModal2");
const titleHolder = document.getElementById("titleHolder")


window.addEventListener("keydown",function(event){
    if(event.key==="+"){
        popupModal.style.display ="flex";
    }
})

addButton.addEventListener('click',function(){
    popupModal.style.display ="flex";
    todoTitleInput.focus();
});

function handleToSubmit(){
    const newTodoTitle = todoTitleInput.value.trim();

    if(newTodoTitle){
        addList(newTodoTitle);
        popupModal.style.display = "none";
        todoTitleInput.value="";
    }else{
        alert("kupal ka")
    }
}

submitButton.addEventListener('click',handleToSubmit);

todoTitleInput.addEventListener('keydown', function(event){
    if(event.key==="Enter"){
        handleToSubmit();
    }

})

const arr = [];

function addList (title){
    const newTodo = document.createElement("div");
    

    arr.push({
        title:title,
        "to-do": {}
    })

    const newIndex = arr.length - 1;


    newTodo.classList.add('to-do-lists');
    newTodo.innerHTML = `<p>${title}</p>`;
    newTodo.setAttribute('data-id',newIndex);

    listContainer.appendChild(newTodo);

    newTodo.addEventListener('click',function(){
        const noteTitle = document.createElement('div');
        const index = newTodo.getAttribute('data-id');
        const todoData = arr[index];

        titleHolder.innerHTML = '';

         noteTitle.classList.add("noteTitle");
         noteTitle.innerHTML = `<h3>${todoData.title}</h3>`;    
         popupModal2.style.display = "flex";

         titleHolder.appendChild(noteTitle);

         return todoData;
    })
}

popupModal.addEventListener('click', function(e) {
    if (e.target === popupModal) {
        popupModal.style.display = "none"; // Close modal when clicking outside

    }
})
window.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        popupModal.style.display = "none"; // Close modal when clicking outside
        popupModal2.style.display = "none"; // Close modal when clicking outside
    }
})
popupModal2.addEventListener('click', function(e) {
    if (e.target === popupModal2) {
        popupModal2.style.display = "none"; // Close modal when clicking outside
    }
})