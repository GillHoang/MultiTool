import { MTEvent } from "../types";
export const event: MTEvent<"messageCreate"> = {
    name: "messageCreate",
    once: false,
    async run(client, message) {
        const fisher = client.fisher;
        if (fisher.enable() && fisher.isMessageFromBot(message)) {
            const data = fisher.parseData(message);
            if (data?.inv?.isInv && !data.inv.baitName) {
                return await fisher.sendSlash("shop bait");
            } else if (data?.baitShop?.isShop) {
                let maxItemCanBuy = 10;
                const price = data.baitShop.data.at(-1)!.price;
                const balance = data.baitShop.balance;
                const priceNumber = Number(price.replace(/,/g, ""));
                const balanceNumber = Number(balance?.replace(/,/g, "") ?? 1);

                if (priceNumber * maxItemCanBuy > balanceNumber) {
                    maxItemCanBuy = Math.floor(balanceNumber / priceNumber);
                }
                maxItemCanBuy =
                    maxItemCanBuy === 0
                        ? 1
                        : maxItemCanBuy > 10
                            ? 10
                            : maxItemCanBuy;
                if (maxItemCanBuy > 0) {
                    if (priceNumber * maxItemCanBuy > balanceNumber) {
                        return await fisher.sendSlash("fish");
                    }
                    await fisher.sendSlash(
                        "buy",
                        `${data.baitShop.data.at(-1)?.name}`,
                        `${maxItemCanBuy}`
                    );
                }
            } else {
                return await fisher.sendSlash("fish");
            }
        }
    },
};
