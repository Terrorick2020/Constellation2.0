import { instances } from "./instances";
import web from "./web";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  return {
    provide: {
      api: {
        web: () => web(config, instances.web),
      },
    },
  };
});
