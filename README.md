React Boilerplate
=====================

A minimal and light dev environment for ReactJS.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```
```
Start chatty server
node server.js
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

![alt tag](https://github.com/MeaganBlais/chattyApp/blob/master/build/2%20users.png "2 users")
![alt tag](https://github.com/MeaganBlais/chattyApp/blob/master/build/Basic%20Page.png "Basic Page")
![alt tag](https://github.com/MeaganBlais/chattyApp/blob/master/build/Conversations%20%26%20Name%20Change.png "Convo & Name Change")
