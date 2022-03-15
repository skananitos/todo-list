# TODO List App

## Introduction

TODO List App exposes a RESTful API allowing a user to manage a private TODO list. The application includes a frontend implementation too.

The exposed interface allows the following operations:
- List TODO lists for a user
- Create/delete a TODO list for a user
- A TODO list can contain TODO list elements - a TODO list element is a text up to 2048 characters
- Add/remove/update an element of the TODO list

## About

The backend is a fully RESTful web API, scalable for further developments, which follows basic principles like <b>DRY</b>, <b>Single Responsibility</b> and <b>Separation of Concerns</b>. 

The application has been developed by using Express, Node.js, MongoDB and EJS. The established connection with MongoDB Atlas accepts all IPs and gives the possibily to run the full application from any device.

## Setup up the environment

### Prerequisites

You should have Node.js and NPM installed on your machine. In case you don't already have it, download the setup .exe from here: `https://nodejs.dev/download`

#### Verify installation

Open a command prompt and enter the following:

```
node -v
```

The system should display the Node.js version installed on your system. You can do the same for NPM:

```
npm -v
```

### Installation and building

To install TODO List App all dependencies, you can use the following command within your terminal.

```
npm install
```

To build the generate a dist folder with transpiled code run `npm run build` 

### Run the application

Start the development server by running the following command:

```
npm run dev
```

Once your server is up and running, load the following URL on your browser: `http://localhost:3000/`
