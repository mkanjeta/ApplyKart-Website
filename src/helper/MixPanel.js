import mixpanel from "mixpanel-browser";
mixpanel.init("ecbabb456518d3eb71107b2bb6b2a2f5");
let actions = {
  // identify: (id) => {
  //   if (env_check) mixpanel.identify(id);
  // },
  // alias: (id) => {
  //   if (env_check) mixpanel.alias(id);
  // },
  track: (message, props = null) => {
    if (props) {
      mixpanel.track(message, props);
    } else {
      mixpanel.track(message);
    }
  },
};
export let Mixpanel = actions;
