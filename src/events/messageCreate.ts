import { MTEvent } from "../types";
export const event: MTEvent<"messageCreate"> = {
    name: "messageCreate",
    once: false,
    async run(client, message) {
        const fisher = client.fisher;
        if (fisher.enable() && fisher.isMessageFromBot(message)) {
            const data = fisher.parseData(message);
            if (data?.inv?.isInv && !data.inv.baitName) {
                if (fisher.idle) return;
                fisher.idle = true;
                await fisher.sendSlash("shop bait");
            }
            if (data?.baitShop?.isShop) {
                console.log(data.baitShop.data);
            }
            fisher.idle = false;
        }
    },
};
