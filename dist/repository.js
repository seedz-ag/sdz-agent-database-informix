"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor(connector) {
        this.connector = connector;
    }
    async getClients(pagination) {
        try {
            return this.connector.execute("clients");
        }
        catch (e) { }
    }
    async getInvoices(pagination) {
        try {
            return this.connector.execute("invoices");
        }
        catch (e) { }
    }
}
exports.default = Repository;
