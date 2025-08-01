import dotenv from 'dotenv';
import connectDB from './db/dbconnection.js';

dotenv.config({path: '../.env'});

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });// Start the server after successful DB connection
})
.catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1); // Exit the process with failure
});