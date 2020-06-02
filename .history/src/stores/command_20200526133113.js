import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: 0
    },
    mutations: {
        update(state, commandBox) {
            state.commandBox = 1;
        }
    },
    getters: {},
    actions: {

    }
})