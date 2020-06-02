import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {},
    mutations: {
        axios
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
            for (const progressCommand in response.data.Commandes) {
                if (response.data.Commandes[progressCommand].state == 0) {
                    this.commandBox = response.data.Commandes[progressCommand];
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    getters: {},
    actions: {}
})