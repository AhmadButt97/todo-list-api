# Todo List API

A simple in-memory to-do list REST API, built for the DevOps & Cloud Internship take-home challenge.

## Tech stack

- Node.js + Express
- In-memory storage (no database — data resets when the server restarts)
- Docker for containerization
- GitHub Actions for CI (builds the Docker image on every push)

## How to run it

### Option 1: Run locally with Node

```bash
npm install
npm start
```

The server will start on `http://localhost:3000`.

### Option 2: Run with Docker

```bash
docker build -t todo-list-api .
docker run -p 3000:3000 todo-list-api
```

The API will be available at `http://localhost:3000`.

## Endpoints

| Method | Path              | Description                                      |
|--------|-------------------|---------------------------------------------------|
| GET    | `/`               | Health check — confirms the API is running        |
| POST   | `/tasks`          | Create a new task. Body: `{ "title": "string" }`  |
| GET    | `/tasks`          | List all tasks                                    |
| GET    | `/tasks/:id`      | Get a single task by its id                        |
| PATCH  | `/tasks/:id/done` | Mark a task as done (partial update)               |
| PUT    | `/tasks/:id`      | Replace a task's title/done state (full update). Body: `{ "title": "string", "done": boolean }` |
| DELETE | `/tasks/:id`      | Delete a task                                      |

### Example: create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

Response:

```json
{
  "id": "b05e5564-818a-43d0-8db9-6f6dfaedd9d3",
  "title": "Buy milk",
  "done": false,
  "createdAt": "2026-09-14T17:26:50.293Z"
}
```

### Example: mark a task done

```bash
curl -X PATCH http://localhost:3000/tasks/<id>/done
```

