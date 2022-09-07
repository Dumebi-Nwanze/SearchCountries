# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start dev`

or:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Code Breakdown

The application makes a call to the restcountries API and fetches all the countries initially, the user can then search and a filtered list of countries is created. If the seached country does not exist there is some feedback given to the user.

The user can the select a country, this will redirect the user to another page that displays some details about the country selected, the navigation is made possible with the help of the useNavigate hook from react-router-dom.

Also while the data is being loaded to the client there is a loading spinner that is displayed to improve the UX.
