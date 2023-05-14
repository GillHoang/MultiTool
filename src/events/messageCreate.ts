import { MTEvent } from "../types";
import fish from "../handlers/fish";
export const event: MTEvent<"messageCreate"> = {
    name: "messageCreate",
    once: false,
    async run(client, message) {
        if (message.author.id === client.user?.id) {
            if (message.content === "stop") {
                await client.destroy();
                process.exit(0);
            }
        }
        const fisher = client.fisher;
        if (fisher.enable() && fisher.isMessageFromBot(message)) {
            await fish(client, message, fisher);
        }
    },
};
