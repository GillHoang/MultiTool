import { Base } from "./Base";
import { MultiToolClient } from "./MultiToolClient";

export class Fisher extends Base {
    private guildID: string;
    private channelID: string;
    private botID = "574652751745777665";
    constructor(public client: MultiToolClient) {
        super(client);
        this.guildID = this.client.config.fisher.guildID;
        this.channelID = this.client.config.fisher.channelID;
    }

    async start() {
        console.log("[VF] Fisher started");
        await this.sendSlash("play");
    }

    async sendSlash(command: string, ...args: any) {
        return await this.client.sendSlash(
            this.guildID,
            this.channelID,
            this.botID,
            command,
            ...args,
        );
    }
}
