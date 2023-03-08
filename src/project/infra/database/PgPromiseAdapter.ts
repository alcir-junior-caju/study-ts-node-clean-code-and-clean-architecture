import pgPromise from "pg-promise";
import Connection from "./Connection";

export default  class PgPromise implements Connection {
    connection: any;

    constructor () {
        this.connection = pgPromise()("postgres://default:secret@localhost:5432/branas");
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }
    async close(): Promise<void> {
        await this.connection.$pool.end();
    }

}
