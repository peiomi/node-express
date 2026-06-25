// create router object (mini express app that only handles a specific set of routes)
const express = require("express");
const campsiteRouter = express.Router();

// all /campsite routes live here, if there were camperRouter all /campers routes would live there

/* 
you could do: 
campsiteRouter.all("/", (req, res, next)).....
campsiteRouter.get("/", (req, res))...

but chaining is cleaner and they all use the same path
*/

campsiteRouter.route("/")
// all runs for every HTTP method
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next(); // passes control to next handler in the chain
})
.get((req, res) => {
    res.end("Will send all the campsites to you");
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end("Deleting all campsites");
});

module.exports = campsiteRouter;