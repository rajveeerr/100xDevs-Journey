const { Command } = require('commander');
const chalk = require('chalk');
const fileObj = require('fs');
const { title } = require('process');
const program = new Command();

function fileContents(filename) {
    try {
        fileData = fileObj.readFileSync(filename, 'utf-8');
        if (fileData) {
            return JSON.parse(fileData);
        } else {
            return null;
        }
    } catch (err) {
        console.log(chalk.red("There was an internal error reading your ToDos Data. Make sure you haven't deleted/moved CLIToDo.json file"));
        return -1
    }
}

function writefileContents(filename, data) {
    try {
        fileData = fileObj.writeFileSync(filename, JSON.stringify(data), 'utf-8');
    } catch (err) {
        console.log(chalk.red("CLIToDo.json file wasn't found in the directory creating one with empty data."));
        return -1
    }
}

const dataFilename = "CLIToDo.json"

let todoData = [0, {
    user: 1,
    todos: []
}]

let jsonfiledata = fileContents(dataFilename);
let ctr = 0;

if (!jsonfiledata||jsonfiledata === -1) {
    writefileContents(dataFilename, todoData)
    jsonfiledata = fileContents(dataFilename);
    ctr = jsonfiledata[0];
} 
// else if (jsonfiledata === -1) {
//     console.log(chalk.red("You've either removed the 'CLIToDo.json' file from working directory or deleted it. To start using this CLI based ToDo please create a new file in the same directory named 'CLIToDo.json'."));
// } 
else {
    ctr = jsonfiledata[0];
}

program
    .name(chalk.bold.green('CLI-Based-ToDo'))
    .description(chalk.cyan('CLI for Developers to add ToDo without ever leaving Terminal...'))
    .version('0.1.0');

program.command('add')
    .description(chalk.yellow('Add a new task with an optional due date. Example: add Finish homework --due 2024-09-15'))
    .argument('<task_description>', 'Enter your Task Here')
    .option('--due <due_date>', 'add optional due date for ToDo task')
    .action((str, options) => {
        if(str){
            let dueDate;
            if(options.due){
                try {
                    dueDate = new Date(options.due) ? new Date(options.due).toISOString().split('T')[0] : null;
                } 
                catch (err) {
                    dueDate = null;
                    console.log(chalk.yellow("Warning: Due Date is set to null as you've entered it in incorrect format. Try this format yyyy-mm-dd day and month must be of two digit and year must be of 4, like: 2024-08-06"));
                }
            }
            let todoData = fileContents(dataFilename);
            addedTodoData = {
                id: ctr,
                title: str,
                dueDate: dueDate,
                flag: 'all',
                completed: false
            }
            todoData[1].todos.push(addedTodoData);
    
            console.log(chalk.green(`\nAdded todo task with id: ${ctr}`));
            ctr++;
            todoData[0] = ctr;
            writefileContents(dataFilename, todoData);
        }
        else{
            console.log(chalk.red(`\nCouldn't add task with empty title.`));

        }
    });

program.command('list')
    .description(chalk.yellow('Lists tasks. Optional flags can filter tasks by status (all, completed, or pending). Example: list --pending'))
    .option('--completed', 'Filter for completed tasks')
    .option('--pending', 'Filter for pending tasks')
    .option('--all', 'Show all tasks')
    .action((options) => {
        let todoData = fileContents(dataFilename);
        let listofContent = [];

        if (!todoData || (todoData[1].todos.length == 0)) {
            console.log(chalk.yellow("\nNothing to display. You Haven't added any tasks yet!!"));
        } else if (options.completed) {
            listofContent = todoData[1].todos.filter((todo) => todo.completed);
            console.log(chalk.cyan(`\nDisplaying Tasks marked as complete [Status: ${listofContent.length}/${(todoData[1].todos).length} (${((listofContent.length) / (todoData[1].todos).length * 100).toFixed(2)}%) Tasks Completed]`));
            console.log(chalk.cyan("---------------------------------------------------------------"));
        } else if (options.pending) {
            listofContent = todoData[1].todos.filter((todo) => !todo.completed);
            console.log(chalk.cyan("\nDisplaying Pending tasks:"));
            console.log(chalk.cyan("--------------------------"));
        } else {
            listofContent = todoData[1].todos;
            console.log(chalk.cyan("\nDisplaying All tasks:"));
            console.log(chalk.cyan("----------------------"));
        }

        console.log(chalk.bold.green("Status | Index | Task | Id | Due Date"));
        let count = 1;
        listofContent.forEach((element) => {
            console.log(`${element.completed ? chalk.green('✓') : chalk.red('✕')} ${count}. ${chalk.white(element.title)} \t Id[${chalk.yellow(element.id)}] \t ${(element.dueDate) ? chalk.grey(element.dueDate) : chalk.grey("No Due Date Assigned")}`);
            count++;
        });
        console.log('\n');
    });

    program.command('count')
    .description(chalk.yellow('Displays the count of all, completed, and pending tasks. Example: count'))
    .action((str, options) => {
        let todoData = fileContents(dataFilename);
        let todoTasks=todoData[1].todos.length;
        let completedTasks=todoData[1].todos.filter(todo=>todo.completed).length;
        let pendingTasks=todoTasks-completedTasks;
        console.log(chalk.yellow(`Total tasks: ${todoTasks}`));
        console.log(chalk.green(`Completed tasks: ${completedTasks}(${(completedTasks/todoTasks)*100}%)`));
        console.log(chalk.red(`Pending tasks: ${pendingTasks}(${(pendingTasks/todoTasks)*100}%)`));
    });

