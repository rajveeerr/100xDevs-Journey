# ToDo HTTP Server

This project is a simple ToDo list application built with Node.js and Express. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on their tasks, with data stored in a JSON file for persistence.

## Features

- **Create a ToDo**: Users can add a new task with a title and description.
- **Read ToDos**: Retrieve all tasks or a specific task by ID.
- **Update a ToDo**: Modify an existing task by its ID.
- **Delete a ToDo**: Remove a task by its ID.
- **Persistent Storage**: Tasks are stored in a JSON file, ensuring that data remains intact even after the server restarts.


## API Endpoints

1. **GET /todos**
   - Retrieves a list of all ToDo items.
   - **Response:** `200 OK` with an array of ToDo items in JSON format.
   - **Example:** `GET http://localhost:4000/todos`

2. **GET /todos/:id**
   - Retrieves a specific ToDo item by ID.
   - **Response:** `200 OK` with the ToDo item in JSON format if found, or `404 Not Found` if not found.
   - **Example:** `GET http://localhost:4000/todos/123`

3. **POST /todos**
   - Creates a new ToDo item.
   - **Request Body:** JSON object representing the ToDo item.
   - **Response:** `201 Created` with the ID of the created ToDo item in JSON format.
   - **Example:** 
     ```
     POST http://localhost:4000/todos
     Request Body: { "title": "Buy groceries", "completed": false, "description": "I should buy groceries" }
     ```

4. **PUT /todos/:id**
   - Updates an existing ToDo item by ID.
   - **Request Body:** JSON object representing the updated ToDo item.
   - **Response:** `200 OK` if the ToDo item was found and updated, or `404 Not Found` if not found.
   - **Example:** 
     ```
     PUT http://localhost:4000/todos/123
     Request Body: { "title": "Buy groceries", "completed": true }
     ```

5. **DELETE /todos/:id**
   - Deletes a ToDo item by ID.
   - **Response:** `200 OK` if the ToDo item was found and deleted, or `404 Not Found` if not found.
   - **Example:** `DELETE http://localhost:4000/todos/123`

6. **Wildcard Route**
   - For any other route not defined in the server, a `404 Not Found` response is returned.

## What I've Learned

While building this project, I've gained experience in the following:

- **Promises in Node.js**: I used promises to handle asynchronous file operations, such as reading from and writing to the JSON file.
- **File Handling**: I learned how to persist data in a JSON file, ensuring that data remains available even after a server restart.
- **UUID**: I used the `uuid` library to generate unique IDs for each ToDo item.
- **Object.assign()**: I utilized `Object.assign()` to merge objects, particularly when updating existing ToDo items.
- **JSON Manipulation**: I worked with `JSON.parse()` and `JSON.stringify()` to handle the conversion between JSON and JavaScript objects.
- **Error Handling**: I handled different types of errors, such as handling non-existent routes with a wildcard route that returns a `404 Not Found` response.
- **Troubleshooting**: I resolved several issues, such as port conflicts and handling asynchronous operations that prevented Jest from exiting during testing.


## How to Run

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node todoServer.js
   ```
4. The server will run on `http://localhost:4000`.

### Troubleshooting

- **Port Conflicts**: If you encounter an error stating that port 3000 is in use, change the port in the `app.listen` method to another available port, like `4000`.