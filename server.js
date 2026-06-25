const express = require("express"); // web framework
const morgan = require("morgan"); // logging middleware
const campsiteRouter = require("./routes/campsiteRouter");

// server config
const hostname = "localhost";
const port = 3000;

// creates the express app object
const app = express();

app.use(morgan("dev")); // logs every request to console
app.use(express.json()); // parses json bodies

// any request starting with /campsites gets passed to campsiteRouter
app.use("/campsites", campsiteRouter);

/* manual route handlers - moved to campsiteRouter

app.all("/campsites", (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
});

app.get("/campsites", (req, res) => {
    res.end("Will send all the campsites to you");
});

app.post("/campsites", (req, res) => {
    res.end(`Will add the campsite ${req.body.name} with description: ${req.body.description}`);
});

app.put("/campsites/:campsiteId", (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete("/campsites/:campsiteId", (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
}); */

// tells express "if the request matches a file in /public, serve that file"
app.use(express.static(__dirname + "/public"));

// fallback handler if no other route matched
app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

// starts server & listens for requests
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/* 
request 
↓
morgan("dev") logs it
↓
express.json() parses JSON bodies
↓
if path starts with /campsites send to campsiteRouter
↓
if request matches a file in /public serve it
↓
if nothing matched send fallback HTML response
*/