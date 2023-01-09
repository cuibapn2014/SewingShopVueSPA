import { createStore, storeKey } from "vuex";
import { config } from "./modules/config.module";
import { account } from "./modules/account.module";
const store = createStore({
    modules:{
        account: account,
        config: config
    }
});

export default store