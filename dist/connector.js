"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const informixdb_1 = __importDefault(require("informixdb"));
let informixConnect;
class Connector {
    constructor(config) {
        this.dsn = `SERVER=${config.server};DATABASE=${config.schema};HOST=${config.host};SERVICE=${config.port};UID=${config.username};PWD=${config.password};CLIENT_LOCALE=${config.locale}`;
    }
    connect() {
        if (!informixConnect) {
            try {
                informixConnect = informixdb_1.default.openSync(this.dsn);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    close() {
        if (informixConnect) {
            try {
                informixConnect.closeSync();
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async execute(query) {
        let resultSet = [];
        if (!informixConnect) {
            this.connect();
        }
        try {
            resultSet = informixConnect.querySync(query);
            return resultSet;
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = Connector;
