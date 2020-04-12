# Problem Statement:
Create a simple React-Redux app for a User to Sign In/Sign up to the app and logout. You have to build a responsive UI and the corresponding backend for this.

## Features:
- Sign in / Sign up
- View Profile
- Logout

The flow should be:
- The User enters their email at the first screen.
- An OTP will be sent to their email address, which they have to register on the next screen.
- If the User was already signed up User and once the OTP is entered, they should be signed in, else they should be moved to the third page where they can enter details like First Name, Last Name and referral code if any.
- Referral code should be validated at the same time on the sign-up page.

# Soution:
Fontend is located at `/client` folder
Backend is located at `/` folder

### Steps to run the application:
> All the below mentioned commands have to be used in project root directory
 - **clone** the repo
 - `npm install` (_Installs all the dependencies in package.json file of server_)
 - After the above step, `npm run clientInstall` (_Installs all the dependencies in package.json file in client folder_)
 - `npm run dev command` (_Starts server and client_)

## Description:
### Backend:
- Dev Dependencies:
  - nodemon -> tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected in dev environment
  - concurrently -> tool that helps run multiple commands concurrently.(eg: run both server and backend with single command)
- Dependencies:
  - express -> node.js framework helps in writing restful API's using javascript
  - jsonwebtoken -> to encrypt the user payload to exchange data.
  - mongoose -> MongoDB object modeling tool designed to work in an asynchronous environment
  - nodemailer -> Send e-mails from Node.js 
  - shortid -> short non-sequential url-friendly unique id generator.(used for generating referral codes)
  - dotenv -> Loads environment variables from .env file
  - config -> Configuration control for production node deployments
  
  
> __Nodemailer package is used with my gmail credentials to send emails.__

> __Total of 6 API's have been created, out of which 5 have been used to achieve the output.__

> __MongoDB is used to store application data.__

__There are two collections user and otp.__
 - user: to store firstName, lastName, email, referralCode and referredBy
 - otp: to store otp and email

__Two routes have defined for endpoints__
 - _api/users_
 - _api/auth_

#### Endpoints:
- __POST__ `_api/users/signup_`:
  - used for creating an account for the user in collection.
  - after the user record is created in collection, jwt token with user id as payload is sent back to client to make requests to private API's
- __POST__ `_api/users/otp/generate_`:
  - used for generating otp and sending it to email.
  - If there is already document with given email, update otp of the document with a new one., else create a new document with email and otp in otp collection
- __POST__ `_api/users/otp/verify_`:
  - used for verifying otp.
  - compares otp in request body to otp present in collection table for email present in request body.
- __POST__ `_api/auth/otp_`:
  - used for authentication through otp
  - compares otp in request body to otp present in collection table for email present in request body.
  - if otp is not matched returns error response message with status code 400.
  - Else if there is a document in user collection for the given request email then creates a jwt token with user's id as payload and sends it back to client along with user object (This replicated login scenario of user).
  - if thre is no document, return success response with msg as correct and empty token, user.
- __GET__ `_api/auth/user_`:
  - used with a middleware that decodes jwt token sent in a custom header x-auth-token if present else returns error status with appropriate messages/
  - returns user obj with a valid jwt token.
  
### Frontend:
Dependencies:
  - axios: Promise based HTTP client for the browser and node.js
  - notistack: used to show notification snackbars (toasts) that can be stacked on top of each other
  - react-router-dom: DOM bindings for React Router
  - redux-devtools-extension: Wrappers for Redux DevTools Extension.
  - react-redux: Useful for using redux with react
  - redux-thunk: middleware for redux, allows to create async functions inside actions 
  - @material-ui/core: used for styling the application using material principles
  - @material-ui/icons: material icons

> proxy: "http://localhost:5000" is added to package.json file to proxy to api calls through http://localhost:3000

__The folder structure of src directory can be categorized in to 4 categories__
- __actions__ : Has all the code related to redux actions
  - authActions has actions such as registering user, load user, generate otp, verify otp, validate referral code and logout.
  - errorActions has actions such as Get errors and clear errors
  - snackbarActions has actions related to snackbars/toasts/notifications
- __reducers__ : Has all the code related to redux reducer
- __components__ : Has all the code related to react components
  - Authentication Component is used to display various forms in a flow
  - Home component is used to display user data post login
  - Private Route to handle secure webpages.
- __utils__ : helper functions
  - set auth token if there is token in local storage
