<template>
  <v-form ref="form" v-model="valid" class="register_container_global scrollbar">
    <div class="text_field">
      <v-text-field
        type="surname"
        :rules="[rules.required]"
        v-model="surname"
        :label="surnameLabel"
        outlined
      ></v-text-field>
    </div>

    <div class="text_field_surname">
      <v-text-field
        type="surname"
        :rules="[rules.required]"
        v-model="name"
        :label="nameLabel"
        outlined
      ></v-text-field>
    </div>

    <v-text-field
      class="text_field"
      v-model="email"
      :rules="[rules.required, rules.email]"
      value
      label="E-mail"
      outlined
      messages
    ></v-text-field>

    <div class="text_field">
      <v-text-field
        v-model="password"
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.lengthPassword]"
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="password again"
        hint="At least 8 characters"
        value
        @click:append="show3 = !show3"
        outlined
      ></v-text-field>
      <password v-model="password" strength-meter-only @score="showScore" />
    </div>

    <v-text-field
      v-model="confirmPassword"
      class="text_field"
      :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.emailMatch]"
      :type="show4 ? 'text' : 'password'"
      name="input-10-2"
      label="password again"
      hint="At least 8 characters"
      value
      @click:append="show4 = !show4"
      outlined
    ></v-text-field>

    <div class="container_avatar_and_role">
      <v-col class="roles_container" sm="4">
        <h2 class="avatar_title">Role</h2>
        <v-overflow-btn
          v-model="actualRole"
          class="my-2 role_input"
          :items="Roles"
          :label="actualRole"
          target="#dropdown-example"
          text
        ></v-overflow-btn>
      </v-col>

      <div class="avatar-container">
        <div class="hover10 column">
          <h2 class="avatar_title">Avatar</h2>
          <v-img
            class="avatar_picture_container"
            :src="image || 'https://cdn.imgbin.com/21/5/0/imgbin-computer-icons-avatar-social-media-blog-font-awesome-avatar-JdPkyt0m7ykS2bDNq99AHNXKV.jpg'"
          >
            <input class="avatar_input" type="file" @change="onFileChange" />
          </v-img>
        </div>
      </div>
    </div>

    <v-card v-if="actualRole == 'Restorer'" class="restorer_container_global" raised>
      <div class="restorer_container">
        <v-text-field
          v-model="restaurantName"
          class="text_field"
          :rules="[rules.required]"
          name="input-10-2"
          label="restaurant' name"
          hint="At least 8 characters"
          value
          outlined
        ></v-text-field>
        <v-text-field
          v-model="adresse"
          class="text_field"
          :rules="[rules.required]"
          name="input-10-2"
          label="restaurant's adresse"
          hint="At least 8 characters"
          value
          outlined
        ></v-text-field>
        <v-text-field
          v-model="type"
          class="text_field"
          :rules="[rules.required]"
          name="input-10-2"
          label="dishes' type"
          hint="At least 8 characters"
          value
          outlined
        ></v-text-field>
        <v-text-field
          v-model="description"
          class="text_field"
          :rules="[rules.required]"
          name="input-10-2"
          label="restaurant' name"
          hint="At least 8 characters"
          value
          outlined
        ></v-text-field>
        <v-text-field
          v-model="picture"
          class="text_field"
          :rules="[rules.required]"
          name="input-10-2"
          label="restaurant's adresse"
          hint="At least 8 characters"
          value
          outlined
        ></v-text-field>
        <v-text-field
          v-model="emailRestaurant"
          class="text_field"
          :rules="[rules.required, rules.email]"
          name="input-10-2"
          label="restaurant's email"
          value
          outlined
        ></v-text-field>
      </div>
    </v-card>

    <v-card v-if="actualRole == 'Deliver'" class="restorer_container_global" raised>
      <div class="restorer_container">
        <v-overflow-btn
          v-model="restaurantName"
          class="my-2"
          :items="restaurantsList"
          label="Overflow Btn"
          target="#dropdown-example"
        ></v-overflow-btn>
      </div>
    </v-card>

    <div class="register_validation">
      <router-link v-if="valid" :to="{ name: '' }">
        <v-btn
          class="login_button submit"
          color="primary"
          large
          @click="createUser()"
          outlined
        >Register</v-btn>
      </router-link>

      <router-link v-else :to="{ name: '' }">
        <v-btn class="login_button darkSubmit" large outlined>Register</v-btn>
      </router-link>
    </div>
    <v-text-field v-if="loading" color="success" loading disabled></v-text-field>
    <v-alert v-if="errorState" type="error">{{ errorMessage }}</v-alert>
    <v-alert
      v-if="errorState == false"
      type="success"
    >successful authentication, you will be redirected</v-alert>
  </v-form>
