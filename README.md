# RESTful-APIs-ExampleProject
This Project is a part of The Complete 2023 Web Development Bootcamp with updated version of Mongoose

# Getting Started
### 1. Clone the project
```
git clone https://github.com/kuanggy/RESTful-APIs-ExampleProject.git
```

#### If you want to start implementing your own brand new project
Make sure you have install `makefile`, if you have not:
```
brew install make
```
Then:
```
make
```

### 2. Install npm packages
```
npm install
```

### 3. Connect to the MongoDB
replace the mongodb URI with yours in ```app.js```
```
mongoose.connect("mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<databaseName>", {
        useNewUrlParser: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
```

### 4. Run the project
```
node app.js
```

### 5. Test APIs
- Using http verbs: ```GET```, ```POST```, ```PUT```, ```PATCH```, ```DELETE```
- Accessing the URL: ```localhost:3000/articles``` to query all articles
- Accessing specific article: ```localhost:3000/articles/<articleTitle>```
