<template>
  <div class="login_container_global">
      <v-form ref="form" v-model="valid" class="login_container_input">
        <div class="text_field">
          {{ getUserInformations() }}
          <v-text-field
            type="surname"
            :rules="[rules.required]"
            v-model="surname"
            :label="surnameLabel"
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
          <router-link v-if="valid" :to="{ name: '' }">
            <v-btn
              class="login_button submit"
              color="primary"
              large
              @click="Register()"
              outlined
            >Save</v-btn>
          </router-link>

          <router-link v-else :to="{ name: '' }">
            <v-btn class="login_button darkSubmit" large @click="Register()" outlined>Save</v-btn>
          </router-link>
        </div>
      </v-form>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";
import axios from "axios";

export default {
  name: "Account",
  components: { Password },
  data() {
    return {
      valid: true,
      show3: false,
      show4: false,
      title: "Preliminary report",
      email: "",
      emailLabel: "email",
      surname: "",
      surnameLabel: "surname",
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
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
          this.surname = response.data.surname;
          this.email = response.data.email;
          this.password = response.data.password;
          this.confirmPassword = response.data.password;
          this.image = response.data.avatar;
        })
        .catch(function(error) {
          console.log(error);
        });
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
    }
  }
};
</script>

<style>
@import url("Assets/Account.scss");
</style>
