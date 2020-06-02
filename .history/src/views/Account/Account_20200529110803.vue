<template>
  <div class="account_container_global">
    <div class="account_container">
      <div class="login_container_input">
        <v-btn
          color="primary"
          dark
          large
          @click="surnameChange = !surnameChange"
          class="change_button"
        >change surname {{ idUser }}</v-btn>

        <v-form v-if="surnameChange" ref="form" v-model="validSurname" class="form">
          <div class="text_field_container">
            <v-text-field
              type="surname"
              :rules="[rules.required]"
              v-model="surname"
              :label="surnameLabel"
              outlined
            ></v-text-field>
          </div>
        </v-form>

        <v-btn
          color="primary"
          dark
          large
          @click="nameChange = !nameChange"
          class="change_button"
        >change name</v-btn>

        <v-form v-if="nameChange" ref="form" v-model="validName" class="form">
          <div class="text_field">
            <v-text-field
              type="name"
              :rules="[rules.required]"
              v-model="name"
              :label="nameLabel"
              outlined
            ></v-text-field>
          </div>
        </v-form>

        <v-btn
          color="primary"
          dark
          large
          @click="emailChange = !emailChange"
          class="change_button"
        >change email</v-btn>

        <v-form v-if="emailChange" ref="form" v-model="validEmail" class="form">
          <v-text-field
            class="text_field"
            v-model="email"
            :rules="[rules.required, rules.email]"
            value
            label="E-mail"
            outlined
            messages
          ></v-text-field>
        </v-form>

        <v-btn
          color="primary"
          dark
          large
          @click="passwordChange = !passwordChange"
          class="change_button"
        >change password</v-btn>

        <v-form v-if="passwordChange" ref="form" v-model="validPassword" class="form">
          <v-text-field
            class="password_text_field"
            v-model="password"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.lengthPassword]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="your new password"
            hint="At least 8 characters"
            value
            @click:append="show3 = !show3"
            outlined
          ></v-text-field>
          <password v-model="password" strength-meter-only @score="showScore" />
          <v-text-field
            v-model="confirmPassword"
            class="password_text_field"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="show4 ? 'text' : 'password'"
            name="input-10-2"
            label="new password again"
            hint="At least 8 characters"
            value
            @click:append="show4 = !show4"
            outlined
          ></v-text-field>
        </v-form>

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

        <div class="register_validation">
          <router-link
            v-if="(validName && nameChange) || (validSurname && surnameChange) || (validPassword && passwordChange) || (validEmail && emailChange)"
            :to="{ name: '' }"
          >
            <v-btn
              class="login_button submit"
              color="primary"
              large
              @click="updateUserInformations()"
              outlined
              :loading="loading"
            >Save</v-btn>
          </router-link>

          <router-link v-else :to="{ name: '' }">
            <v-btn class="login_button darkSubmit" large outlined>Save</v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";
import axios from "axios";
import commandStore from "../../stores/command";

export default {
  store: commandStore,
  name: "Account",
  components: { Password },
  data() {
    return {
      loading: false,
      nameChange: false,
      surnameChange: false,
      passwordChange: false,
      emailChange: false,
      validName: true,
      validSurname: true,
      validPassword: true,
      validEmail: true,
      show3: false,
      show4: false,
      title: "Preliminary report",
      email: "",
      emailLabel: "email",
      surname: "",
      surnameLabel: "surname",
      name: "",
      nameLabel: "name",
      password: null,
      confirmPassword: null,
      score: null,
      image: "",
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
    showScore(score) {
      this.score = score;
    },
    getUserInformations() {
      axios
        .get("/api/users/" + this.idUser)
        .then(response => {
          this.surname = response.data.surname;
          this.email = response.data.email;
          this.image = response.data.avatar;
          this.name = response.data.name;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async updateUserInformations() {
      this.loading = true;
      if (this.surnameChange == true) {
        await axios
          .put("/api/users/" + this.idUser, {
            surname: this.username
          })
          .then(response => {
            this.surname = response.data.surname;
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      if (this.nameChange == true) {
        await axios
          .put("/api/users/" + this.idUser, {
            name: this.name
          })
          .then(response => {
            this.name = response.data.name;
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      if (this.passwordChange == true) {
        await axios
          .put("/api/users/" + this.idUser, {
            password: this.password
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      if (this.emailChange == true) {
        await axios
          .put("/api/users/" + this.idUser, {
            email: this.email
          })
          .then(response => {
            this.email = response.data.email;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      this.loading = false;
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
    idUser() {
      return commandStore.state.idUser;
    }
  },
  created: function() {
    this.getUserInformations();
  }
};
</script>

<style>
@import url("Assets/Account.scss");
</style>
