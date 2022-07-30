import validation from './FormValidation.js'
import populateUi from './PopulateUi.js'
import {
    localStorageAdd
} from './StoreLocalStorage.js'

let taskArr = [];
let itemId = 0;

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
            taskForm
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
        const {
            taskRangeInput,
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
                populateUi.populationofUi(id, taskTitleValue, taskSubTitleValue, taskAssignToValue, taskStartDateValue, taskEndDateValue, taskPriorityValue, taskStatusValue, taskRangeValue)
                console.log(id, taskTitleValue, taskSubTitleValue, taskAssignToValue, taskStartDateValue, taskEndDateValue, taskPriorityValue, taskStatusValue, taskRangeValue);
                localStorageAdd.addItemToLocalStorage(createTask)
            }
        })

        document.addEventListener('DOMContentLoaded', () => {
            if (localStorage.getItem('Task')) {
                taskArr = JSON.parse(localStorage.getItem('Task'))
                    // console.log(elem);
                    taskArr.map( elem => {
                        // console.log(taskArr);
                        populateUi.populationofUi(elem.id, elem.TaskTitle, elem.TaskSubtitle, elem.TaskAssignedTo, elem.TaskStartDate, elem.TaskEndDate, elem.TaskPriority, elem.TaskStatus, elem.TaskRange)
                    })
                
                
            }

            const tbodyTr = document.querySelectorAll('tbody tr')

            for (let i = 0; i < tbodyTr.length; i++) {
                tbodyTr[i].addEventListener('click', e => {
                    if (e.target.classList.contains('fa-trash')) {
                        const id = this.getTaskIdFromTable(e.target)
                        this.removeFromUi(id)
                        const filterdArr = this.removeFromArr(id)
                        this.updateLocalStorage()
                    }
                })

                tbodyTr[i].addEventListener('click', e => {
                    if (e.target.classList.contains('fa-pencil-square-o')) {
                        const id = this.getTaskIdFromTable(e.target)
                        itemId = id
                        document.querySelector('#updBtn').style.display = 'inline-block'
                        const selectedTask = taskArr.find(elem => {
                            // console.log(elem);
                            if (elem.id === Number(id)) {
                                console.log(elem);
                                this.fillEditField(elem)
                                
                            }
                        })

                    }
                })

                tbodyTr[i].addEventListener('click', e => {
                    if(e.target.classList.contains('fa-check')){
                        const id = this.getTaskIdFromTable(e.target)
                        itemId = id
                        let taskArrChange = taskArr.find( elem => {
                            if(elem.id === Number(id)){
                                this.taskStatusUpdate(elem) 
                            }
                        })
                        
                    }
                })
            }

            
        })

        document.querySelector('#updBtn').addEventListener('click', e => {
                
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
                       this.taskUpdateInUi(elem)
                    }
                })
                // console.log(taskArr);
              
                this.updateLocalStorage()
                window.location.reload()
                // console.log(taskArr);
                // item send to local Storage
                // localStorageAdd.addItemToLocalStorage(taskArr)
                // reset value after form submit
                this.taskFormReset()
            }

        })

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

    taskStatusUpdate(elem){
        elem.TaskStatus = "complete"
        this.updateLocalStorage()
        window.location.reload()
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
        taskPriorityInput.value = ''
        taskStatusInput.value = ''
        taskRangeInput.value = ''
        taskRangeShowInput.value = '10'
    }


}

const ui = new UI()
export default ui