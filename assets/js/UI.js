import validation from './FormValidation.js'
import populateUi from './PopulateUi.js'
import {
    localStorageAdd
} from './StoreLocalStorage.js'

let taskArr = [];
let itemId = 0;
let newTaskCount = 0
let progressTaskCount = 0
let completeTaskCounts = 0
let arrLength = taskArr.length

class UI {
    allSelectors() {
        const taskTitleInput = document.querySelector('#taskTitle');
        const taskSubTitleInput = document.querySelector('#subtitle');
        const taskAssignToInput = document.querySelector('#assignTo');
        const taskStartDateInput = document.querySelector('#taskStartDate');
        const taskEndDateInput = document.querySelector('#taskEndDate');
        const taskPriorityInput = document.querySelectorAll('#priorityGroup input');
        const taskStatusInput = document.querySelectorAll('#statusGroup input');
        const taskRangeInput = document.querySelector('#taskRange');
        const taskRangeShowInput = document.querySelector('#rangeShow')
        const taskForm = document.querySelector('form');
        const taskTotalSumm = document.querySelector('#totalTaskSum');
        const taskNewSumm = document.querySelector('#taskNewSum');
        const taskProgressSumm = document.querySelector('#taskProgressSum');
        const taskCompleteSumm = document.querySelector('#taskComSum');

        return {
            taskTitleInput,
            taskSubTitleInput,
            taskAssignToInput,
            taskStartDateInput,
            taskEndDateInput,
            taskPriorityInput,
            taskStatusInput,
            taskRangeInput,
            taskRangeShowInput,
            taskForm,
            taskTotalSumm,
            taskNewSumm,
            taskProgressSumm,
            taskCompleteSumm
        }
    }

    storeValueFromForm() {
        const {
            taskTitleInput,
            taskSubTitleInput,
            taskAssignToInput,
            taskStartDateInput,
            taskEndDateInput,
            taskPriorityInput,
            taskStatusInput,
            taskRangeInput,
            taskRangeShowInput,
            taskForm
        } = this.allSelectors()

        let taskTitleValue = taskTitleInput.value;
        let taskSubTitleValue = taskSubTitleInput.value;
        let taskAssignToValue = taskAssignToInput.value;
        let taskStartDateValue = taskStartDateInput.value;
        let taskEndDateValue = taskEndDateInput.value;
        let taskPriorityValue;
        for (let i = 0; i < taskPriorityInput.length; i++) {
            if (taskPriorityInput[i].checked) {
                taskPriorityValue = taskPriorityInput[i].value;
            }
        }
        let taskStatusValue;
        for (let i = 0; i < taskStatusInput.length; i++) {
            if (taskStatusInput[i].checked) {
                taskStatusValue = taskStatusInput[i].value
            }
        }


        let taskRangeValue = taskRangeInput.value;
        const taskRangeShowValue = taskRangeShowInput.value;

        return {
            taskTitleValue,
            taskSubTitleValue,
            taskAssignToValue,
            taskStartDateValue,
            taskEndDateValue,
            taskPriorityValue,
            taskStatusValue,
            taskRangeValue,
            taskRangeShowValue
        }
    }

    


