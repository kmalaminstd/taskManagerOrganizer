class Uipopulation {
    populationofUi(id, taskTitleValue, taskSubTitleValue, taskAssignToValue, taskStartDateValue, taskEndDateValue, taskPriorityValue, taskStatusValue, taskRangeValue) {
        let taskElm = `
            <tr>
                <td id="taskIdElm">${id}</td>
                <td id="tasTitleElm">${taskTitleValue}</td>
                <td id="taskPrioElm">${taskPriorityValue}</td>
                <td id="taskStatElm">${taskStatusValue}</td>
                <td id="taskEndDateElm">${taskEndDateValue}</td>
                <td id="taskAssignedElm">${taskAssignToValue}</td>
                <td id="taskRangeElm">${taskRangeValue}%</td>
                <td><i class="fa fa-pencil-square-o" aria-hidden="true" id="taskEdit tBtn"></i>
                <i class="fa fa-check" aria-hidden="true" id="taskcompleteChange tBtn"></i>
                <i class="fa fa-trash" aria-hidden="true" id="taskDelete tBtn"></i></td>
            </tr>
        `
        const tbody =document.querySelector('tbody')

        tbody.insertAdjacentHTML('beforeend', taskElm)
    }
}

const populateUi = new Uipopulation()

export default populateUi