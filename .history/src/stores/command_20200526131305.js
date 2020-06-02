import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: ""
    },
    mutations: {

    },
    getters: {},
    actions: {
        update(commandBox) {
            commandBox = 1;
        }
    }
})