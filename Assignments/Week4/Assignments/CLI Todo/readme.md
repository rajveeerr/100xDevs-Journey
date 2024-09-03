# CLI-Based-ToDo

**Version**: 0.1.0

## Overview

`CLI-Based-ToDo` is a command-line interface (CLI) tool designed for developers to manage their ToDo tasks without leaving the terminal. With this tool, you can add, list, complete, delete, and update tasks seamlessly, making task management quick and efficient.

## Features

- **Add Tasks**: Quickly add tasks with optional due dates.
- **List Tasks**: View tasks filtered by status—completed, pending, or all tasks.
- **Complete Tasks**: Mark tasks as completed by their ID.
- **Incomplete Tasks**: Revert completed tasks to pending by their ID.
- **Delete Tasks**: Remove tasks by their ID if added by mistake.
- **Update Tasks**: Update the title, due date, or status of existing tasks.
- **Task Details**: View detailed information about specific tasks.

## Installation

1. Clone the repository:
    ```bash
    git clone "https://github.com/rajveeerr/100xDevs-Journey.git"
    ```

2. Navigate to the project directory:
    ```bash
    cd 100xDevs-Journey/Assignments/Week4/Assignments/CLI Todo
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

### Commands

1. **Add a new task**:
    ```bash
    node index.js add "Finish homework" --due 2024-09-15
    ```

2. **List tasks**:
    ```bash
    node index.js list --completed
    ```

3. **Mark a task as completed**:
    ```bash
    node index.js complete 2
    ```

4. **Revert a task to pending**:
    ```bash
    node index.js incomplete 2
    ```

5. **Delete a task**:
    ```bash
    node index.js delete 3
    ```

6. **Update a task**:
    ```bash
    node index.js update 1 --title "Updated Task" --due 2024-09-20
    ```

7. **View task details**:
    ```bash
    node index.js details 1
    ```

### Options

- `--due <due_date>`: Adds or updates a due date for the task.
- `--completed`: Lists only completed tasks.
- `--pending`: Lists only pending tasks.
- `--all`: Lists all tasks.
- `--title <new_description>`: Updates the task's title.
- `--status <completed|pending>`: Updates the task's completion status.


## Screenshots

_Add screenshots here, showing the CLI in action._

## Technologies Used

- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **Commander.js**: Node.js module for building command-line interfaces.
- **Chalk**: Node.js library for styling terminal strings.

## Learnings

- Implementing a robust CLI application using Node.js.
- Handling JSON file operations and error management.
- Enhancing CLI output using Chalk for a better user experience.


## License

This project is licensed under the MIT License.
