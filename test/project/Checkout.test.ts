import sinon from "sinon";
import Checkout from "../../src/project/Checkout";
import CouponRepositoryDatabase from "../../src/project/CouponRepositoryDatabase";
import CurrencyGateway from "../../src/project/CurrencyGateway";
import CurrencyGatewayHttp from "../../src/project/CurrencyGatewayHttp";
import ProductRepository from "../../src/project/ProductRepository";
import ProductRepositoryDatabase from "../../src/project/ProductRepositoryDatabase";

let checkout: Checkout;

beforeEach(function () {
	checkout = new Checkout();
});

test("Não deve aceitar um pedido com cpf inválido", async function () {
	const input = {
		cpf: "406.302.170-27",
		items: []
	};
	expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido vazio", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: []
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(0);
});

test("Deve criar um pedido com 3 produtos", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6090);
});

test("Deve criar um pedido com 3 produtos com cupom de desconto", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE20"
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(4872);
});

test("Deve criar um pedido com 3 produtos com cupom de desconto expirado", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE10"
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6090);
});

test("Não deve criar um pedido com quantidade negativa", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: -1 }
		],
	};
	expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid quantity"));
});

test("Não deve criar um pedido com item duplicado", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 1, quantity: 1 }
		],
	};
	expect(() => checkout.execute(input)).rejects.toThrow(new Error("Duplicated item"));
});

test("Deve criar um pedido com 1 produto calculando o frete", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 3 }
		],
		from: "22060030",
		to: "88015600"
	};
	const output = await checkout.execute(input);
	expect(output.freight).toBe(90);
	expect(output.total).toBe(3090);
});

test("Não deve criar um pedido se o produto tiver alguma dimensão negativa", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 4, quantity: 1 }
		],
	};
	expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid dimension"));
});

test("Deve criar um pedido com 1 produto calculando o frete com valor mínimo", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 3, quantity: 1 }
		],
		from: "22060030",
		to: "88015600"
	};
	const output = await checkout.execute(input);
	expect(output.freight).toBe(10);
	expect(output.total).toBe(40);
});

test("Deve criar um pedido com 1 produto em USD usando Stubs", async function () {
	const stubCurrencyGateway = sinon.stub(CurrencyGatewayHttp.prototype, "getCurrencies").resolves({
		usd: 3
	});
	const stubProductRepository = sinon.stub(ProductRepositoryDatabase.prototype, "getProduct").resolves({
		idProduct: 6,
		description: "A",
		price: 1000,
		width: 10,
		height: 10,
		length: 10,
		weight: 10,
		currency: "USD"
	});
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 6, quantity: 1 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(3000);
	stubCurrencyGateway.restore();
	stubProductRepository.restore();
});

test("Deve criar um pedido com 3 produtos com cupom de desconto com Spy", async function () {
	const spyProductRepository = sinon.spy(ProductRepositoryDatabase.prototype, "getProduct");
	const spyCouponRepository = sinon.spy(CouponRepositoryDatabase.prototype, "getCoupon");
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE20"
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(4872);
	expect(spyProductRepository.calledThrice).toBeTruthy();
	expect(spyCouponRepository.calledOnce).toBeTruthy();
	expect(spyCouponRepository.calledWith("VALE20")).toBeTruthy();
	spyCouponRepository.restore();
	spyProductRepository.restore();
});

test("Deve criar um pedido com 1 produto em USD usando Mock", async function () {
	const mockCurrencyGateway = sinon.mock(CurrencyGatewayHttp.prototype);
	mockCurrencyGateway.expects("getCurrencies").once().resolves({
		usd: 3
	});
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 5, quantity: 1 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(3000);
	mockCurrencyGateway.verify();
	mockCurrencyGateway.restore();
});

test("Deve criar um pedido com 1 produto em USD usando Fakes", async function () {
	const currencyGateway: CurrencyGateway = {
		async getCurrencies (): Promise<any> {
			return { usd: 3 }
		}
	};
	const productRepository: ProductRepository = {
		async getProduct (idProduct: number): Promise<any> {
			return {
				idProduct: 6,
				description: "A",
				price: 1000,
				width: 10,
				height: 10,
				length: 10,
				weight: 10,
				currency: "USD"
			}
		}
	};
	checkout = new Checkout(currencyGateway, productRepository);
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 6, quantity: 1 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(3000);
});
