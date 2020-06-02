<template>
  <div class="container-menu">
    <v-card class="container-menu-v-card margin">
      <v-card-title>
        Commands
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import commandStore from '../../stores/command';

export default {
  store: commandStore,
  name: "AdminCommandsUser",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "State",
          align: "start",
          sortable: false,
          value: "state"
        },
        { text: "Address", value: "address" },
        { text: "Delivery date", value: "deliveryDate" },
        { text: "Delivery number", value: "deliveryNumber" }
      ],
      desserts: []
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    rolesUser() {
      return commandStore.state.rolesUser;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  },
  async mounted() {
    this.loadingDataTable = true;
    let adminState = false;
    console.log(this.$cookies.get("log"));
    if (this.$cookies.get("log") != "true") {
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
    }

    const command = this.$route.params.command.replace('"', "");
    await axios
      .get(command)
      .then(response => {
        for (const plat in response.data["Commandes"]) {
          axios
            .get(response.data["Commandes"][plat])
            .then(response => {
              this.desserts.push(response.data);
              console.log(this.desserts);
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
};
</script>
