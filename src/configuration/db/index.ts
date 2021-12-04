import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO = process.env.MONGO || '';
mongoose.connect(MONGO, {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log('Conectado a la base de datos');
    }
})

export default mongoose;