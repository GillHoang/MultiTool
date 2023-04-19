import { MTEvent } from "../types";
import { APIRequest } from 'discord.js-selfbot-v13';
import { MultiToolClient } from "../classes/MultiToolClient";
export const event: MTEvent<"apiRequest"> = {
    name: "apiRequest",
    once: false,
    async run(client: MultiToolClient<true>, request: APIRequest) {
        console.log(request);
    },
};
