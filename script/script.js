const addButton = document.getElementById("addList");

const listContainer = document.getElementById("listContainer")

const addModal = document.getElementById("addModal");
const todoTitleInput = document.getElementById("todoTitleInput");
const submitButton = document.getElementById("submitButton");

const noteModal = document.getElementById("noteModal");
const titleHolder = document.getElementById("titleHolder");
const noteHolder = document.getElementById("noteHolder");

const addTodo = document.getElementById('addTodo');
const saveNote = document.getElementById('saveNote');
const deleteNote = document.getElementById('deleteNote');

const deleteModal = document.getElementById('deleteModal');
const deleteYes = document.getElementById('deleteYes');
const deleteNo = document.getElementById('deleteNo');

window.onload = loadJSON;

window.addEventListener("keydown",function(event){
    if(event.key==="="){
        addModal.style.display ="flex";
    }
})

addButton.addEventListener('click',function(){
    addModal.style.display ="flex";
    todoTitleInput.focus();
});

function handleToSubmit(){
    const newTodoTitle = todoTitleInput.value.trim();

    if(newTodoTitle){
        addList(newTodoTitle);
        addModal.style.display = "none";
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
    "to-do": [{
        chk: false,
        note: ""
    }]
})

const newIndex = arr.length - 1;

newTodo.classList.add('to-do-lists');
newTodo.innerHTML = `<p>${title}</p>`;
newTodo.setAttribute('data-id',newIndex);

listContainer.appendChild(newTodo);

openNotes(newTodo);
}

function saveJSON(){
    const arrString = JSON.stringify(arr);
    localStorage.setItem('arr', arrString);
}
function loadJSON(){
    const arrJSON = localStorage.getItem('arr');
    

    if(arrJSON){
        const loadedArr = JSON.parse(arrJSON);
        arr.push(...loadedArr);
        renderList();
    }
    
}

function renderList(){
    listContainer.innerHTML = '';

    arr.forEach((element, index)=>{
        const newTodo = document.createElement('div');

        newTodo.classList.add('to-do-lists');
        newTodo.innerHTML = `<p>${element.title}</p>`;
        newTodo.setAttribute('data-id',index);

        listContainer.appendChild(newTodo);
        if(element===0){
            listContainer.removeChild(newTodo);
        }
        openNotes(newTodo);
    })
}

function openNotes(newTodo){
    newTodo.addEventListener('click',function(){

        const tempArr = [];
        const noteTitle = document.createElement('div');
        
        const index = newTodo.getAttribute('data-id');
        const todoData = arr[index];
    
        titleHolder.innerHTML = '';
        noteTitle.innerHTML = `<h3>${todoData.title}</h3>`;  
        noteTitle.id = "noteTitle";
    
        noteHolder.innerHTML = '';
    
        todoData['to-do'].forEach((element) => {
    
            const noteWrapper = document.createElement('div');
            const checkBox = document.createElement('input');
            const note = document.createElement('input');
            const deleteTodo = document.createElement('button')
    
            noteWrapper.id = `noteWrapper`
    
            checkBox.id = 'checkbox';
            checkBox.type = 'checkbox';
            checkBox.checked = element.chk;
    
            note.type = 'text';
            note.id = 'note';
            note.value = element.note;
    
            deleteTodo.id = 'deleteTodo';
            deleteTodo.innerHTML = '❌';
    
            noteHolder.appendChild(noteWrapper);
            noteWrapper.appendChild(checkBox);
            noteWrapper.appendChild(note);
            noteWrapper.appendChild(deleteTodo);
    
            deleteTodo.onclick = function(){
                const deleteIndex = todoData['to-do'].indexOf(element);
    
                todoData['to-do'].splice(deleteIndex, 1);
                noteHolder.removeChild(noteWrapper);
            }
    
            saveNote.addEventListener('click',function(){
                element.note = note.value;
                element.chk = checkBox.checked;
                noteModal.style.display = "none";
                saveJSON();
    
            })
        });
    
        noteModal.style.display = "flex";
    
        titleHolder.appendChild(noteTitle);
    
        addTodo.onclick = addNote;
    
        document.onkeydown = function(e){
            if(e.key==='Enter'){
                addNote();
            }
        }
    
    
        function addNote(){
    
            if(document.activeElement.tagName.toLowerCase()==='input'&& document.activeElement.type==='text'&&document.activeElement.value!==''){
    
            
                const noteWrapper = document.createElement('div');
                const checkBox = document.createElement('input');
                const note = document.createElement('input');
                const deleteTodo = document.createElement('button');
                
                noteWrapper.id = `noteWrapper`;
    
                checkBox.id = 'checkbox';
                checkBox.type = 'checkbox';
                checkBox.checked = false;
    
                note.type = 'text';
                note.id = 'note';
                note.value = '';
    
                deleteTodo.id = 'deleteTodo';
                deleteTodo.innerHTML = '❌';
    
                noteHolder.appendChild(noteWrapper);
                noteWrapper.appendChild(checkBox);
                noteWrapper.appendChild(note);
                noteWrapper.appendChild(deleteTodo);
    
                note.focus();
    
                const newItems = {
                    chk: checkBox.checked,
                    note: note.value
                }
                tempArr.push(newItems);
    
                checkBox.addEventListener('change', function(){
                    newItems.chk = checkBox.checked;
                })
    
                note.addEventListener('input',function(){
                    newItems.note = note.value;
                })
                
                deleteTodo.onclick = function(){
                    const deleteIndex = tempArr.indexOf(newItems)
    
                    tempArr.splice(deleteIndex, 1);
                    noteHolder.removeChild(noteWrapper);
                }
            }
    }
    
        saveNote.onclick = function(){
            todoData['to-do'].push(...tempArr);
            saveJSON();
        }
    
        deleteNote.onclick = function(){
            deleteModal.style.display = 'flex';
        }
        deleteYes.onclick = function(){
            deleteModal.style.display = 'none';
            noteModal.style.display = 'none';
            arr.splice(index, 1, 0);
            listContainer.removeChild(newTodo);
            saveJSON();
        }
    })
}
addModal.addEventListener('click', function(e) {
    if (e.target === addModal) {
        addModal.style.display = "none"; // Close modal when clicking outside
    }
})

noteModal.addEventListener('click', function(e) {
    if (e.target === noteModal) {
        noteModal.style.display = "none"; // Close modal when clicking outside
    }
})

deleteModal.addEventListener('click', function(e) {
    if (e.target === deleteModal) {
        deleteModal.style.display = "none"; // Close modal when clicking outside
    }
})
deleteNo.addEventListener('click', function(){
    deleteModal.style.display = 'none';
})

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape"&&deleteModal.style.display==='flex') {
        deleteModal.style.display = "none";
    }else if(e.key==='Escape'){
        addModal.style.display = "none"; // Close modal when clicking outside
        noteModal.style.display = "none"; // Close modal when clicking outside
    }
})