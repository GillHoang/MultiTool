import { Client } from "discord.js-selfbot-v13";
import { config } from "../utils/constants";
import fs from "fs";
import path from "path";

export class MultiToolClient<
    Ready extends boolean = boolean
> extends Client<Ready> {
    public config = config;
    constructor() {
        super({
            checkUpdate: false,
        });
    }

    public async start() {
        await this.loadEvents();
        await this.login(process.env.TOKEN).catch(console.error);
    }

    public async loadEvents() {
        const files = await fs.promises.readdir(
            path.join(__dirname, "..", "events"),
        );
        for (const file of files) {
            const { event } = await import(
                path.join(__dirname, "..", "events", file)
            );
            this.on(file.split(".")[0], event.run.bind(null, this));
        }
    }
}
