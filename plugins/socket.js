import Vue from "vue";
import VueSocketIO from "vue-socket.io";

export default function({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: "https://chat-app-with-nuxt.herokuapp.com/",
      // "http://localhost:3000/"
      // process.env.BASE_URL
      //
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
      }
    })
  );
}
