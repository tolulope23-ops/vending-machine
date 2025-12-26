import app from './app';
import {PORT} from './config/env.config';
import connectDB from './database/connect.db' 

//Calls database for connection status
connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening at Port ${PORT}...`);
    
});