import { ClientEvents } from "discord.js-selfbot-v13";
import { MultiToolClient } from "../classes/MultiToolClient";

export interface MTEvent<T extends keyof ClientEvents> {
    name: T;
    once: boolean;
    run: (client: MultiToolClient, ...args: ClientEvents[T]) => Promise<void>;
}
