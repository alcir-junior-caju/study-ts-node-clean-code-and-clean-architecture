import Checkout from "../../../src/project/application/usecase/Checkout";
import AxiosAdapter from "../../../src/project/infra/http/AxiosAdapter";
import CLIController from "../../../src/project/infra/cli/CLIController";
import CLIHandler from "../../../src/project/infra/cli/CLIHandler";
import CouponRepositoryDatabase from "../../../src/project/infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "../../../src/project/infra/gateway/CurrencyGatewayHttp";
import OrderRepositoryDatabase from "../../../src/project/infra/repository/OrderRepositoryDatabase";
import PgPromise from "../../../src/project/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../../src/project/infra/repository/ProductRepositoryDatabase";

test('Deve testar o CLI', async () => {
    const connection = new PgPromise();
    const httpClient = new AxiosAdapter();
    const currencyGateway = new CurrencyGatewayHttp(httpClient);
    const productRepository = new ProductRepositoryDatabase(connection);
    const couponRepository = new CouponRepositoryDatabase(connection);
    const orderRepository = new OrderRepositoryDatabase(connection);
    const checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
    let output: any;
    const handler = new class extends CLIHandler {
        write(text: string): void {
            output = JSON.parse(text);
        }
    };
    new CLIController(handler, checkout);
    handler.type("set-cpf 407.302.170-27");
    handler.type("add-item 1 1");
    handler.type("add-item 2 1");
    handler.type("add-item 3 3");
    handler.type("checkout");
    await handler.type("checkout");
    expect(output.total).toBe(6090);
    expect(output.freight).toBe(280);
    await connection.close;
});
