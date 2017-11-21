# react-code-journal-sandbox

## Make sure your mongod server is running befor you start the application
### if on mac and global mongo is not running unless in sudo mode
```sudo chown -R `id -un` /data/db```

On windows and having trouble? Your going to have to use google, Sorry.

### To run this file.

`npm install or yarn install`

`cd client`

`npm install or yarn install`

`cd ../ `

`npm run dev`

### There are two routes set up in the Index.js File of the root project directory.

1) [localhost:3000/][1]


2) [localhost:3000/todos][2]

###### Both routes have Actions and Reducers wired Up Through Redux

#### In Models There is a /index.js file with db connection configurations
#### also there is a model for todos

#### in routes we have routes with short hand crud definitions
#### In helpers we have the route callback functions.

#### middlewares is where our middlewares will go Like authentication checking

## In Client/

### in src/Components we have App Test and Todos for Components.

#### In components/App we have our Browser Router with Front end Routing
#### in our Client/src/index we have our call to ReactDOM.render() and Our Provider wrapper for Redux Store.
#### We created our Store in the client/src/index and tied in our middlewares like redux-flux. We also imported our global materailize css.

# Keep up with Project Changes In PROJECT_OVERVIEW.md

[1]: http://localhost:3000/
[2]: http://localhost:3000/todos

Example of Using HTML in md (markDown) files. <ul id="li" style="padding: 20px;"><li style="padding: 20px;background-color: red;">ListTag</li>




