<template>
  <v-container fluid>

    <v-flex xs4 class="grey lighten-4">
      <v-container style="position: relative;top: 13%;" class="text-xs-center">
        <v-card flat>
          <v-card-title primary-title>
            <h4>Login</h4>
          </v-card-title>
          <v-form>
            <v-text-field prepend-icon="person" name="Username" label="Username"></v-text-field>
            <v-text-field prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block>Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-flex>
</v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      streets: []
    };
  },
  methods: {
    addToStreets: function(value) {
      if (this.streets.includes(value) == false) {
        this.streets.push(value);
      }
    }
  }
};
</script>