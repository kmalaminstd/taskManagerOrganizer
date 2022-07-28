import ui from './UI.js'

class Validation{
    formValidation(taskTitleValue,taskSubTitleValue,taskAssignToValue,taskStartDateValue,taskEndDateValue,taskPriorityValue,taskStatusValue,taskRangeValue){
        // const {taskTitleValue} = ui.storeValueFromForm();

        let isError = false;

        if(!taskTitleValue){
            isError = true
        }else{
            isError = false
        }

        return isError
    }
}

const validation = new Validation()
export default validation