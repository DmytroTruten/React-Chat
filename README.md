# React Chat

This project is a web application that allows users to communicate in real-time. You can exchange messages with other users and engage in active discussions.

## Key Features

- User registration and login functionality.
- Sending and receiving text messages in real-time.
- Displaying message arrival dates and times using the `moment.js` library.
- Utilizing Redux Toolkit for state management of the application.
- Implementing React Router for navigation between different pages of the app.
- Using SCSS for user interface styling.
- Integration with Firebase for storing users and their messages.

## Prerequisites

Before getting started with this project, you need to have the following tools installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- Firebase account: [Firebase Console](https://console.firebase.google.com/)

## Setup Instructions

1. Clone this repository: `git clone https://github.com/DmytroTruten/React-Chat.git`
2. Install dependencies: `npm install`
3. Create a Firebase configuration file using your credentials in `src/firebase.js`.
4. Start a local development server: `npm run dev`

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;
```

## Contributing
If you wish to contribute to this project, please create a pull request in this repository. I am open to enhancements and new features!