import ui from './UI.js'

class Validation{
    formValidation(taskTitleValue,taskSubTitleValue,taskAssignToValue,taskStartDateValue,taskEndDateValue,taskPriorityValue,taskStatusValue,taskRangeValue){
        // const {taskTitleValue} = ui.storeValueFromForm();
        // console.log(taskTitleValue,taskSubTitleValue,taskAssignToValue,taskStartDateValue,taskEndDateValue,taskPriorityValue,taskStatusValue,taskRangeValue);
        let isError = false;

        if(taskTitleValue === ''&& taskSubTitleValue === ''  && taskAssignToValue === ''  && !taskStartDateValue && !taskEndDateValue && !taskPriorityValue && !taskStatusValue){
            isError = true
        }else{
            isError = false
        }

        return isError
    }
}

const validation = new Validation()
export default validation