import { Base } from "./Base";
import { MultiToolClient } from "./MultiToolClient";

export class Fisher extends Base {
    constructor(public client: MultiToolClient) {
        super(client);
    }

    async start() {
        console.log("[VF] Fisher started");

    }
}
