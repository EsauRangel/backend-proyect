"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const category_1 = __importDefault(require("../routes/category"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
    }
    listen() {
        //Start the server
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }
    middlewares() {
        //used middlewares
        this.app.use(express_1.default.json());
    }
    routes() {
        //API routes
        this.app.use("/api/v1", usuarios_1.default);
        this.app.use("/api/v1", category_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map