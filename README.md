# Distance measuring app

NOTE: This is practice task that is done to show specific things: 
  -reading and setting data from url, 
  -simple dynamic fields/state adding system, 
  -instant search with data pulling from API(there is no caching but normally it would be done with react-query or something similar), 
  -custom form validation(for production purpose I would use yup or something similar).

This project has fake api. 

The point of this practice was to show how to handle data retreiving in different componets (of course we can just save data in global state or something similar but
if you image that date is complex and there is a lot of informations we should avoid that).

Instant search is implemented with React Typeahead. Form validation is implemented. Form data is saved in url so if user copy url link and send it to someone
form will be populated automatically and data will be pulled from server(cities). 

After you submit the form only ids of the cities are sent to the result page. Data is pulled from the server that and calculations are done.
At result page also if you copy url and send it to someone everything will work (data pulled from server and distance calculated).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### 'npm run test'

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
