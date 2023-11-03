# Super Parking Project
Super Parking is a responsive web application built using HTML5, SASS, React.js, Redux Toolkit with TypeScript, Node.js with Express.js, and PostgreSQL for database management. This project features JWT authentication, Axios for API communication, HTTP-only Cookies, React Router for navigation, and custom hooks to enhance the user experience. 
## Table of Contents
1. [Demo](#demo)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Database Access Configuration](#database-access-configuration)
   - [Running the Application](#running-the-application)
## Demo
Check out the live demo of Super Parking here: [Super Parking Demo](https://parkingbackstabslash.vercel.app/)

Watch a showcase of real-world interaction when connected to the database: [Demo Video](https://user-images.githubusercontent.com/71657988/227272160-9c8d3297-f68f-4470-8e86-05a2bf370700.mp4)
## Getting Started
### Prerequisites
Before you get started, ensure you have the following software installed on your system:
- [Node.js](https://nodejs.org/) - JavaScript runtime for the server.
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source relational database system.
### Installation
1. Clone the GitHub repository:
   ```bash
   git clone https://github.com/backstabslash/react-node-postgre-parking.git
2. Navigate to the project directory:
    ```bash
    cd react-node-postgre-parking
3. Import the schema dump into your PostgreSQL database:

   Sometimes database dump doesn't create user roles for the application, so you should do that before importing the dump. For instructions on creating user roles, see [Database Access Configuration](#database-access-configuration).
   
   ```bash
   psql -U your-username -d super_parking -a -f ./database-dump/db_schema
   ```
   The schema dump file provides the initial structure and tables required for the Super Parking application.
   
5. Install the dependencies for both the backend and frontend:
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
### Database Access Configuration
0. Creating User Roles:

      To create the necessary user roles, you'll need superuser privileges or an existing user with sufficient privileges. Use the following SQL commands to create user roles:
   
      ```sql
      create role connect_user with login password 'your-password';
      create role client with login password 'your-password';
      create role administrator with login password 'your-password';
      ```
      
      By creating these user roles, you ensure that the application functions as expected with the schema dump. This step is essential, especially if the dump does not include user groups.
      
1. Database Configuration:
   
     You can customize the database connection by modifying the `db-config.js` file. By default, the application uses the `connect_user` role and the database name `super_parking`. Here's how to configure it:
      - Open the `db-config.js` file in your project.
      - You'll find a function called `dynamicPool`, which takes an optional `role` parameter. This role is used to specify the PostgreSQL user for the database connection.
      - Modify the `user`, `password`, `host`, `port`, and `database` properties in the `Pool` object according to your database configuration. You can change the `role` parameter to set the desired role for the connection.
    
2. Environment Variables:

     Super-Parking uses environment variables to store sensitive information like access tokens, passwords, and salts. You can define these variables in a `.env` file. Make sure to set up this file and populate it with the required values:
      - Create a `.env` file in your project's backend directory if it doesn't already exist.
      - Add the necessary environment variables, including `SALT`, `ACCESS_TOKEN_SALT`, `REFRESH_TOKEN_SALT`, `administrator_pass`, `client_pass`, and `connect_user_pass`.
### Running the Application
To run the Super Parking application, follow these steps:
1. Start the backend server (Node.js with Express.js):
    ```bash
    cd backend
    npm start
    ```
    The backend will run on http://localhost:3001.
    
2. Start the frontend development server (React.js):
    ```bash
    cd frontend
    npm start
    ```
    The frontend will run on http://localhost:3000 so you will be able to access the application in your web browser there.
