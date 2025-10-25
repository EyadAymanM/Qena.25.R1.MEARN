# 🧩 NestJS 3-Day Task: Bookmark CRUD with Users

This 3-day task guides you through building a simple NestJS backend

---

## 🗓️ Day 1 – Basic CRUD (No Database)

### 🎯 Goal
Implement a basic NestJS application that manages users and their bookmarks using **in-memory arrays**.

---

### 📋 Requirements

#### 1. Modules
- `users` module
- `bookmarks` module

#### 2. User Entity (in memory)
```ts
{
  id: number,
  name: string
}
```
Users should be stored in an array inside `UsersService`.

#### 3. Bookmark Entity (in memory)
```ts
{
  id: number,
  title: string,
  url: string,
  userId: number
}
```
Bookmarks should be stored in an array inside `BookmarksService`.

#### 4. User CRUD (in `UsersController`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a single user |
| POST | `/users` | Create a user (`name` in body) |
| DELETE | `/users/:id` | Delete a user |

#### 5. Bookmark CRUD (in `BookmarksController`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/bookmarks` | Get all bookmarks |
| GET | `/bookmarks/:id` | Get one bookmark |
| POST | `/bookmarks` | Create a bookmark (`title`, `url`, `userId` in body) |
| PUT | `/bookmarks/:id` | Update bookmark title or url |
| DELETE | `/bookmarks/:id` | Delete a bookmark |

#### 6. Bonus (Optional)
- `GET /users/:id/bookmarks` → Get all bookmarks for a specific user.

#### 7. Notes
- No DTOs, Pipes, or Database.
- Just use simple arrays and basic logic.
- Data can be stored in memory — no persistence required.

---

### 💡 Example structure
```
src/
 ├── bookmarks/
 │    ├── bookmarks.controller.ts
 │    ├── bookmarks.service.ts
 │    └── bookmarks.module.ts
 ├── users/
 │    ├── users.controller.ts
 │    ├── users.service.ts
 │    └── users.module.ts
 ├── app.module.ts
 └── main.ts
```