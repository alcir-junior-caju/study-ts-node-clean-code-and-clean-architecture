import pgPromise from "pg-promise";
import ProductRepository from "./ProductRepository";

export default class ProductRepositoryDatabase implements ProductRepository {
    async getProduct (idProduct: number): Promise<any> {
        const connection = pgPromise()("postgres://default:secret@localhost:5432/branas");
        const [productData] = await connection.query("select * from cccat10.product where id_product = $1", [idProduct]);
        await connection.$pool.end();
        return productData;
    }
}
