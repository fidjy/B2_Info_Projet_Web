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
        testAdmin() {
            let adminState = false;
            if (this.$cookies.get("log") != 'true') {
                this.$router.replace({ path: "/" });
            }
            if (this.$cookies.get("log") == "true") {
                await axios
                    .post("/api/login_check", {
                        username: this.$cookies.get("mailUser"),
                        password: this.$cookies.get("passwordUser")
                    })
                    .then(response => {
                        axios.defaults.headers.common = {
                            Authorization: `bearer ${response.data.token}`
                        };
                        commandStore.commit("getUserRoles", response.data.data.roles);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                for (const role in this.rolesUser) {
                    if (this.rolesUser[role] == "ROLE_ADMIN") {
                        adminState = true;
                    }
                }
                if (adminState == false) {
                    this.$router.replace({ path: "/" });
                }

                await axios
                    .get("/api/bug_reports")
                    .then(response => {
                        for (const value in response.data["hydra:member"]) {
                            axios
                                .get(response.data["hydra:member"][value]["@id"])
                                .then(response => {
                                    this.desserts.push(response.data);
                                    this.restaurantsNumber = this.desserts.length;
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                this.loadingDataTable = false;
            }
        }
    },
    getters: {},
    actions: {

    }
})