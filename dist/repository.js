"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let query = "";
class Repository {
    constructor(connector) {
        this.connector = connector;
    }
    //Test
    async getTests(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("tests");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    async countTests(pagination, type) {
        try {
            query = await this.loadFile("tests");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    //Client
    async getClients(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            switch (type) {
                case "T":
                    query = await this.loadFile("clientstotal");
                    break;
                default:
                    query = await this.loadFile("clientspartial");
            }
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    async countClients(pagination, type) {
        try {
            switch (type) {
                case "T":
                    query = await this.loadFile("clientstotal");
                    break;
                default:
                    query = await this.loadFile("clientspartial");
            }
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    //Address
    async getAddress(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("address");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    async countAddress(pagination, type) {
        try {
            query = await this.loadFile("address");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    //Property
    async countProperties(pagination, type) {
        try {
            query = await this.loadFile("properties");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getProperties(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("properties");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Item
    async countItems(pagination, type) {
        try {
            query = await this.loadFile("items");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getItems(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("items");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Item Branding
    async countItemsBranding(pagination, type) {
        try {
            query = await this.loadFile("itemsbranding");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getItemsBranding(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("itemsbranding");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Item Group
    async countItemsGroup(pagination, type) {
        try {
            query = await this.loadFile("itemsgroup");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getItemsGroup(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("itemsgroup");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Request Orders
    async getOrders(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            switch (type) {
                case "T":
                    query = await this.loadFile("orderstotal");
                    break;
                default:
                    query = await this.loadFile("orderspartial");
            }
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    async countOrders(pagination, type) {
        try {
            switch (type) {
                case "T":
                    query = await this.loadFile("orderstotal");
                    break;
                default:
                    query = await this.loadFile("orderspartial");
            }
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    //Request Orders Item
    async countOrdersItem(pagination, type) {
        try {
            query = await this.loadFile("ordersitem");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getOrdersItem(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("ordersitem");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Invoices
    async countInvoices(pagination, type) {
        try {
            query = await this.loadFile("invoices");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getInvoices(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("invoices");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Invoices Item
    async getInvoicesItem(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            switch (type) {
                case "T":
                    query = await this.loadFile("invoicesitemtotal");
                    break;
                default:
                    query = await this.loadFile("invoicesitempartial");
            }
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    async countInvoicesItem(pagination, type) {
        try {
            switch (type) {
                case "T":
                    query = await this.loadFile("invoicesitemtotal");
                    break;
                default:
                    query = await this.loadFile("invoicesitempartial");
            }
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    //Payment Type
    async countPaymentsType(pagination, type) {
        try {
            query = await this.loadFile("paymentstype");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getPaymentsType(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("paymentstype");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Provider
    async countProviders(pagination, type) {
        try {
            query = await this.loadFile("providers");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getProviders(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("providers");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Account Pay
    async getAccountsPay(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            switch (type) {
                case "T":
                    query = await this.loadFile("accountspaytotal");
                    break;
                default:
                    query = await this.loadFile("accountspaypartial");
            }
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    async countAccountsPay(pagination, type) {
        try {
            switch (type) {
                case "T":
                    query = await this.loadFile("accountspaytotal");
                    break;
                default:
                    query = await this.loadFile("accountspaypartial");
            }
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    //Account Receivable
    async getAccountsReceivable(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            switch (type) {
                case "T":
                    query = await this.loadFile("accountsreceivabletotal");
                    break;
                default:
                    query = await this.loadFile("accountsreceivablepartial");
            }
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    async countAccountsReceivable(pagination, type) {
        try {
            switch (type) {
                case "T":
                    query = await this.loadFile("accountsreceivabletotal");
                    break;
                default:
                    query = await this.loadFile("accountsreceivablepartial");
            }
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    //Vendor
    async countVendors(pagination, type) {
        try {
            query = await this.loadFile("vendors");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getVendors(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("vendors");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Employee
    async countEmployees(pagination, type) {
        try {
            query = await this.loadFile("employees");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getEmployees(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("employees");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    //Inventory
    async countInventories(pagination, type) {
        try {
            query = await this.loadFile("inventories");
            let count = `SELECT count (*) as total from (${query})`;
            return this.connector.execute(count);
        }
        catch (e) { }
    }
    async getInventories(pagination, type) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            query = await this.loadFile("inventories");
            return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
        }
        catch (e) { }
    }
    async loadFile(file) {
        return fs_1.default
            .readFileSync(`${__dirname}/../../config/sql/${file}.sql`)
            .toString();
    }
}
exports.default = Repository;
