# Forms

Forms is a google forms replica made using [MERN] stack. It allows user to create surveys and add questions with fields like textbox, radiobutton and checkbox. After creating the form, the user can share the form URL and it can be filled by anyone.

**For a walkthrough of the complete application, watch the Walkthrough video present in this repository.**

### Prerequisites
  - [NodeJS]

### Brief
----
##### Frontend

- The frontend is an extension of [create-react-app].
- [Redux] has been used to avoid props drilling and lifting the state. Redux has not been used as a default state mangement for every component.
- I have kept the project structure as simple as possible considering the scope and timeline of the project.
- The project is entirely built on functional components.
- React testing library and [Jest] has been used for writing testcases.

#### Backend
- Backend is an [Express] app running in [Nodejs].
- [Mongodb] is used as a database of choice as to store forms and answers [document-style] database should be beneficial.
- Healthcheck api is included to test if the server is running properly.
- [Morgan] and [Npmlog] is used for logging.
- [DotEnv] is used for env variables and auto complete.

### Setup
----
#### MongoDb

- For storing the database, we'll use Atlas. Atlas is MongoDB’s fully-managed database-as-a-service. For our application, we'll use the free tier of Atlas.
- You can follow the **Getting started** section of [this] blog to setup Atlas and get a connection string. We will use this connection string to connect our node.js application to the database.
 
#### NodeJS
```sh
$ cd backend
$ npm install
```

Setting up the .env file...
- you need to add .env file in the Backend folder with keys **PORT** and **MONGO_DB_URL** (mongo connection string that we created earlier).
 
Running the server:
```sh
$ npm start
```
The server will start on http://localhost:8989. (Assuming the port set in .env file was 8989)
You can hit the http://localhost:8989/healthcheck API to verify if the app is working or not. If the response is 'OK', then the app is working.

#### React
To start the react app, you need to add a .env file in the *frontend* folder with a key **REACT_APP_SERVER_URL**. The value of this key would be the base URL of the server. For example, if the backend server is running on port 8989, the file will contain the following content : ```REACT_APP_SERVER_URL=http://localhost:8989```

Next, to run the application, follow the following commands:
```sh
$ cd frontend
$ npm install
$ npm start
```

The React application will start on http://localhost:3000.
If the backend server is running, the frontend will work fine.

[//]: # (These are reference links used in the body)
    
   [NodeJS]: <https://nodejs.org/en/download/>
   [React]: <https://cli.angular.io/>
   [this]: <https://medium.com/@sergio13prez/connecting-to-mongodb-atlas-d1381f184369>
   [MERN]: <https://www.mongodb.com/mern-stack>
   [create-react-app]: <https://reactjs.org/docs/create-a-new-react-app.html#create-react-app>
   [Jest]: <https://jestjs.io/>
   [Redux]: <https://redux.js.org/>
   [Express]: <https://expressjs.com/>
   [Mongodb]: <https://www.mongodb.com/>
   [document-style]: <https://www.mongodb.com/document-databases>
   [Morgan]: <https://www.npmjs.com/package/morgan>
   [Npmlog]: <https://www.npmjs.com/package/npmlog>
   [DotEnv]: <https://www.npmjs.com/package/dotenv>