    initialize() {
            
            this.selectSingleRadioBtn()
            this.taskRangeShow()
            
        const {
            taskRangeInput,
            taskPriorityInput,
            taskStatusInput,
            taskForm
        } = this.allSelectors();

        

        taskForm.addEventListener('submit', e => {

            console.log(taskArr);
            e.preventDefault()
            const {
                taskTitleValue,
                taskSubTitleValue,
                taskAssignToValue,
                taskStartDateValue,
                taskEndDateValue,
                taskPriorityValue,
                taskStatusValue,
                taskRangeValue,
                taskRangeShowValue
            } = this.storeValueFromForm()

            let id ;

            if(taskArr.length === 0){
                id = taskArr.length + 1
            }else{
                id = Number(taskArr[taskArr.length-1].id) + 1
            }

            

            const createTask = {
                id: id,
                TaskTitle: taskTitleValue,
                TaskSubtitle: taskSubTitleValue,
                TaskAssignedTo: taskAssignToValue,
                TaskStartDate: taskStartDateValue,
                TaskEndDate: taskEndDateValue,
                TaskPriority: taskPriorityValue,
                TaskStatus: taskStatusValue,
                TaskRange: taskRangeValue
            }

            const isError = validation.formValidation(id, taskTitleValue, taskSubTitleValue, taskAssignToValue, taskStartDateValue, taskEndDateValue, taskPriorityValue, taskStatusValue, taskRangeValue);
            if (isError) {
                alert('Some field is empty')
            } else {

                taskArr.push(createTask)
                // populateUi.populationofUi(id, taskTitleValue, taskSubTitleValue, taskAssignToValue, taskStartDateValue, taskEndDateValue, taskPriorityValue, taskStatusValue, taskRangeValue)
                // console.log(id, taskTitleValue, taskSubTitleValue, taskAssignToValue, taskStartDateValue, taskEndDateValue, taskPriorityValue, taskStatusValue, taskRangeValue);
                populateUi.populationofUi(taskArr)
                localStorageAdd.addItemToLocalStorage(createTask)
            }
            this.deleteBtnFunc()
            this.editBtnFunc()
            this.taskFormReset()
            this.completeBtnFunc()
            
        })

        document.addEventListener('DOMContentLoaded', () => {
            if (localStorage.getItem('Task')) {
                taskArr = JSON.parse(localStorage.getItem('Task'))
                populateUi.populationofUi(taskArr)
                
            } 
            this.deleteBtnFunc()
            this.editBtnFunc()
            this.completeBtnFunc()
            this.countTaskSum()
            /// ==========

            document.querySelector('#updBtn').addEventListener('click', () => {    
                this.updateBtnFunc()
            })   
        }); 
    }

    countTaskSum(){
        const {
            taskTotalSumm,
            taskNewSumm,
            taskProgressSumm,
            taskCompleteSumm
        } = this.allSelectors()

        const taskPrioCell = document.querySelectorAll('#taskStatElm')
        // console.log(taskPrioCell);
        for(let i = 0; i < taskPrioCell.length; i++){
            // console.log(taskPrioCell[i]);
            if(taskPrioCell[i].textContent.includes('complete')){
                completeTaskCounts++
                
            }
            if(taskPrioCell[i].textContent.includes('progress')){
                progressTaskCount++
            }
            if(taskPrioCell[i].textContent.includes('new')){
                newTaskCount++
            }
            taskCompleteSumm.textContent = completeTaskCounts 
            taskProgressSumm.textContent = progressTaskCount
            taskNewSumm.textContent = newTaskCount
            taskTotalSumm.textContent = taskArr.length
        }  
    }

    updateBtnFunc(){

        const {
            taskTitleValue,
            taskSubTitleValue,
            taskAssignToValue,
            taskStartDateValue,
            taskEndDateValue,
            taskPriorityValue,
            taskStatusValue,
            taskRangeValue
        } = this.storeValueFromForm();

        const isError = validation.formValidation(taskTitleValue)
        if (isError) {
            alert('Some fields are empty')
        } else {
            // console.log(itemId);

            taskArr.map( elem => {
                if(elem.id === Number(itemId)){
                    // console.log(elem);
                //    this.taskUpdateInUi(elem)
                
                    elem.id = elem.id
                    elem.TaskTitle = taskTitleValue
                    elem.TaskSubtitle = taskSubTitleValue
                    elem.TaskStatus = taskStatusValue,
                    elem.TaskStartDate = taskStartDateValue
                    elem.TaskRange = taskRangeValue
                    elem.TaskPriority = taskPriorityValue
                    elem.TaskEndDate = taskEndDateValue
                    elem.TaskAssignedTo = taskAssignToValue
                
                }else{
                    return elem
                }
            })
            
            console.log(taskArr);
            populateUi.populationofUi(taskArr)
            this.updateLocalStorage()
            this.taskFormReset()
        }                                
    }

