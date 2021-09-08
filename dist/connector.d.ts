import { ConnectorInterface, ConfigDatabaseInterface, DatabaseRow } from "sdz-agent-types";
export default class Connector implements ConnectorInterface {
    private dsn;
    constructor(config: ConfigDatabaseInterface);
    connect(): void;
    close(): void;
    execute(query: string): Promise<DatabaseRow[]>;
}
