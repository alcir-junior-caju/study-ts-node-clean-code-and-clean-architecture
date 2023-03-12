import GetProducts from "../../../src/project/application/usecase/GetProducts";
import PgPromise from "../../../src/project/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../../src/project/infra/repository/ProductRepositoryDatabase";

test('Deve listar os produtos', async function () {
    const connection = new PgPromise();
    const productRepository = new ProductRepositoryDatabase(connection);
    const getProducts = new GetProducts(productRepository);
    const output = await getProducts.execute();
    expect(output).toHaveLength(3);
    await connection.close();
});
