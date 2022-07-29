
let localTaskArr = []

class LocalStorageAdditon{
    addItemToLocalStorage(task){
        if(localStorage.getItem('Task')){
            localTaskArr = JSON.parse(localStorage.getItem('Task'))
            localTaskArr.push(task)
            localStorage.setItem('Task', JSON.stringify(localTaskArr))
        }else{
            localTaskArr = []
            localTaskArr.push(task)
            localStorage.setItem('Task', JSON.stringify(localTaskArr))
        }
    }
}

const localStorageAdd = new LocalStorageAdditon()
export {localStorageAdd, localTaskArr}