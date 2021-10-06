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
