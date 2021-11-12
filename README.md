# Turkey  API
In this project we will use ```tsoa``` to register our Express routes and to obtain validation without using boilerplate code.

As all good CRUD services, we need a data source to manage our data.
To manage database object we are going to use Simple JSON DB to read and write JSON to disk.

## Project setup
Run ```npm install``` and install all the necessary dependencies.

## VSCode
Recommended packages:
- Eslint

Recommended settings to add to Library/Application\ Support/Code/User/settings.json:

    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },

## Local testing
```npm run start```
or
```npm run watch```

## Swagger UI
When running the server you can access the swagger UI at http://localhost:5000/swagger