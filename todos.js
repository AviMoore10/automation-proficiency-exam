const SelenuimInfra = require('./seleniumInfra')

const selInfra = new SelenuimInfra()

class TodosPage {
    constructor() {
        selInfra.getURL("https://elevation-local-todo.herokuapp.com/")
    }

    async insertAndDelete(todoText) {
        // type the text and click the add button.
        await selInfra.write(todoText, "id", "todo-input") // type the variable text.
        await selInfra.clickElement("id", "addToDo") // Click on the add button.
        // validate new to do task was added or not, and its the same to the task that was typed or not by comparing the text.
        const isToDoExists = await selInfra.isElementExists("className", "todo") // Check a new to do task exists.
        if (isToDoExists) { // the parent if checks if the the new task exists and prints accordingly.
            console.log("found a new div")
            const todosTextCodeLine = await selInfra.findElementBy("className", "text") // Get the new to do element to get its text in the next line.
            const toDosGetText = await selInfra.getTextFromElement(null, null, todosTextCodeLine)
            if (toDosGetText === todoText) { // the child if Validate the new to do element text equal to the variable to do text.
                console.log("New div has the same text")
            }
            else {
                console.log("Error: New div does not has the same text")
            }
        }
        else { 
            console.log("Error: Can’t find a new div")
        }
        // delete the to do that was added by clicking the delete red butoon and validate it was deleted successfully or not.
        await selInfra.clickElement("className", "fa-trash") 
        if (isToDoExists){
            console.log("The div was deleted")
        } 
        else {
            console.log("The div was not deleted")
        }
    }

    async insertAndComplete(todoText) {
        // type the text and click the add button.
        await selInfra.write(todoText, "id", "todo-input") // type the variable text.
        await selInfra.clickElement("id", "addToDo") // Click on the add button.
        // validate that a new to do task was added and print message accordingly
        const isToDoExists = await selInfra.isElementExists("className", "todo") // Chck if the new to do added by the div element.
        if (isToDoExists) { // Prints if the new to do was added.
            console.log("found a new div")
        }
        else {
            console.log("Error: Can’t find a new div")
        }
        // Click on the 'check' green button and validate it was checked and print message accordingly.
        await selInfra.clickElement("className", "fa-check-circle") // Click on the 'check' green button
        const toDoChecked = await selInfra.isElementExists("className", "complete") //Validate it was checked and print message.
        if (toDoChecked) {
            console.log("The new div was checked")
        }
        else {
            console.log("Error: the new div was NOT checked")
        }
    }

    async insertTwoDeleteFirst(todoText1, todoText2) {
        await selInfra.clickElement("className", "fa-trash") // First, delete the to do task remaining.
         // Type the first variable text and click the add button.
        await selInfra.write(todoText1, "id", "todo-input") // type the variable text.
        await selInfra.clickElement("id", "addToDo") // Click on the add button.
        // Validate that the first to do task was added and print message accordingly.
        let firstToDo = await selInfra.isElementExists("xpath", '//*[@id="todos"]/div[1]')
        if (firstToDo) {
            console.log("found a new div")
        }
        else {
            console.log("Error: Can’t find a new div")
        }
         // Type the second variable text and click the add button.
        await selInfra.write(todoText2, "id", "todo-input")
        await selInfra.clickElement("id", "addToDo")
        // Validate that the second to do task was added and print message accordingly.
        const secondToDo = selInfra.isElementExists("xpath", '//*[@id="todos"]/div[2]')
        if (secondToDo) {
            console.log("found a new div")
        }
        else {
            console.log("Error: Can’t find a new div")
        }
        // click on the delet red button of the first to do task and validate that the first to do deleted.
        await selInfra.clickElement("xpath", '//*[@id="todos"]/div[1]/span[2]/i') // Click on the delet red button of the first to do task
        firstToDo = await selInfra.isElementExists("xpath", '//*[@id="todos"]/div[1]')
        if (firstToDo) {
            console.log("the first div was deleted")
        }
        else {
            console.log("Error: the first div was NOT deleted")
        }
        selInfra.close()
    }
}

module.exports = TodosPage