import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: "",
        idUser: null
    },
    mutations: {
        update(state) {
            axios
                .get("/api/users/2313")
                .then(response => {
                    for (const progressCommand in response.data.Commandes) {
                        if (response.data.Commandes[progressCommand].state == 0) {
                            state.commandBox = response.data.Commandes[progressCommand];
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getUserInformations(state) {

        }
    },
    getters: {},
    actions: {

    }
})