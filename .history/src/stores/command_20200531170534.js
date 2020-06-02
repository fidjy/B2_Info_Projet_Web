import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: "",
        idUser: 0,
        rolesUser: [],
        commandUser: []
    },
    mutations: {
        addtocommand(state, plat) {
            state.commandUser.push(plat);
        },
        removetocommand(state, plat) {
            for (const i in state.commandUser) {
                if (state.commandUser[i]['@id'] == plat['@id']) {
                    state.commandUser.splice(i, 1);
                }
            }
        },
        update(state) {
            axios
                .get("/api/users/" + state.idUser)
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
        getUserId(state, id) {
            state.idUser = id;
        },
        getUserRoles(state, roles) {
            state.rolesUser = roles;
        },
        setUserToNull(state) {
            state.idUser = 0;
            state.rolesUser = [];
        }
    },
    getters: {},
    actions: {}
})
