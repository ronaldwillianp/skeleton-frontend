import {boot} from "quasar/wrappers";
import {UserStore} from "stores/user-store";

export default boot(({router, store}) => {
  router.beforeEach((to, from, next) => {
    try {
      const user = UserStore(store).user;
    } catch {
      next();
      return;
    }
    next();
  });
})
