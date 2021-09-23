import fs from "fs";
import {
  Connector,
  DatabaseRow,
  PaginationInterface,
  RepositoryInterface,
} from "sdz-agent-types";

let query: string = "";

export default class Repository implements RepositoryInterface {
  private connector: Connector;
  constructor(connector: Connector) {
    this.connector = connector;
  }
  //Test
  async getTest(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("test");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  async countTest(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("test");

      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  //Client
  async getClients(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  async countClients(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  //Address
  async getAddress(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("address");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  async countAddress(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("address");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  //Property
  async countProperties(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("properties");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getProperties(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("properties");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Item
  async countItems(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("items");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getItems(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("items");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Item Branding
  async countItemsBranding(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("itemsbranding");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getItemsBranding(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("itemsbranding");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Item Group
  async countItemsGroup(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("itemsgroup");
      let count = `SELECT count (*) as total from (${query})`;

      return this.connector.execute(count);
    } catch (e) {}
  }
  async getItemsGroup(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("itemsgroup");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Request Orders
  async getOrders(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  async countOrders(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  //Request Orders Item
  async countOrdersItem(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("ordersitem");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getOrdersItem(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("ordersitem");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Invoices
  async countInvoices(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("invoices");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getInvoices(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("invoices");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Invoices Item
  async getInvoicesItem(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  async countInvoicesItem(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  //Payment Type
  async countPaymentsType(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("paymentstype");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getPaymentsType(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("paymentstype");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Provider
  async countProviders(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("providers");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getProviders(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("providers");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Account Pay
  async getAccountsPay(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  async countAccountsPay(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  //Account Receivable
  async getAccountsReceivable(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  async countAccountsReceivable(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
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
    } catch (e) {}
  }
  //Vendor
  async countVendors(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("vendors");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getVendors(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("vendors");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Employee
  async countEmployees(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("employees");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getEmployees(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("employees");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  //Inventory
  async countInventories(
    pagination?: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      query = await this.loadFile("inventories");
      let count = `SELECT count (*) as total from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getInventories(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.loadFile("inventories");

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }

  async loadFile(file: string): Promise<string> {
    return fs
      .readFileSync(`${__dirname}/../../config/sql/${file}.stub`)
      .toString();
  }
}
