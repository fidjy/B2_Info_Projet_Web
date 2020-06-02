<template>

</template>

<script>
import axios from "axios";

export default {
  name: "BugReport",
  data: () => ({
    valid: false,
    message: "",
    messageRules: [v => !!v || "Message is required"],
    email: ""
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    sendBugReport() {
      axios
        .post("/api/bug_reports", {
          email: this.email,
          message: this.message
        })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUserInformations() {
      axios
        .get("/api/users/" + this.$cookies.get("idUser"))
        .then(response => {
          console.log(response);
          this.email = response.data.email;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: function(){
    this.getUserInformations();
  }
};
</script>

<style>
@import url("Assets/BugReport.scss");
</style>
