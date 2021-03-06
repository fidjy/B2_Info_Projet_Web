import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: "",
        idUser: 0,
        rolesUser: [],
        logState: false
    },
    mutations: {
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
        getLogState(state, log) {
            state.logState = log;
        },
        getUserMail(state, mail) {
            state.mailUser = mail;
        },
        getUserPassword(state, password) {
            state.passwordUser = password;
        },
        setRoleNull(state) {
            state.adminAccess = false
        },
        setUserToNull(state) {
            state.idUser = 0;
            state.rolesUser = [];
        }
    },
    getters: {},
    actions: {}
})