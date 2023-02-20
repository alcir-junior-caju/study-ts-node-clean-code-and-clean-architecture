import Checkout from "./application/usecase/Checkout";

type Input = {
    cpf: string;
    items: Array<{
        idProduct: number;
        quantity: number;
    }>;
}

const input: Input = {
    cpf: "",
    items: []
};

process.stdin.on("data", async function (chunk) {
    const command = chunk.toString().replace(/\n/g, "");
    if (command.startsWith("set-cpf")) {
        input.cpf = command.replace("set-cpf ", "");
    }
    if (command.startsWith("add-item")) {
        const [idProduct, quantity] = command.replace("add-item ", "").split(" ");
        input.items.push({
            idProduct: parseInt(idProduct),
            quantity: parseInt(quantity)
        });
    }
    if (command.startsWith("checkout")) {
        try {
            const checkout = new Checkout();
            const output = await checkout.execute(input);
            console.info(output);
        } catch (error: any) {
            console.error(error.message);
        }
    }
});
