import Checkout from "../../application/usecase/Checkout";
import CLIHandler from "./CLIHandler";

type Input = {
    cpf: string;
    items: Array<{
        idProduct: number;
        quantity: number;
    }>;
}

export default class {
    constructor (
        readonly handler: CLIHandler,
        readonly checkout: Checkout
    ) {
        const input: Input = {
            cpf: "",
            items: []
        };

        handler.on("set-cpf", function (params: any) {
            input.cpf = params;
        });
        handler.on("add-item", function (params: any) {
            const [idProduct, quantity] = params.split(" ");
            input.items.push({
                idProduct: parseInt(idProduct),
                quantity: parseInt(quantity)
            });
        });
        handler.on("checkout", async function (params: any) {
            try {
                const output = await checkout.execute(input);
                handler.write(JSON.stringify(output));
            } catch (error: any) {
                handler.write(error.message);
            }
        });
    }
}
