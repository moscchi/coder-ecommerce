require('dotenv').config();
import server from "./server";
import './configuration/db';
import './auth/index';

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server listening at the port ${PORT}`);
}).on('error', (err) => console.log(err));
