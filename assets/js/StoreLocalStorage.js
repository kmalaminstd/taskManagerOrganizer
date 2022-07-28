
let localTask = []

class LocalStorageAdditon{
    addItemToLocalStorage(task){
        if(localStorage.getItem('Task')){
            localTask = JSON.parse(localStorage.getItem('Task'))
            localTask.push(task)
            localStorage.setItem('Task', JSON.stringify(localTask))
        }else{
            localTask = []
            localTask.push(task)
            localStorage.setItem('Task', JSON.stringify(localTask))
        }
    }
}

const localStorageAdd = new LocalStorageAdditon()
export default localStorageAdd