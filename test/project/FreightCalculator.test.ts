import FreightCalculator from "../../src/project/FreightCalculator";

test('Deve calcular o frete do produto', () => {
    const product = {
        idProduct: 6,
        description: "A",
        price: 1000,
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
        currency: "USD"
    };
    const freight = FreightCalculator.calculate(product);
    expect(freight).toBe(30);
});
