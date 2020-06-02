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
            if (plat['number'] == undefined) {
                plat['number'] = 1;
            } else {
                plat['number']++;
            }

            let exist = false;
            for (const i in state.commandUser) {
                if (state.commandUser[i]['@id'] == plat['@id']) {
                    exist = true;
                }
            }
            if (exist == false) {
                state.commandUser.push(plat);
            }
        },
        removetocommand(state, plat) {
            if (plat['number'] == 1) {
                plat['number'] = undefined;
            } else {
                plat['number']++;
            }

            for (const i in state.commandUser) {
                console.log(i);
                if (state.commandUser[i]['@id'] == plat['@id']) {
                    state.commandUser.splice(i, 1);
                }
            }
        },
        update(state) {
            state.commandUser;
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
