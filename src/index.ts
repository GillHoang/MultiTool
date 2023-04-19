import { config } from "dotenv";
// Load environment variables from .env file, where API keys and passwords are configured
config();

import("./classes/MultiToolClient").then((cls) => {
    new cls.MultiToolClient().start();
});