program.command('complete')
    .description(chalk.yellow('Mark a task as completed by its ID. Example: complete 2'))
    .argument('<task_id>', 'Enter your Task ID to mark it as Completed')
    .action((str, options) => {
        let todoData = fileContents(dataFilename);
        let contentToUpdate = false;
        try {
            contentToUpdate = todoData[1].todos.find((todo) => todo.id === parseInt(str));
        } catch (err) {
            console.log(chalk.red("\nPlease enter a valid numeric id to mark corresponding todo as completed."));
            contentToUpdate = null;
        }
        if (!contentToUpdate) {
            console.log(chalk.yellow(`\nNo ToDo exists with id: ${str}. How can non existing task be completed?? Try entering an existing task next time!!`));
        } else if (contentToUpdate.completed == true) {
            console.log(chalk.yellow(`\nTask already completed with id: ${str} and title: ${contentToUpdate.title}. Why would you want to complete a completed task??`));
        } else {
            todoData[1].todos = todoData[1].todos.filter((todo) => todo.id != parseInt(str));
            contentToUpdate.completed = true;
            todoData[1].todos.push(contentToUpdate);
            console.log(chalk.green(`\nDone Updating ToDo WITH id: ${str} and title: ${contentToUpdate.title}. Congratulations!!!`));
            writefileContents(dataFilename, todoData)
        }
    });

program.command('incomplete')
    .description(chalk.yellow('If you have marked a task complete by mistake use this command to mark it incompleted by using ID of the task. Example: incomplete 2'))
    .argument('<task_id>', 'Enter your Task ID to mark it as incompleted')
    .action((str, options) => {
        let todoData = fileContents(dataFilename);
        let contentToUpdate = false;
        try {
            contentToUpdate = todoData[1].todos.find((todo) => todo.id === parseInt(str));
        } catch (err) {
            console.log(chalk.red("\nPlease enter a valid numeric id to mark corresponding completed todo as incompleted."));
            contentToUpdate = null;
        }
        if (!contentToUpdate) {
            console.log(chalk.yellow(`\nNo ToDo exists with id: ${str}. Try entering id of an existing task next time!!`));
        } else if (contentToUpdate.completed == false) {
            console.log(chalk.yellow(`\nTask of id: ${str} and title: ${contentToUpdate.title} is already incomplete. Mark it complete first to mark it incomplete`));
        } else {
            todoData[1].todos = todoData[1].todos.filter((todo) => todo.id != parseInt(str));
            contentToUpdate.completed = false;
            todoData[1].todos.push(contentToUpdate);
            console.log(chalk.green(`\nDone marking ToDo WITH id: ${str} and title: ${contentToUpdate.title} as incomplete.`));
            writefileContents(dataFilename, todoData)
        }
    });

program.command('delete')
    .description(chalk.yellow('Added task by mistake?? No Problem, delete command deletes a task by its ID. Example: delete 3'))
    .argument('<task_id>', 'Enter your Task ID to Delete the task')
    .action((str, options) => {
        let todoData = fileContents(dataFilename);
        let contentToDelete = false;
        try {
            contentToDelete = todoData[1].todos.find((todo) => todo.id === parseInt(str));
        } catch (err) {
            console.log(chalk.red("\nPlease enter a valid numeric id to delete corresponding todo."));
            contentToDelete = null;
        }
        if (!contentToDelete) {
            console.log(chalk.yellow(`\nNo ToDo exists with id: ${str}. How can non existing task be deleted?? Try entering an existing task next time!!`));
        } else {
            todoData[1].todos = todoData[1].todos.filter((todo) => todo.id != parseInt(str));
            console.log(chalk.green(`\nDone Deleting Task with id: ${str} and title: ${contentToDelete.title}. Mistakes Happen!!!`));
            writefileContents(dataFilename, todoData)
        }
    });

