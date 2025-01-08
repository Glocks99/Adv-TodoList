export let completedTask = JSON.parse(localStorage.getItem("completedTask")) || []

export function saveToComp(){
    completedTask.sort((a,b) => a.id - b.id)
    localStorage.setItem("completedTask", JSON.stringify(completedTask))
}

export function removeFromComp(id){
    const newComp = completedTask.filter(item => item.id !== id)
    completedTask = newComp
    saveToComp()
}

const temp = completedTask
export function findCompleted(input_field){
    let found = []
    completedTask.forEach(item => {
        if(item.todo.toLowerCase().includes(input_field.toLowerCase())){
            found.push(item)
        }
    })
   
    return {found,temp}
}