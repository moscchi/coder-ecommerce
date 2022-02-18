import express, {Request, Response} from 'express';
import cors from "cors";
import routes from "../routes/index";
import path from "path";
import {routeError} from '../utils/errores'
import session from 'express-session';
import passport from 'passport';

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.get('/', (req: Request, res: Response) => res.send('Server del ecommerce andando!'));
server.use("/", express.static(path.resolve() + "/src/public"));
server.use(session({
    secret: "desafio",
    resave: false,
    saveUninitialized: false,
}))
server.use(passport.session());
server.use(passport.initialize());
server.use(routes)
server.use("/api", routes);
server.set("views", path.join(__dirname, '../public/views', 'ejs'));
server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname,'../public')));
server.use(routeError);


export default server;