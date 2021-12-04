import express, {Request, Response} from 'express';
import cors from "cors";
import routes from "../routes/index";
import path from "path";

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.get('/', (req: Request, res: Response) => res.send('Server del ecommerce andando!'));
server.use("/", express.static(path.resolve() + "/src/public"));
server.use("/api", routes);


export default server;