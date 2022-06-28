# React Native Chat app

It is a chat app for mobile devices made with React Native. The app provides users with a chat interface and options to share images and their location.

## Features

### User Stories

1. As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
   friends and family.
2. As a user, I want to be able to send messages to my friends and family members to exchange
   the latest news.
3. As a user, I want to send images to my friends to show them what I’m currently doing.
4. As a user, I want to share my location with my friends to show them where I am.
5. As a user, I want to be able to read my messages offline so I can reread conversations at any
   time.
6. As a user with a visual impairment, I want to use a chat app that is compatible with a screen
   reader so that I can engage with a chat interface.

### Key Features

1. A page where users can enter their name and choose a background color for the chat screen
   before joining the chat.
2. A page displaying the conversation, as well as an input field and submit button.
3. The chat must provide users with two additional communication features: sending images
   and location data.
4. Data gets stored online and offline.

## Technical Requirements

1. The app must be written in React Native.
2. The app must be developed using Expo.
3. The app must be styled according to the given screen design.
4. Chat conversations must be stored in Google Firestore Database.
5. The app must authenticate users anonymously via Google Firebase authentication.
6. Chat conversations must be stored locally.
7. The app must let users pick and send images from the phone’s image library.
8. The app must let users take pictures with the device’s camera app, and send them.
9. The app must store images in Firebase Cloud Storage.
10. The app must be able to read the user’s location data.
11. Location data must be sent via the chat in a map view.
12. The chat interface and functionality must be created using the Gifted Chat library.
13. The app’s codebase must contain comments.

## Tech Stack

1. React Native
2. React Navigation
3. Gifted Chat
4. Expo

## How to use the app

This app is not published to AppStore or PlayStore. In order to use this app, Please follow the steps mentioned below.

1. Clone the repository.
2. Run the command `$ npm install` to install all the requred depedencies.
3. Install Android studio or Xcode to run the Android Phone and I Phone simulators.
4. Download and configure the simulators as per your requirments.
5. Once the simulators and up and running, you could start the expo server by running the command `$ npm start`
6. This will start expo server and it will be available at [http://localhost:19002/](http://localhost:19002/). Open this link in your browser.
7. Now you will see options to run the app on a IOS simulator or on an Android simulator using expo. Click on the inteded option and enjoy the app.
