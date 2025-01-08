import { completedTask, findCompleted, removeFromComp, saveToComp } from "./completedtask.js";
import { addToPending, findPending, pendingTask, removeFromPending, updateTodoDesc } from "./pendingtask.js";

function renderPendingPage(arr){

    let pendingTaskHTML = ""
    arr.forEach(task => {
        pendingTaskHTML += `
            <div class="todo-block todo-block-${task.id}">
                <img src="icons/done.svg" alt="" class="checked js-checked-${task.id}"/>
                <div class="todo">
                  <div class="todo-desc" data-id="${task.id}">${task.todo}</div>
                  <input type="text" class="upd-todo ups-${task.id}" placeholder="update" data-id="${task.id}" value="${task.todo}" />
                </div>
                <div class="actions">
                  <button><img class="delete" data-id="${task.id}" src="icons/delete.svg" alt="" /><div class="tool-tip">delete</div></button>
                  <button><img class="update" data-id="${task.id}" src="icons/update.svg" alt="" /><div class="tool-tip">update</div></button>
                </div>
            </div>
        `
    })
    
    const isEmpty = pendingTask.length === 0
    
    document.querySelector(".js-pending-list").innerHTML = isEmpty ? `<div class="no_task"><img src="icons/no-task.svg" alt=""/>
    <p>No tasks...</p></div>` : pendingTaskHTML

    // when pressing on enter after pressing the update button
    document.querySelectorAll(".upd-todo").forEach(upd => {
        upd.addEventListener("keydown", e => {
            if(e.key === "Enter"){
                const {id} = e.target.dataset
                const input = document.querySelector(`.ups-${id}`).value
                updateTodoDesc(id,input)
                document.querySelector(`.todo-block-${id}`).classList.remove("isupdating")
                renderPendingPage(pendingTask)
            }
        })
    })
    
}
renderPendingPage(pendingTask)

// when you press on the add todo button
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    if(document.querySelector("form input").value.trim() !== ""){
        const input = document.querySelector("form input").value
        const id = pendingTask.length + 1;
        const data = {
            id,
            status: "pending",
            todo: input
        }
        addToPending(data)
        renderPendingPage(pendingTask)
        document.querySelector("form input").value = ""
    }
})


// when you press on the delete and update buttons
document.querySelector(".js-pending-list").addEventListener("click", e => {

    // onclicking the delete button
    if(e.target.className === "delete"){
        const {id} = e.target.dataset
        const container = e.target.parentNode.parentNode.parentNode
        container.remove()
        removeFromPending(Number(id))
        renderPendingPage(pendingTask)
    }

    // onclicking the update button
    if(e.target.className === "update"){
        const {id} = e.target.dataset
        document.querySelector(`.todo-block-${id}`).classList.add("isupdating")
    }

    // onclicking on the todo-block
    if(e.target.className === "todo-desc"){
        const {id} = e.target.dataset
        document.querySelector(`.js-checked-${id}`).style = "opacity: 1"
        const meridian = new Date().toLocaleTimeString().slice(8,11)
        const data  = {
            id,
            status: "completed",
            todo: e.target.innerHTML,
            time: new Date().toLocaleTimeString().slice(0,5) +""+ meridian
        }

        setTimeout(() => {
            completedTask.push(data)
            removeFromPending(id)
            renderPendingPage(pendingTask)
            saveToComp()
            renderCompletedPage(completedTask)
        },700)
    }


})

function renderCompletedPage(arr){
    let completedTaskHTML = ""
    arr.forEach(item => 
        completedTaskHTML += `
            <div class="todo-block completed">
                <div class="extra">
                  <span>completed &checkmark;</span>
                  <div class="time">${item.time}</div>
                </div>
                <div class="completed-block">
                  <img src="icons/done.svg" alt="" />
                  <div class="todo">
                    ${item.todo}
                  </div>
                  <div class="actions">
                    <button><img src="icons/delete.svg" alt="" class="delete" data-id="${item.id}" /></button>
                  </div>
                </div>
            </div>
        `
    )

    const isEmpty = completedTask.length === 0 

    document.querySelector(".js-completed-list").innerHTML = isEmpty ?
        `<div class="no_task"><img src="icons/no_ctask.svg" alt=""/>
        <p>No completed task...</p></div>` : completedTaskHTML
}

renderCompletedPage(completedTask)


document.querySelector(".js-completed-list").addEventListener("click", e => {
    if(e.target.className == "delete"){
        const {id} = e.target.dataset
        removeFromComp(id)
        renderCompletedPage(completedTask)
    }
})


document.querySelectorAll(".srhImg").forEach(btn => {
    btn.addEventListener("click", e => {
        const container = e.target.parentNode.parentNode.parentNode
        container.classList.add("active")
    })
})


document.querySelectorAll("h3 input").forEach(input => {
    input.addEventListener("keydown", e => {
        if(e.key === "Enter"){
            const container = e.target.parentNode.parentNode
            const input_field = e.target.value

            if(e.target.className === "s-p"){
               const data = findPending(input_field)
                if(data.found){
                    renderPendingPage(data.found)
                }
                else{
                    removeFromPending(data.temp)
                }
            }

            if(e.target.className === "s-c"){
                const data = findCompleted(input_field)
                if(data.found){
                    renderCompletedPage(data.found)
                }
                else{
                    removeFromComp(data.temp)
                }
            }
    
            container.classList.remove("active")
        }
    })
})

document.querySelectorAll("h3 input").forEach(input => {
    input.addEventListener("input", e => {
        if(e.target.value == ""){
            const data = findPending(e.target.value)
            if(data.found){
                renderPendingPage(data.found)
            }
            else{
                removeFromPending(data.temp)
            }
        }
    })
    }
)

