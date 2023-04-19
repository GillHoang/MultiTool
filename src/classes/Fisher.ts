import { Base } from "./Base";
import { MultiToolClient } from "./MultiToolClient";

export class Fisher extends Base {
    constructor(client: MultiToolClient) {
        super(client);
    }

    start() {
        console.log("[Fisher] Started");
    }
}
