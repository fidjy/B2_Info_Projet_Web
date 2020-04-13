<template>
  <div id="Login" class="inputContainer">
    <div class="tasklinePictureContainer">
      <img
        class="tasklinePicture"
        src="https://cdn.discordapp.com/attachments/601457880214011904/601470099483918357/tasklineLogo_big.png"
      />
    </div>
    <form class="inputContainerForm" action>
      <div class="containerInput BorderColor">
        <img
          class="personnIcon"
          src="https://www.materialui.co/materialIcons/social/person_black_216x216.png"
        />
        <input type="email" class="input PaddingLeft" placeholder="email" id="email" name="email" />
        <br />
      </div>

      <div class="containerInput BorderColor">
        <img
          class="lockIcon"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/OOjs_UI_icon_lock.svg/768px-OOjs_UI_icon_lock.svg.png"
        />
        <input
          class="input PaddingLeft"
          placeholder="password"
          type="password"
          id="password"
          name="password"
        />
      </div>

      <div class="submitContainer">
        <router-link :to="{ name: '' }">
          <input v-on:click="verifRegister()" class="submit" type="submit" value="Log in" />
        </router-link>
        <router-link class="passwordForgot" :to="{ name: 'ResetPassword' }">
          <a>Forgot your password ?</a>
        </router-link>
      </div>
    </form>
    <div class="signUpContainer">
      <div class="textDontHaveAccount">DON'T HAVE AN ACCOUNT ?</div>

      <router-link class="signUp" :to="{ name: 'Register' }">
        <a>SIGN UP</a>
      </router-link>

      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
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