    editBtnFunc(){

        const tbodyTr = document.querySelectorAll('tbody tr')

        for(let i = 0; i < tbodyTr.length; i++){
            tbodyTr[i].addEventListener('click', e => {
                if (e.target.classList.contains('fa-pencil-square-o')) {
                    const id = this.getTaskIdFromTable(e.target)
                    itemId = id
                    document.querySelector('#updBtn').style.display = 'inline-block'
                    const selectedTask = taskArr.find(elem => {
                        // console.log(elem);
                        if (elem.id === Number(id)) {
                            // console.log(elem);
                            this.fillEditField(elem)
                            
                        }
                    })

                }
            })
        }
        
    }

    completeBtnFunc(){

        console.log('yes');
        const tbodyTr = document.querySelectorAll('tbody tr')
        for(let i = 0; i< tbodyTr.length; i++){
            tbodyTr[i].addEventListener('click', e => {
                if(e.target.classList.contains('fa-check')){
                    const id = this.getTaskIdFromTable(e.target)
                    itemId = id
                    taskArr.find( elem => {
                        if(elem.id === Number(itemId)){
                            elem.TaskStatus = "complete"
                        }
                    })
                    // console.log(taskArr);
                    populateUi.populationofUi(taskArr)
                    this.updateLocalStorage()
                }   
            })
        }
    }

    deleteBtnFunc(){
        
        
        const tbodyTr = document.querySelectorAll('tbody tr')
        
        for(let i = 0; i < tbodyTr.length; i++){
            tbodyTr[i].addEventListener('click', e => {
                if (e.target.classList.contains('fa-trash')) {
                    const id = this.getTaskIdFromTable(e.target)
                    this.removeFromUi(id)
                    const filterdArr = this.removeFromArr(id)
                    this.updateLocalStorage()
                }
            })
        }
        console.log(taskArr.length);
    }

    

    removeFromUi(id) {
        document.querySelector(`.taskId-${id}`).remove();
    }

    fillEditField(elem) {
        const {
            taskTitleInput,
            taskSubTitleInput,
            taskAssignToInput,
            taskStartDateInput,
            taskEndDateInput,
            taskPriorityInput,
            taskStatusInput,
            taskRangeInput,
            taskRangeShowInput,
        } = this.allSelectors()

        taskTitleInput.value = elem.TaskTitle
        taskSubTitleInput.value = elem.TaskSubtitle
        taskAssignToInput.value = elem.TaskAssignedTo
        taskStartDateInput.value = elem.TaskStartDate
        taskEndDateInput.value = elem.TaskEndDate
        taskRangeInput.value = elem.TaskRange
        taskRangeShowInput.value = elem.TaskRange

        for (let i = 0; i < taskPriorityInput.length; i++) {
            if (taskPriorityInput[i].value === elem.TaskPriority) {
                // console.log(taskPriorityInput[i]);
                taskPriorityInput[i].setAttribute('checked', '')
            }

            if (taskStatusInput[i].value === elem.TaskStatus) {
                taskStatusInput[i].setAttribute('checked', '')
            }
        }

    }

    removeFromArr(id) {
        let filterdArr = taskArr.filter(elem => elem.id != Number(id))
        taskArr = filterdArr
    }

    updateLocalStorage() {
        if (localStorage.getItem('Task')) {
            localStorage.setItem('Task', JSON.stringify(taskArr))
        }
    }

