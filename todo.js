let ul = document.createElement("ul");
document.body.appendChild(ul);
let button = document.querySelector("button");
let input = document.querySelector("input[type='text']");

let todos = [];
initialize_todos(todos);

function initialize_todos(todos)
{
    let old_todos = JSON.parse(localStorage.getItem('todos'));
    if(old_todos)
    {
        old_todos.map((todo)=>{
            afficher_todo(todo);
            insert_todo_in_todos(todo,todos);
            verif_checked(todo);
            on_click_checkbox(); 
        })
    }
}

function verif_checked(todo)
{
    if(todo.checked == true)
    {
        let li = document.getElementById(todo.id.toString());
        let checkbox = li.firstChild;
        checkbox.checked = true;
        span_style(li,true)
    }
    
}

button.onclick = ()=>{
    if(input.value != "")
    {
        let todo = create_todo(input.value,todos);
        afficher_todo(todo);
        insert_todo_in_todos(todo,todos);
        refresh_localStorage(todos);   
        on_click_checkbox();
        
    }
}
function on_click_checkbox()
{
    let nodeList = document.querySelectorAll("input[type='checkbox']");
    let tab_checkbox = Array.prototype.slice.call(nodeList);
    tab_checkbox.map((checkbox)=>{
        checkbox.onclick = (e)=>{
            let todo_clicked = todos[e.target.parentNode.id] //e.target.parentNode.id == li.id
            if(todo_clicked.checked == false)
            {
                span_style(e.target.parentNode,true);
                update_todo_in_todos(e.target.parentNode,todos,true);
            }
            else
            {
                span_style(e.target.parentNode,false);
                update_todo_in_todos(e.target.parentNode,todos,false);
            }
            refresh_localStorage(todos);
        }
    })
}
function span_style(li,bool)
{
    if(bool == true)
        li.lastChild.style.textDecoration = "line-through";
    else
        li.lastChild.style.textDecoration = "none";
}

function update_todo_in_todos(li,todos,bool)
{
    let id_li = li.id;
    todos[id_li].checked = bool;
}

function create_todo(inputValue)
{
    return {
        id : todos.length,
        text : inputValue,
        checked : false,
    }
}

function insert_todo_in_todos(todo,todos)
{
    todos.push(todo);
}

function afficher_todo(todo)
{
    let li = document.createElement("li");
    ul.appendChild(li);
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    li.appendChild(checkbox);
    let span = document.createElement("span");
    span.innerText = todo.text;
    li.appendChild(span);
    ul.lastChild.setAttribute("id",todos.length);

}

function refresh_localStorage(todo)
{
    localStorage.setItem("todos",JSON.stringify(todos));
}