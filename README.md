# Task Management API ✅

RESTful Task Management API built with Node.js, Express, MongoDB, JWT authentication, and Joi validation.

Features
- User registration & login (JWT)
- Task CRUD (create, list with pagination & filters, get, update, delete)
- Validation & centralized error handling
- Role support (user/admin), soft-delete, search by title
- Docker + docker-compose

Getting started
1. Copy `.env.example` to `.env` and set values.
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

API endpoints
- POST `/auth/register` - register
- POST `/auth/login` - login
- POST `/tasks` - create task (auth required)
- GET `/tasks` - list tasks (pagination, status filter, q search)
- GET `/tasks/:id` - get single task (owner only)
- PUT `/tasks/:id` - update task (owner only)
- DELETE `/tasks/:id` - delete (soft) task (owner only)

API Docs (Swagger): `GET /docs` after starting the server
Postman collection: `docs/postman_collection.json`

Run tests: `npm test`

See `src` directory for implementation details.
