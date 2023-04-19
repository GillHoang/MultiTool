import { MultiToolClient } from "./MultiToolClient";

export abstract class Base {
    constructor(public client: MultiToolClient) {}
}