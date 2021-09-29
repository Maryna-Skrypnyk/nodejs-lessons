## Progress with HTTP:

(`cd lesson02/http-server`)

1. `npm init y`

2. Create root file `app.js`

3. Package `nodemon` as `devDependencies` - `npm install --save-dev nodemon`

[nodemon](https://www.npmjs.com/package/nodemon)

4. Add scripts in `package.json`:

```
"start": "node app.js",
"start:dev": "nodemon app.js"
```

5. Import module `http`, `fs`, `path` in `app.js`

6. Create TypeMime-object:

```
const TypeMime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".ico": "image/x-icon",
};
```

7. Create function `requestHandler` with options `request` and `response`

8. Create variable `server` and use the http-module's method `http.createServer(requestHandler)`

9. Assign port: `const PORT = process.env.PORT || 3000;`

10. Raise the server:

```
server.listen(PORT, (error) => {
    if(error) {
        console.error('...')
    }
    console.log('...')
});
```

11. `npm run start` or `npm run start:dev`

12. Go to `http://localhost:3000/`

## Progress with Express:

(`cd lesson02/express-server-0`)

1. `npm i express`

2. Create root file `server.js`

3. Add scripts in `package.json`:

```
"start": "node server.js",
"start:dev": "nodemon server.js"
```

4. Do import module `express` in `server.js`

5. Initialization express-app:

```
const app = express();
```

6. Assign port:

```
const PORT = 8081;
```

7. Raise the server:

```
app.listen(PORT, (err) => {
    if(err) {
        console.error('...')
    }
    console.log('...')
});
```

8. Define routes (example - get):

```
app.get('/home', (req, res) => {
res.send('get request');
});
```

9. Define routes (example - post, delete, put, use(all methods)):

```
app.post('/home', (req, res) => {
res.send('post request');
});

app.delete('/home', (req, res) => {
res.send('delete request');
});

app.put('/home', (req, res) => {
res.send('put request');
});

app.use((req, res) => {
res.send('middleware request');
...
})
```

10. Create example custom Middleware

```
// Example custom Middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
//   next();
// });

// app.get("/home", (req, res) => {
//   res.json({ javascript: "object" });
// });
```

11. Create example Express Middlewares

```
// Example Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for html-forms
app.use(express.static("public")); // for public-directory files

app.post("/home", (req, res) => {
 if (!req.body.goit) {
     return res.status(400).json({ status: "goit parameter is required" });
   }
  res.json({ javascript: "object", body: req.body });
 });
```

12. Create example npm Middleware (morgan for log):

- `npm i morgan`

- do import module `morgan` in `server.js`

- ```
  // Example npm Middleware (morgan)
  app.use(morgan("tiny")); // for log
  ```

13. `npm run start` or `npm run start:dev`

14. Go to `http://localhost:8081/`

## Progress with Express:

(`cd lesson02/express-server`)

1. `npm init y`

2. Create root file `app.js`

3. Package `nodemon` as `devDependencies` - `npm install --save-dev nodemon`

[nodemon](https://www.npmjs.com/package/nodemon)

4. Add scripts in `package.json`:

```
"start": "node app.js",
"start:dev": "nodemon app.js"
```

5. `npm i express`

6. Import modules `express`, `fs`, `path` in `app.js`

7. Initialization express-app:

```
const app = express();
```

8. Assign port:

```
const PORT = process.env.PORT || 3000;
```

9. Raise the server:

```
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});
```

10. Use methods routs

11. Use ejs-package template (`npm i ejs`)

12. `npm run start` or `npm run start:dev`

13. Go to `http://localhost:3000/`
