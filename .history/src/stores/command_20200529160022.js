import Vuex from 'vuex';

import axios from 'axios';


export default new Vuex.Store({
state: {
    commandBox: "",
    idUser: 0,
    rolesUser: []
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
    setUserToNull(state) {
        state.idUser = 0;
        state.rolesUser = [];
    },
    async checkRole(state, actualRole, actualLogState, actualMail, actualPassword) {
        let adminState = false;
        console.log(actualLogState);
        if (actualLogState != "true") {
            this.$router.replace({ path: "/" });
        }
        if (actualLogState == "true") {
            await axios
                .post("/api/login_check", {
                    username: actualMail,
                    password: actualPassword
                })
                .then(response => {
                    axios.defaults.headers.common = {
                        Authorization: `bearer ${response.data.token}`
                    };
                    state.rolesUser = response.data.data['roles'];
                    console.log(state.rolesUser);
                })
                .catch(function(error) {
                    console.log(error);
                });

            for (const role in this.rolesUser) {
                if (this.rolesUser[role] == actualRole) {
                    adminState = true;
                }
            }
            if (adminState == false) {
                this.$router.replace({ path: "/" });
            }
        }
    }
},
getters: {},
actions: {

}
})
})