
const ToDoPage = require('./todos')

const toDoPage = new ToDoPage()

// The function implements the method in the todosPage class in the todos file to test the to do web page.
async function toDoTest () {
    await toDoPage.insertAndDelete("succeed in the exam")
    await toDoPage.insertAndComplete("Call My parents")
    await toDoPage.insertTwoDeleteFirst("Plan my future", "Act according the plan")
}

toDoTest()