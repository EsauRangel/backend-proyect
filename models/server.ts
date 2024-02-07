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
        //Start the server
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }

    middlewares(){
        //used middlewares
        this.app.use(express.json());
    }

    routes() {
        //API routes
        this.app.use("/api/v1", router);
        this.app.use("/api/v1", categoryRouter);
    }




}

export default Server;