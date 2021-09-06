"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor(connector) {
        this.connector = connector;
    }
    async getClients(pagination) {
        try {
            return this.connector.execute("clients", pagination);
        }
        catch (e) { }
    }
    async getInvoices(pagination) {
        try {
            return this.connector.execute("invoices", pagination);
        }
        catch (e) { }
    }
}
exports.default = Repository;