program.command('details')
    .description(chalk.yellow('Shows detailed information about a specific task. Example: details 1'))
    .argument('<task_id>', 'Enter your Task to check the details')
    .action((str, options) => {
        let todoData = fileContents(dataFilename);
        let contentToDisplay = false;
        try {
            contentToDisplay = todoData[1].todos.find((todo) => todo.id === parseInt(str));
        } catch (err) {
            console.log(chalk.red("\nPlease enter a valid numeric id to show details of corresponding todo."));
            contentToDisplay = null;
        }
        if (!contentToDisplay) {
            console.log(chalk.yellow(`\nNo ToDo exists with id: ${str}. How can non existing task be displayed?? Try entering an existing task next time!!`));
        } else {
            console.log(chalk.cyan("\nStatus | Id | Task | Due Date"));
            console.log(`${contentToDisplay.completed ? chalk.green('✓') : chalk.red('✕')} Id ${chalk.yellow(contentToDisplay.id)}. ${chalk.white(contentToDisplay.title)} \t ${(contentToDisplay.dueDate) ? chalk.grey(contentToDisplay.dueDate) : chalk.grey("No Due Date Assigned")}`);
        }
    });

program.command('update')
    .description(chalk.yellow('Update title or due date of existing todo. Example: update --title="New Title" --due="updated date"'))
    .argument('<task_id>', 'Enter your Task ID to update the todo')
    .option('--title <new_description>', 'Enter the title you want to update with')
    .option('--due <new_due_date>', 'Enter the updated due date for task with corresponding id')
    .option('--status <completed|pending>', 'Enter the status of task with corresponding id to update it')
    .action((str, options) => {
        let todoData = fileContents(dataFilename);
        let contentToUpdate = false;
        try {
            contentToUpdate = todoData[1].todos.find((todo) => todo.id === parseInt(str));
        } catch (err) {
            console.log(chalk.red("\nPlease enter a valid numeric id to update corresponding task."));
            contentToUpdate = null;
        }
        if (!contentToUpdate) {
            console.log(chalk.yellow(`\nNo ToDo exists with id: ${str}. How can non existing task be completed?? Try entering an existing task next time!!`));
        } else {
            if (options.title) {
                todoData[1].todos = todoData[1].todos.filter((todo) => todo.id != parseInt(str));
                contentToUpdate.title = options.title;
                todoData[1].todos.push(contentToUpdate);
                console.log(chalk.green(`\nDone Updating ToDo task WITH id: ${str}`));
                writefileContents(dataFilename, todoData);
            } else if (options.due) {
                todoData[1].todos = todoData[1].todos.filter((todo) => todo.id != parseInt(str));
                try {
                    contentToUpdate.dueDate = new Date(options.due) ? new Date(options.due).toISOString().split('T')[0] : null;
                } catch (err) {
                    contentToUpdate.dueDate = null;
                }
                if (contentToUpdate.dueDate) {
                    todoData[1].todos.push(contentToUpdate);
                    console.log(chalk.green(`\nDone updating Due Date for task with id: ${str}`));
                    writefileContents(dataFilename, todoData);
                } else {
                    console.log(chalk.yellow("\nCouldn't Update Due Date as the date format you've entered is incorrect. Try this format yyyy-mm-dd day and month must be of two digit and year must be of 4, like: 2024-08-06"));
                }
            } else if (options.status) {
                todoData[1].todos = todoData[1].todos.filter((todo) => todo.id != parseInt(str));
                if (options.status === contentToUpdate.complete) {
                    console.log(chalk.yellow(`\nCouldn't update status of task as you're trying to update existing status with same status for task with id: ${str}`));
                } else {
                    contentToUpdate.complete = options.due;
                    todoData[1].todos.push(contentToUpdate);
                    console.log(chalk.green(`\nDone updating status for task with id: ${str}`));
                    writefileContents(dataFilename, todoData);
                }
            } else {
                console.log(chalk.red("\nCouldn't Update Task"));
            }
        }
    });

program.parse();