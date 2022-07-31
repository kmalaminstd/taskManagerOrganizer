class Uipopulation {
    populationofUi(taskArr) {
        const tbody =document.querySelector('tbody')
        tbody.innerHTML = ''
        console.log(taskArr);
        
        taskArr.forEach(elem => {
        let taskElm = `
            <tr class="taskId-${elem.id}">
                <td id="taskIdElm">${elem.id}</td>
                <td id="tasTitleElm">${elem.TaskTitle}</td>
                <td id="taskPrioElm">${elem.TaskPriority}</td>
                <td id="taskStatElm">${elem.TaskStatus}</td>
                <td id="taskEndDateElm">${elem.TaskEndDate}</td>
                <td id="taskAssignedElm">${elem.TaskAssignedTo}</td>
                <td id="taskRangeElm">${elem.TaskRange}%</td>
                <td><i class="fa fa-pencil-square-o" aria-hidden="true" class="taskEdit tBtn"></i>
                <i class="fa fa-check" aria-hidden="true" class="taskcompleteChange tBtn" id="compChange"></i>
                <i class="fa fa-trash" aria-hidden="true" class="taskDelete tBtn"></i></td>
            </tr>
        `
        

        tbody.insertAdjacentHTML('beforeend', taskElm)
        })

        // let taskElm = `
        //     <tr class="taskId-${id}">
        //         <td id="taskIdElm">${id}</td>
        //         <td id="tasTitleElm">${taskTitleValue}</td>
        //         <td id="taskPrioElm">${taskPriorityValue}</td>
        //         <td id="taskStatElm">${taskStatusValue}</td>
        //         <td id="taskEndDateElm">${taskEndDateValue}</td>
        //         <td id="taskAssignedElm">${taskAssignToValue}</td>
        //         <td id="taskRangeElm">${taskRangeValue}%</td>
        //         <td><i class="fa fa-pencil-square-o" aria-hidden="true" class="taskEdit tBtn"></i>
        //         <i class="fa fa-check" aria-hidden="true" class="taskcompleteChange tBtn" id="compChange"></i>
        //         <i class="fa fa-trash" aria-hidden="true" class="taskDelete tBtn"></i></td>
        //     </tr>
        // `
        // const tbody =document.querySelector('tbody')

        // tbody.insertAdjacentHTML('beforeend', taskElm)
    }
}

const populateUi = new Uipopulation()

export default populateUi