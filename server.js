const express = require('express');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = 8000;

// set view enjine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use method-override middleware
app.use(methodOverride('_method'));

// express router
app.use('/', require('./routes/productRoute'));

// listen on port
app.listen(port, (error) => {
    if (error) {
		console.log(`Error in connecting to server: ${error}`);
		return;
	}
	console.log(`Server running on port: ${port}`);
});
