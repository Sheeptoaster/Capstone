# For All The Marbles 
For All The Marbles is a clone of [Robinhood](https://robinhood.com/) where user's are able to invest in a pretend stock market.

## Getting Started
To get use this project you can view the application at the live site [Will Insert Site Link When Deployed] and create an account, or test it out using the demo user.

This application can also be downloaded locally and run by:
  1. Clone the repository with `git clone git@github.com:Sheeptoaster/Capstone.git` or `git clone https://github.com/Sheeptoaster/Capstone.git`
  2. `cd /python-project` and install the required dependencies with `pipenv install`
  3. `cd /react-app` and install required dependencies with `npm install`
  4. In the `/python-project` directory follow the format in the .env.example to create your own .env file.
  5. Create your user and database in PostgreSQL
  
    `psql -c "CREATE USER <username> WITH PASSWORD '<password>' CREATEDB"`
  
    `psql -c "CREATE DATABASE <databaseName> WITH OWNER <username>"`
  
  6. In the `/python-project` directory start the python virtual environment with `pipenv shell`
  7. In the virtual environment run the following
  
    `flask db upgrade`
  
    `flask db migrate`
  
    `flask db seed all`
  
    `flask run`
  
  8. `cd /react-app` and start the application with `npm start`
  
  ## Technologies Used
  JavaScript
  
  React
  
  Flask
  
  PostgreSQL
  
  CSS3
  
  SQLAlchemy
  
  ## Features
  
  [Will include screenshots]
