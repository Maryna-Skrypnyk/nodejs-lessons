## Progress with Mongo DB:

(`cd lesson05/lesson05-0`)

1. Add files of directory lesson04-0

2. Create DB Mongo DB Atlas:

- create cluster
- set Database Access (user-password)
- set Network Access (IP)

3. Download MongoDB Compass - local

4. Connect MongoDB Cluster with Compass

5. Create DataBase in Compass (db-posts) and create collection (posts)

6. Import json-file to posts

7. `npm i mongodb --save`
   import to `connection.js` (folder `db`)

```
const { MongoClient } = require('mongodb');
```

create file `models.js` (folder `middlewares`) and import function `getCollections` from `db/connection`

create middleware:

```
module.exports = (req, res, next) => {
  const collections = getCollections();
  req.db = {...collections};
  next();
};
```

create collections in `connection.js`:

```
const collections = {};
const getCollections = () => {
  return collections;
};
```

8. Import connect to `server.js`
   `const { connectMongo } = require("./src/db/connection");`

9. Add MONGO_URL in `.env`

10. Create function `start` and add `app.listen` to `start` with handle error:

```
const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) {
        console.error("Error at server launch:", err);
      }
      console.log(`Server works at port ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
```

11. Import `ObjectId` to `postController.js`

```
const ObjectId = require("mongodb").ObjectId;
```

Update file `postController.js`, use methods db - find, findOne, insert, updateOne, deleteOne

12. Delete PATCH-method, validation update

13. Create folder `helpers` with file `apiHelpers.js`
    Add to file the function `asyncWrapper`

14. Import `asyncWrapper` from `apiHelpers.js` to `postsRouter.js` (folder `routers`)
    Use `asyncWrapper` with controllers

15. Use `Postman` to check app-requests

## Progress with Mongoose:

1. `npm i mongoose` (delete `mongodb` from package.json)

2. Import mongoose to `connection.js`
   `const mongoose = require('mongoose');`

3. Connect Mongoose in `connection.js`:

```
const connectMongo = async () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //   console.log("Database connected successfully!");
};

module.exports = {
  connectMongo,
};
```

4. Delete middleware `models.js`
   Remove in `postsRouter.js`:

   ```const modelsMiddleware = require("../middlewares/models");
   router.use(modelsMiddleware);
   ```

5. Create schema in file `postModel.js` (db folder):

6. Update `postsController.js`
   use methods `find`, `findById`, `save`, `findByIdAndUpdate`, `findByIdAndRemove`

7. Create folder `services` and file `postService.js`
   Write functions `getPosts`, `getPostById`, `addPost`, `changePostById`, `deletePostById`
   import this functions to `postController.js`

8. Create errorHandler in `apiHelpers.js` and `server.js`

9. Create file `errors.js` in `helpers`
   create classes errors
   import `ValidationError` to `validationMiddleware.js`

10. import `ValidationError` to `validationMiddleware.js`, change error

11. import `WrongParametersError` to `postService.js`, change errors

12. Go to `apiHelpers.js`
