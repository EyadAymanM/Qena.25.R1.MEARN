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

## 🗓️ Day 2 – Add Validation & Database (MongoDB)

### 🎯 Goal
Enhance the app by:
- Adding **DTOs** for input data.
- Using **class-validator** and **class-transformer**.
- Connecting to a **MongoDB** database.
- Replacing arrays with **real database entities**.

---

### 📋 Requirements

#### 1. Setup Database
- Use **MongoDB**.
- Connect via **MongooseModule** in `app.module.ts`.
  ```ts
  MongooseModule.forRoot('mongodb://localhost:27017/bookmark-app')
  ```

#### 2. Create Schemas
Replace in-memory entities with MongoDB schemas:

**User Schema**
```ts
@Schema()
export class User {
  @Prop({ required: true })
  name: string;
}
```

**Bookmark Schema**
```ts
@Schema()
export class Bookmark {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  userId: string;
}
```

#### 3. Add DTOs
Example:
```ts
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
```

#### 4. Enable Validation Globally
In `main.ts`:
```ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
```

#### 5. Update Services
Replace in-memory logic with **Mongoose models**:
- Use `@InjectModel()` to inject collections.
- Perform CRUD operations using Mongoose methods (`create`, `find`, `findById`, `deleteOne`, etc.).

---

### 🧠 Bonus
- Add `updatedAt` and `createdAt` timestamps in schemas.
- Add user existence check before creating a bookmark.

---
