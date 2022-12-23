new_node:
	npm init -y
	npm install express body-parser requests ejs mongoose lodash uuid
	touch server.js
	echo "const express = require('express');const app = express();const bodyParser = require('body-parser');app.use(bodyParser.urlencoded({extended: true}));app.use(express.static('public'));mongoose.set('strictQuery', false);mongoose.connect('mongodb+srv://<username>:<password>@cluster0.7a0odwe.mongodb.net/<databaseName>', {useNewUrlParser: true}).then(() => console.log('Database connected!'')).catch(err => console.log(err));app.listen(3000, function () {console.log('Server started on port 3000');});" > server.js
