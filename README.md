# ms-products

### Dependencies to run the project
- Have Node installed, preferably version 19
- Have package manager installed like npm or yarn
- Have Docker or a Postgres database or another SQL database supported by Sequelize
- Have the Serverless framework installed globally “npm install -g Serverless”

### How to run the project
To clone this repository:
```
git clone https://github.com/Forest-Foundation-Integrated-Project/ms-products.git 
```
In your terminal navigate to the project directory and run the command `yarn` if you have yarn installed or `npm install`.

Rename the **".env.example"** file to **".env"** and fill in the variables with your database information if you have it installed on your machine or with the information you prefer if you have Docker installed.
> Note: host and port must match your bank's default data.

If you have docker installed, with the .env file duly completed, run the command `docker compose up -d` to upload an instance of PostgreSQL.

Run the command `npx sequelize-cli db:migrate` to run the migrations that will create the tables and their relationships in the database.


#### Run the `serverless offline` command to start the project.
> Note: if the error "serverless is not recognized as an internal command" occurs, try to start the project with the command `npx serverless offline`.
