import { MTEvent } from "../types";
export const event: MTEvent<"messageCreate"> = {
    name: "messageCreate",
    once: false,
    async run(client, message) {
        const fisher = client.fisher;
        if (fisher.enable() && fisher.isMessageFromBot(message)) {
            const data = fisher.parseData(message);
            if (fisher.idle) return;
            if (!data?.baitName) {
                fisher.idle = true;
                await fisher.sendSlash("shop bait");
            }
        }
    },
};
