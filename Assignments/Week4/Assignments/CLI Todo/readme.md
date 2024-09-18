# CLI-Based ToDo Application

This is a simple and user-friendly CLI-based ToDo application for developers, allowing you to manage your tasks directly from the terminal without ever leaving it. Built using Node.js, this tool helps you add, list, update, and delete tasks with ease.

## Demo Video(Posted on X)

https://x.com/rajveeerrsingh/status/1831341445015585029?s=46

## Features
- **Add a Task:** Add a new task with an optional due date.
- **List Tasks:** List all tasks, filter by completed, pending, or all tasks.
- **Mark Complete:** Mark a specific task as completed using its ID.
- **Mark Incomplete:** Revert a task marked as complete to pending status.
- **Delete Task:** Delete a task using its ID.
- **View Details:** View detailed information about a specific task.
- **Update Task:** Update the title, due date, or status of an existing task.
- **Count Tasks:** Display the count of all, completed, and pending tasks.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rajveeerr/100xDevs-Journey.git
   ```

2. **Navigate to the CLI ToDo Directory:**
   ```bash
   cd 100xDevs-Journey/Assignments/Week4/Assignments/CLI-Todo
   ```

3. **Install Dependencies:**
   Make sure you have Node.js installed on your system. Install the necessary dependencies by running:
   ```bash
   npm install
   ```

## Usage

You can use the following commands to interact with the ToDo application:

### Add a New Task
```bash
todo add "Finish homework" --due 2024-09-15
```

### List Tasks
- List all tasks:
  ```bash
  todo list --all
  ```
- List only completed tasks:
  ```bash
  todo list --completed
  ```
- List only pending tasks:
  ```bash
  todo list --pending
  ```

### Mark a Task as Completed
```bash
todo complete <task_id>
```

### Mark a Task as Incomplete
```bash
todo incomplete <task_id>
```

### Delete a Task
```bash
todo delete <task_id>
```

### View Task Details
```bash
todo details <task_id>
```

### Update a Task
- Update task title:
  ```bash
  todo update <task_id> --title "New Title"
  ```
- Update task due date:
  ```bash
  todo update <task_id> --due "2024-09-20"
  ```
- Update task status:
  ```bash
  todo update <task_id> --status completed|pending
  ```

### Count Tasks
```bash
todo count
```

### Setting Up an Alias

To reduce the amount of code you type, you can set up an alias for the command. Add the following line to your `.bashrc`, `.zshrc`, or equivalent shell configuration file:

```bash
alias todo="node CLIBasedTodo.js"
```


## Contribution

Feel free to fork this repository, submit issues, or create pull requests to improve the application.


Happy coding!
