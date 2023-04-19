import { MTEvent } from "../types";
import { MultiToolClient } from "../classes/MultiToolClient";
export const event: MTEvent<"ready"> = {
    name: "ready",
    once: true,
    run: async (client: MultiToolClient<true>) => {
        console.log(`Logged in as ${client.user.tag}!`);
    },
};
