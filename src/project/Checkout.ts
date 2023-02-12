import CouponRepository from "./CouponRepository";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import CurrencyGateway from "./CurrencyGateway";
import CurrencyGatewayHttp from "./CurrencyGatewayHttp";
import FreightCalculator from "./FreightCalculator";
import ProductRepository from "./ProductRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import { validate } from "./validator";

type Input = {
    cpf: string;
    items: Array<{
        idProduct: number;
        quantity: number;
    }>;
    coupon?: string;
    from?: string;
    to?: string;
}

type Output = {
    total: number;
    freight: number;
}

const input: Input = {
    cpf: "",
    items: []
};

export default class Checkout {
    constructor (
        readonly currencyGateway: CurrencyGateway = new CurrencyGatewayHttp(),
        readonly productRepository: ProductRepository = new ProductRepositoryDatabase(),
        readonly couponRepository: CouponRepository = new CouponRepositoryDatabase()
    ) {}

    async execute (input: Input): Promise<Output> {
         const isValid = validate(input.cpf);
        if (!isValid) throw new Error("Invalid cpf");
        const output: Output = {
            total: 0,
            freight: 0
        };
        const currencies = await this.currencyGateway.getCurrencies();
        const items: number[] = [];
        if (input.items) {
            for (const item of input.items) {
                if (item.quantity <= 0) throw new Error("Invalid quantity");
                if (items.includes(item.idProduct)) throw new Error("Duplicated item");
                const productData = await this.productRepository.getProduct(item.idProduct);
                if (parseFloat(productData.weight) <= 0 || productData.height <= 0 || productData.length <= 0 || productData.width <= 0) throw new Error("Invalid dimension");
                if (productData.currency === "USD") {
                    output.total += parseFloat(productData.price) * item.quantity * currencies.usd;
                } else {
                    output.total += parseFloat(productData.price) * item.quantity;
                }
                // const volume = productData.width/100 * productData.height/100 * productData.length/100;
                // const density = parseFloat(productData.weight)/volume;
                // const itemFreight = 1000 * volume * (density/100);
                const itemFreight = FreightCalculator.calculate(productData)
                output.freight += Math.max(itemFreight, 10) * item.quantity;
                items.push(item.idProduct)
            }
        }
        if (input.coupon) {
            const couponData = await this.couponRepository.getCoupon(input.coupon);
            if (couponData.expire_date.getTime() > new Date().getTime()) {
                const percentage = parseFloat(couponData.percentage);
                output.total -= (output.total * percentage)/100;
            }
        }
        if (input.from && input.to) {
            output.total += output.freight;
        }
        return output;
    }
}
