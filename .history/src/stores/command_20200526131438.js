import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: ""
    },
    mutations: {
        update(commandBox) {
            commandBox = 1;
        }
    },
    getters: {},
    actions: {

    }
})