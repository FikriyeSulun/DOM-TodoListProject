
//Todo Eleman Ekleme

//Eleman Seçimi
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");

// const items = ["Todo 1", "Todo 2", "Todo 3", "Todo 4", "Todo 5", "Todo 6"];
let todos;

//load items
loadItems();

eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener("submit", addNewItem);
    //delete an item
    taskList.addEventListener("click", deleteItem);
    //deleta all item
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
    todos = getItemsFromLS();
    // items.forEach(function (item) {
    //     creatItem(item);
    // })
    todos.forEach(function (item) {
        creatItem(item);
    })
}

//get items from local storage
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

//set item to local storage
function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function creatItem(newTodo) {
    //li oluşturma
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    //a oluşturma
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
}


//Eleman Ekleme
function addNewItem(e) {
    if (input.value === '') {
        alert("add new item");
        console.log("submit");
    }

    // //li oluşturma
    // const li = document.createElement("li");
    // li.className = "list-group-item list-group-item-secondary";
    // li.appendChild(document.createTextNode(input.value));

    // //a oluşturma
    // const a = document.createElement("a");
    // a.classList = "delete-item float-right";
    // a.setAttribute("href", "#");
    // a.innerHTML = '<i class="fas fa-times"></i>';

    // li.appendChild(a);
    // taskList.appendChild(li);
    creatItem(input.value);
    setItemToLS(input.value);

    input.value = "";

    e.preventDefault();
}


//Eleman Silme
function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) {
            // console.log(e.target);
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsFromLS();
    todos.forEach(function (todo, index) {
        if(todo === deletetodo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Tüm Elemanları Silmek
function deleteAllItems(e) {
    if (confirm("Tüm elemanları silmek istediğinize emin misiniz?")) {
        // taskList.childNodes.forEach(function (item) {
        //     // console.log(item);
        //     if (item.nodeType === 1) {
        //         item.remove();
        //     }
        // });
        while(taskList.firstChild){ //liste boşalana kadar ilk elemandan başlayarak siler
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();

    // taskList.innerHTML= "";  //alternatik yöntem
}