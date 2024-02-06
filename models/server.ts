import express, {Application} from 'express'
import router from '../routes/usuarios';
import categoryRouter from '../routes/category';

class Server {

    private app: Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';


        this.middlewares();


        this.routes();

        
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes() {

        this.app.use("/api", router);
        this.app.use("/api", categoryRouter);
    }




}

export default Server;