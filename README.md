# capstone-budget-app

## To get the front-end running locally:

1. You will need Node.js and npm installed

    If you don't have those already, see [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
    As recommended by npm, I would use a node version manager like [nvm](https://github.com/nvm-sh/nvm) to handle this.

2. With Node installed, run `npm install` from the root of your project directory.
It should say something like: 
> added 274 packages, and audited 275 packages in 1s

3. If you are trying to develop, run `npm run dev`.
Now the app should be running on [http://localhost:5173/](http://localhost:5173/)

## To get the back-end running locally:
1. Update the dbConfig in `backend/server.ts` with your local config
2. navigate to the `backend` folder
3. run `npm install`
4. run `npm run dev`
