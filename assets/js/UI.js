import validation from './FormValidation.js'
import populateUi from './PopulateUi.js'
import localStorageAdd from './StoreLocalStorage.js'

let taskArr = [];

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
        let taskPriorityValue ;
         for(let i = 0; i < taskPriorityInput.length ; i++){
            if(taskPriorityInput[i].checked){
                taskPriorityValue = taskPriorityInput[i].value;
            }
        }
        let taskStatusValue ;
        for(let i = 0; i < taskStatusInput.length; i++){
            if(taskStatusInput[i].checked){
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

            const id = taskArr.length + 1

            const createTask = {
                id : id,
                TaskTitle : taskTitleValue,
                TaskSubtitle : taskSubTitleValue,
                TaskAssignedTo : taskAssignToValue,
                TaskStartDate : taskStartDateValue,
                TaskEndDate : taskEndDateValue,
                TaskPriority : taskPriorityValue,
                TaskStatus : taskStatusValue,
                TaskRange : taskRangeValue
            }

            const isError = validation.formValidation(taskTitleValue,taskSubTitleValue,taskAssignToValue,taskStartDateValue,taskEndDateValue,taskPriorityValue,taskStatusValue,taskRangeValue);
            if(isError){
                alert('Some field is empty')
            }else{
                
                taskArr.push(createTask)
                populateUi.populationofUi(id,taskTitleValue,taskSubTitleValue,taskAssignToValue,taskStartDateValue,taskEndDateValue,taskPriorityValue,taskStatusValue,taskRangeValue)

                // item send to local Storage
                localStorageAdd.addItemToLocalStorage(createTask)
                // reset value after form submit
                // this.taskFormReset()
            }
        })

    }

    getTaskIdFromTable(itemElem){
        const id = itemElem.parentNode.id
        return id
    }

    taskRangeShow(){
        const {taskRangeInput, taskRangeShowInput} = this.allSelectors()
        taskRangeInput.addEventListener('change', e => {
            taskRangeShowInput.value = e.target.value
        })
    }

    taskFormReset(){
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