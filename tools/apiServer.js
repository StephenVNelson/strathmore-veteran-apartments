/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const data = require('./db.json')
const uniqid = require('uniqid');

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/dist"
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 0);
});

// Declaring custom routes below.Add custom routes before JSON Server router

// handles getting id
// server.get('/roommateGroups/:id', (req, res) => {
//   // if (req.query.filterByFormula) { res.jsonp(req.query) }
//   const group = data.roommateGroups.records.find(roommateGroup => roommateGroup.id == req.params.id)
//   res.jsonp(group)
// })

// function validate(item) {
//   if (!item.id) return "Item must include an ID"
//   if (!item.fields) return "Item must include fields"
//   if (!item.createdTime) return "Item must include a creation time"
//   return ""
// }

// custom routing for querying and posting
// server.use((req, res, next) => {
//   if (req.query.filterByFormula) {
//     const property = req.query.filterByFormula.match(/(?<=\{)[A-Za-z1-9]*(?=})/)[0]
//     const value = req.query.filterByFormula.match(/(?<=\')[A-Za-z1-9]*(?=')/)[0]
//     const filtered = data.apartments.records.filter(apartment => apartment.fields[property] === value)
//     res.send(filtered)
//     return
//   }
// Add createdAt to all POSTS
// if (req.method === "POST") {
//   req.body.id = uniqid()
//   req.body.createdTime = Date.now();
//   const newItem = req.body
//   const error = validate(newItem)
//   if (error) { res.status(400).send(error) }
//   else {
//     req.body = { ...data.prospects, records: [...data.prospects.records, newItem] }
//     res.send(JSON.stringify(newItem))
//   }
//   return
// }
// Continue to JSON Server router
//   next();
// });

// server.post("/prospects/", function (req, res, next) {
//   req.body.id = uniqid()
//   req.body.createdTime = Date.now();
//   const newItem = req.body
//   const error = validate(newItem)
//   if (error) { res.status(400).send(error) }
//   else {
//     req.body = { ...data.prospects, records: [...data.prospects.records, newItem] }
//     // res.send(JSON.stringify(newItem))
//     next()
//   }
// })

// server.post("/courses/", function (req, res, next) {
//   const error = validateCourse(req.body);
//   if (error) {
//     res.status(400).send(error);
//   } else {
//     req.body.slug = createSlug(req.body.title); // Generate a slug for new courses.
//     next();
//   }
// });



router.render = (req, res) => {
  if (req.method === "GET" && req.path.split('/').length <= 2) {
    res.jsonp({
      records: res.locals.data
    })
  } else {
    res.jsonp(res.locals.data)
  }
}

// server.use(jsonServer.rewriter({
//   '/api/*': '/$1',
//   '/blog/:resource/:id/show': '/:resource/:id'
// }))

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

// Returns a URL friendly slug
// function createSlug(value) {
//   return value
//     .replace(/[^a-z0-9_]+/gi, "-")
//     .replace(/^-|-$/g, "")
//     .toLowerCase();
// }

// function validateCourse(course) {
//   if (!course.title) return "Title is required.";
//   if (!course.authorId) return "Author is required.";
//   if (!course.category) return "Category is required.";
//   return "";
// }
