import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
    state: {
        commandBox: "",
        idUser: 0,
        rolesUser: [],
        logState: false,
        mailUser: "",
        passwordUser: ""
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
        setUserToNull(state) {
            state.idUser = 0;
            state.rolesUser = [];
        },
        async checkRole(state, actualRole) {
            let adminState = false;
            if (state.logState != "true") {
                return false;
            }
            if (state.logState == "true") {
                await axios
                    .post("/api/login_check", {
                        username: state.mailUser,
                        password: state.passwordUser
                    })
                    .then(response => {
                        axios.defaults.headers.common = {
                            Authorization: `bearer ${response.data.token}`
                        };
                        state.rolesUser = response.data.data['roles'];
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                for (const role in state.rolesUser) {
                    if (state.rolesUser[role] == actualRole) {
                        console.log('true');
                        return true;
                    }
                }
                if (adminState == false) {
                    return false;
                }
            }
        }
    },
    getters: {},
    actions: {

    }
})