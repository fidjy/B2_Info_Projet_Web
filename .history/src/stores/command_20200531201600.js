import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        idUser: 0,
        rolesUser: [],
        commandUser: [],
        commandPrice: 0
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
                for (const i in state.commandUser) {
                    console.log(state.commandUser[i]['@id']);
                    console.log(plat['@id']);
                    if (state.commandUser[i]['@id'] == plat['@id']) {
                        state.commandUser.splice(i, 1);
                    }
                }
            } else {
                plat['number']--;
            }
        },
        calculPrice(state) {
            for (const plat in state.commandUser) {
                state.commandPrice += state.commandUser[plat]['price'] * state.commandUser[plat]['number'];
            }
        },
        update(state) {
            state.commandUser.push('changement en cours . . .');
            for (const i in state.commandUser) {
                if (state.commandUser[i] == 'changement en cours . . .') {
                    state.commandUser.splice(i, 1);
                }
            }
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
