import OrderRepository from "../../OrderRepository";
import OrderRepositoryDatabase from "../../OrderRepositoryDatabase";

type Output = {
    code: string;
    total: number;
    freight: number;
}

export default class GetOrder {
    constructor (
        readonly orderRepository: OrderRepository = new OrderRepositoryDatabase()
    ) {}

    async execute (id: string): Promise<Output> {
        const order = await this.orderRepository.getById(id);
        const output: Output = {
            code: order.getCode(),
            total: order.getTotal(),
            freight: order.freight
        };
        return output;
    }
}