    taskUpdateInUi(elem){
        const {
            taskTitleValue,
            taskSubTitleValue,
            taskAssignToValue,
            taskStartDateValue,
            taskEndDateValue,
            taskPriorityValue,
            taskStatusValue,
            taskRangeValue
        } = this.storeValueFromForm()
        elem.TaskTitle = taskTitleValue
        elem.TaskSubtitle = taskSubTitleValue
        elem.TaskStatus = taskStatusValue
        elem.TaskStartDate = taskStartDateValue
        elem.TaskEndDate = taskEndDateValue
        elem.TaskAssignedTo = taskAssignToValue
        elem.TaskPriority = taskPriorityValue
        elem.TaskRange = taskRangeValue
        
    }

    getTaskIdFromTable(itemElem) {
        let id;

        if(itemElem.parentNode.parentNode.classList[0].split('').length >= 9){
            
            id = itemElem.parentNode.parentNode.classList[0].split('')[7] + itemElem.parentNode.parentNode.classList[0].split('')[8]

        }else{
            id = itemElem.parentNode.parentNode.classList[0].split('')[7]
        }
        
        return id
    }

    taskRangeShow() {
        const {
            taskRangeInput,
            taskRangeShowInput
        } = this.allSelectors()
        taskRangeInput.addEventListener('change', e => {
            taskRangeShowInput.value = e.target.value
        })
    }

    taskFormReset() {
        let {
            taskTitleInput,
            taskSubTitleInput,
            taskAssignToInput,
            taskStartDateInput,
            taskEndDateInput,
            taskPriorityInput,
            taskStatusInput,
            taskRangeInput,
            taskRangeShowInput,
            taskForm
        } = this.allSelectors()

        taskTitleInput.value = '';
        taskSubTitleInput.value = ''
        taskAssignToInput.value = ''
        taskStartDateInput.value = ''
        taskEndDateInput.value = ''
        // taskPriorityInput.value = ''
        for(let i = 0; i < taskPriorityInput.length; i++){
            taskPriorityInput[i].checked = false
        }
        // taskStatusInput.value = ''
        for(let i = 0; i < taskStatusInput.length; i++){
            taskStatusInput[i].checked = false
        }
        taskRangeInput.value = '10'
        taskRangeShowInput.value = '10'
    }


    selectSingleRadioBtn(){
        const {taskPriorityInput, taskStatusInput} = this.allSelectors()
        const {taskPriorityValue , taskStatusValue} = this.storeValueFromForm

        for(let i = 0; i < taskPriorityInput.length; i++){
            taskPriorityInput[i].addEventListener('click', () => {
                if(taskPriorityInput[i].value === 'low'){
                    // console.log(taskPriorityInput[i].value === 'low');
                    document.querySelector('#low').checked = true
                }else{
                    document.querySelector('#low').checked = false
                }
                if(taskPriorityInput[i].value === 'medium'){
                    // console.log(taskPriorityInput[i].value === 'low');
                    document.querySelector('#medium').checked = true
                }else{
                    document.querySelector('#medium').checked = false
                }
                if(taskPriorityInput[i].value === 'high'){
                    // console.log(taskPriorityInput[i].value === 'low');
                    document.querySelector('#high').checked = true
                }else{
                    document.querySelector('#high').checked = false
                }
            })
        }

        for (let i = 0; i < taskStatusInput.length; i++) {
            
            taskStatusInput[i].addEventListener('click', () => {
                if(taskStatusInput[i].value === 'new'){
                    // console.log(taskPriorityInput[i].value === 'low');
                    document.querySelector('#taskNew').checked = true
                }else{
                    document.querySelector('#taskNew').checked = false
                }
                if(taskStatusInput[i].value === 'progress'){
                    // console.log(taskPriorityInput[i].value === 'low');
                    document.querySelector('#taskProgress').checked = true
                }else{
                    document.querySelector('#taskProgress').checked = false
                }
                if(taskStatusInput[i].value === 'complete'){
                    // console.log(taskPriorityInput[i].value === 'low');
                    document.querySelector('#taskComplete').checked = true
                }else{
                    document.querySelector('#taskComplete').checked = false
                }
            })
            
        }
    }

   

}

const ui = new UI()
export default ui