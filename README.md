# CS-732 Tech Demo Application

This repository contains the source code for the CS-732 Tech Demo application, which includes both a **backend API** and a **React Native mobile app**. 
This tech demo serves as an entry into Cross platform development via React Native.
The tech stack used is:
1. *API*: NodeJS, ExpressJS
2. *Database*: MongoDB
3. *Deploying*: Render
4. *Mobile App*: React Native, Expo

---

## Table of Contents

1. *[Prerequisites]* - VS Code
2. *[Installation]*
    *For the backend*
    ```bash
    cd backend
    npm install
    ```
1. *[Running the Backend]*
    Create a mongoDB account. Then create a database. Then run:
    ```bash
    npm run dev
    ```
2. [Running the Mobile App]
    *How to deploy the application*
    Create a render.com account. Then create a web service as shown in the video. Deploy the application.
    ```bash
    cd mobile
    npx expo start
    ```
    This will generate a QR code that you can scan through your expo go application
    *How to install expo go on mobile device*
    Go to your android/iphone. Install expo go from playstore/appstore.
    Open the app and scan
3. [Environment Variables](#environment-variables)
    For this tech demo you only need three env variables. The rest can be copied from my video.
    These 3 are *PORT, MONGO_URI, API_URL*
---

## Prerequisites

Before running the application, ensure you have the following installed on your system:
- **Node.js**: [Download here](https://nodejs.org/)
- **Expo CLI**: Install globally using `npm install -g expo-cli`
- **Git**: [Download here](https://git-scm.com/)

---

## Installation

Clone the repository:
   ```bash
   git clone https://github.com/UOA-CS732-S1-2025/cs732-assignment-SaikatBaidya.git
   cd cs732-assignment-SaikatBaidya