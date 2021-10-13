## GoIT Node.js Course Template Homework

Выполните форк этого репозитория для выполнения домашних заданий (2-6)
Форк создаст репозиторий на вашем http://github.com

Добавьте ментора в коллаборацию

Для каждой домашней работы создавайте свою ветку.

- hw02
- hw03
- hw04
- hw05
- hw06

Каждая новая ветка для дз должна делаться с master

После того как вы закончили выполнять домашнее задание в своей ветке, необходимо сделать пулл-реквест (PR). Потом добавить ментора для ревью кода. Только после того как ментор заапрувит PR, вы можете выполнить мердж ветки с домашним заданием в мастер.

Внимательно читайте комментарии ментора. Исправьте замечания и сделайте коммит в ветке с домашним заданием. Изменения подтянуться в PR автоматически после того как вы отправите коммит с исправлениями на github
После исправления снова добавьте ментора на ревью кода.

- При сдаче домашней работы есть ссылка на PR
- JS-код чистый и понятный, для форматирования используется Prettier

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

### Progress (Lesson04-1)

1. `npm i`

2. `npm i eslint-config-prettier -D`; add in file `.eslintrc.js` `extends: ["standard", "prettier"]`, `"prettier"` must be at the end;

3. Comment rules properties:

```
   rules: {
    // "comma-dangle": "off",
    // "space-before-function-paren": "off",
  },
```

4. `npm run start:dev`

5. Create `db.js` in `model` to handle files
   import it to `index.js` (`model`)
   import `index.js` to `cats.js` (`routes`)

6. Handle file `cats.js` (routers methods: GET, GET by id, POST, PUT by id, PATCH by id, DELETE by id) -> handle file `index.js` too

7. Write in `app.js` handle errors:

```
app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: "fail", code: 500, message: err.message });
});
```

8. `npm i joi` for validation

9. Create file `validation.js` in `routes/api`
   import `validation.js` to `routes/cats.js`

## Progress with Mongo DB (Lesson05-1):

(`cd lesson05/lesson05-1`)

1. Add files of directory lesson04-1

2. Create DB Mongo DB Atlas:

- create cluster
- set Database Access (user-password)
- set Network Access (IP)

3. Download MongoDB Compass - local or MongoDB Robo3t

4. Connect MongoDB Cluster with Compass or Robo3t

5. Create DataBase (db-cats) and create collection (cats) in Compass or Robo3t

6. Import json-file to cats in Compass or Robo3t / delete `cats.json`

7. Create file `.env` and add URI_DB

8. `npm i dotenv mongodb`

9. Change file `model/index.js`

10. Do validation: `npm i joi-objectid`
    import to file `validation`
    `Joi.objectId = require('joi-objectid')(Joi)`

11. Update file `validation`

## Progress with Mongoose (lesson06-1):

(`cd lesson06/lesson06-1`)

1. `npm i mongoose` (delete `mongodb` from package.json)

2. Create folder `repository` in the root and move file `index.js` from `model` to `repository` (update import in controllers)

3. Create file `cat.js` in `model`

4. Create folder `config` in the root and move file `db.js` from `model` to `config`

5. Do connect in the file `config/db.js`:
   Import mongoose to `db.js`
   `const mongoose = require('mongoose');`

```
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.URI_DB;

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log('Mongoose connection to DB');
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error ${err.message}`);
});

// disconnected

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection to DB closed.");
  process.exit();
});

module.exports = db;
```

6. Update `bin/server.js`

```
const db = require("../config/db");
const app = require("../app");

const PORT = process.env.PORT || 8080;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not run, Error: ${err.message}`);
});
```

7. Write code in `model/cat.js` - schema mongoose

8. Create `config/constant.js`, add constants:

```
const ValidInfoCat = {
    MIN_AGE: 1,
    MAX_AGE: 30
};

module.exports = {
  ValidInfoCat,
};
```

update `validation.js` and `model/cat.js` with constant

9. Update `repository/index.js`

10. Add objecr to schema `{ versionKey: false, timestamps: true, toJSON: { virtuals: true, transform: function (doc, ret) { delete ret._id; return ret; } }, toObject: { virtuals: true } }`

11. Add `catSchema.virtual`:

```
catSchema.virtual("status").get(function () {
  if (this.age >= 10) {
    return "old";
  }
  return "young";
});
```

12. Create folder `controller` and file `cats.js`

13. Write controllers

## Progress (lesson07-1):

(`cd lesson07/lesson07-1`)

1. Create folder `users` and files `users.js`, `validationUser.js` in `routes`

2. Add `usersRouter` to `app.js`:

```
const usersRouter = require("./routes/users/users");
...
app.use("/api/users", usersRouter);
app.use("/api/cats", catsRouter);
...

```

3. Write routers in `routes/users/users.js`:
   `router.post("/registration");`
   `router.post("/login");`
   `router.post("/logout");`

4. Create file `users.js` in `controllers`

5. Create `repository/users.js`

6. Create `model/user.js`

7. Do registration in `controllers/users.js`

8. `npm i bcryptjs` and work with password

9. Create hook in `model/user.js`:

```
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(SALT_FACTOR);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  next();
});
```

10. Write Login

11. Create function in `model/user.js`:

```
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
```

write controller `login`

12. `npm i jsonwebtoken` and create token:
    add in `.env` secret key
    do imports in controller

13. `npm install passport-jwt` and `npm install passport`

14. Create `passport.js` in folder `config` and do setting

15. Write function `findById` in `repository/user.js` and import it to `passport.js`

16. Create `helpers/guard.js` in the root

17. Import `guard` to `routes/cats/cats.js`

18. Write function `logout`:
    Import `guard` to `routes/users/users.js` and use it in logout:

    ```
    const guard = require("../../helpers/guard");
        ...
    router.post("/logout", guard, logout);
    ```

19. Write function `logout` in `controllers/users.js`
