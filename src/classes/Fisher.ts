import { Message } from "discord.js-selfbot-v13";
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
            ...args
        );
    }

    enable() {
        return this.client.config.fisher.enabled;
    }

    isMessageFromBot(message: Message) {
        if (message.guildId !== this.guildID) return false;
        if (message.channelId !== this.channelID) return false;
        if (message.interaction?.user.id !== this.client.user?.id) return false;
        return message.author.id === this.botID;
    }

    parseData(message: Message) {
        const embed = message.embeds[0];
        const data: {
            inv?: {
                isInv?: boolean;
                balance?: string;
                rod?: string;
                biome?: string;
                fishValue?: string;
                baitName?: string;
                baitRemain?: string;
            };
            baitShop?: {
                isShop?: boolean;
                data: {
                    name: string;
                    price: string;
                    desc: string;
                }[];
            };
        } = {};
        if (!embed) return;
        const description = embed.description;
        if (!description) return;
        if (embed.title?.includes("Inventory of")) {
            data.inv = {
                isInv: true,
                balance: description.match(/Balance: \*\*\$(\d+)\*\*/)?.[1],
                rod: description.match(
                    /Currently using <:.+?:\d+> \*\*(.+)\*\*/
                )?.[1],
                biome: description.match(
                    /Current biome: <:.+?:\d+> \*\*(.+)\*\*/
                )?.[1],
                fishValue: description.match(
                    /Fish Value: \$\*\*(\d+)\*\*/
                )?.[1],
                baitName: description.match(
                    /Bait: <:.+?:\d+> \*\*(.+)\*\*/
                )?.[1],
                baitRemain: description.match(
                    /Bait: <:.+?:\d+> \*\*(.+)\*\* \((\d+)\)/
                )?.[2],
            };
        }
        if (
            embed.title?.includes(
                "Bait is consumed **PER CAST** so make sure to stock up."
            )
        ) {
            const listbait = description.match(
                /<:.+?:\d+> \*\*(.+)\*\* - \$(\d+) - (.+)/g
            );
            data.baitShop = { isShop: true, data: [] };
            if (listbait) {
                for (const bait of listbait) {
                    const [, name, price, desc] = bait.match(
                        /<:.+?:\d+> \*\*(.+)\*\* - \$(\d+) - (.+)/
                    )!;
                    data?.baitShop?.data?.push({ name, price, desc });
                }
            } else {
                data.baitShop?.data && (data.baitShop.data = []);
            }
        }
        return data;
    }
}
