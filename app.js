const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');

app.set('view engine', 'ejs'); // set EJS as the view engine
app.use(express.static('public')); // Specify the public directory as a static asset folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes); // use the routes defined in routes.js

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
