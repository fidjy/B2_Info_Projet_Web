import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: ""
    },
    mutations: {
        update(state) {
            console.log(this.$cookies.get("idUser"));
            axios
                .get("/api/users/" + this.$cookies.get("idUser"))
                .then(response => {
                    for (const progressCommand in response.data.Commandes) {
                        if (response.data.Commandes[progressCommand].state == 0) {
                            state.commandBox = response.data.Commandes[progressCommand];
                            console.log("yoooooo");
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

    },
    getters: {},
    actions: {

    }
})