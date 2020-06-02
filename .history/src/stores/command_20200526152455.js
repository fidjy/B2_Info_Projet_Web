import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: ""
    },
    mutations: {
        update(state) {
            axios
                .get("/api/users/2313")
                .then(response => {
                    for (const progressCommand in response.data.Commandes) {
                        if (response.data.Commandes[progressCommand].state == 0) {
                            state.commandBox = response.data.Commandes[progressCommand];
                            console.log(state.commandBox);
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