</template>

<script>
import Password from "vue-password-strength-meter";
import axios from "axios";
import store from "../../stores/command";

export default {
  store: store,
  name: "Register",
  components: { Password },
  data() {
    return {
      restaurantsList: [],
      valid: true,
      show3: false,
      show4: false,
      title: "Preliminary report",
      email: "oui@gmail.com",
      emailLabel: "email",
      surname: "qsqd",
      surnameLabel: "surname",
      name: "",
      nameLabel: "name",
      password: "qfsqfQDFQS454s",
      confirmPassword: "qfsqfQDFQS454s",
      score: null,
      actualRole: "User",
      restaurantName: "",
      token: "",
      image: "",
      type: "",
      errorState: undefined,
      errorMessage: "",
      loading: false,
      description: "wooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      emailRestaurant: "",
      picture:
        "https://media-cdn.tripadvisor.com/media/photo-s/12/47/f3/8c/oko-restaurant.jpg",
      Roles: [
        { text: "User" },
        { text: "Restorer" },
        { text: "Admin" },
        { text: "Deliver" }
      ],
      adresse: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: value =>
          this.password == value ||
          "The email and password you entered don't match",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        lengthPassword: v =>
          this.score > 2 || "the password is not complex enough"
      }
    };
  },
  methods: {
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    },
    login: function() {
      console.log("login");
    },
    showScore(score) {
      this.score = score;
    },
    setRole(role) {
      this.actualRole = role;
      console.log(role);
    },
    async createUser() {
      let user;
      let errorStatusAxios = "";
      let errorStateAxios = false;
      this.loading = true;
      this.errorState = undefined;
      await axios
        .post("/api/users", {
          email: this.email,
          roles: this.createRole,
          password: this.password,
          surname: this.surname,
          name: this.name,
          avatar: this.image
        })
        .then(response => {
          user = response.data;
        })
        .catch(function(error) {
          errorStatusAxios = error;
          errorStateAxios = true;
        });

      if (this.actualRole == "Restorer") {
        await axios
          .post("/api/restaurants", {
            name: this.restaurantName,
            type: this.type,
            adresse: this.adresse,
            description: this.description,
            picture: this.picture,
            tendance: false,
            stars: 0,
            email: this.emailRestaurant,
            user: user["@id"]
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(function(error) {
            errorStatusAxios = error;
            errorStateAxios = true;
          });
      }

      await axios
        .post("/api/login_check", {
          username: this.email,
          password: this.password
        })
        .then(response => {
          axios.defaults.headers.common = {
            Authorization: `bearer ${response.data.token}`
          };
        })
        .catch(function(error) {
          errorStatusAxios = error;
          errorStateAxios = true;
        });

      if (!errorStateAxios) {
        console.log("cookies set . . .");
        store.commit("getUserId", user["id"]);
        this.$cookies.set("idUser", user["id"]);
        this.$cookies.set("log", true);
      }

      this.loading = false;

      if (errorStateAxios) {
        this.errorMessage = errorStatusAxios.response.data.message;
      }
      this.errorState = errorStateAxios;

      if (!errorStateAxios) {
        this.$router.replace({ path: "/" });
      }
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();

      reader.onload = e => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  computed: {
    checkPasswordConfirmation: function() {
      return "";
    },
    createRole: function() {
      const Roles = [];
      Roles.push("ROLE_USER");
      if (this.actualRole == "Restorer") {
        Roles.push("ROLE_RESTORER");
      }
      if (this.actualRole == "Admin") {
        Roles.push("ROLE_ADMIN");
      }
      if (this.actualRole == "Deliver") {
        Roles.push("ROLE_DELIVER");
      }
      return Roles;
    }
  },
  async mounted() {
    await axios
      .get("/api/restaurants")
      .then(response => {
        console.log(response.data);
        for (const value in response.data["hydra:member"]) {
          this.restaurantsList.push(response.data["hydra:member"][value].name);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
@import url("Assets/Register.scss");
</style>
