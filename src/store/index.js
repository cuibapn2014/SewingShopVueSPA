import { createStore, storeKey } from "vuex";
import { config } from "./modules/config.module";
import { account } from "./modules/account.module";
import { metadata } from "./modules/metadata.module";
const store = createStore({
    modules:{
        account: account,
        metadata: metadata,
        config: config
    }
});

export default store