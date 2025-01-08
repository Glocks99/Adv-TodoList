export let pendingTask = JSON.parse(localStorage.getItem("pending")) || []

export function saveToPending(){
    localStorage.setItem("pending", JSON.stringify(pendingTask))
}

export function addToPending(data){
    const newData = [...pendingTask, data]
    pendingTask = newData
    saveToPending()
}

export function removeFromPending(id){
    const newPending = pendingTask.filter(item => item.id !== Number(id))
    pendingTask = newPending
    saveToPending()
}

export function updateTodoDesc(id,input){
    let matchingItem;
    pendingTask.forEach(item => {
        if(item.id === Number(id)){
            matchingItem = item
        }
    })
    matchingItem.todo = input
    saveToPending()

}

const temp = pendingTask
export function findPending(input_field){
    let found = []
    pendingTask.forEach(item => {
        if(item.todo.toLowerCase().includes(input_field.toLowerCase())){
            found.push(item)
        }
    })
   
    return {found,temp}
}