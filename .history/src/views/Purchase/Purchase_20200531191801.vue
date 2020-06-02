<template>
  <div class="payment_global_container">
    <div class="payment_order">
      <div class="font-italic margin-cart">
        <div class="payment_order">
          <p>Your order</p>
        </div>
        <v-card class="mx-auto payment_card scrollbar" max-width="544">
          <div v-for="command in commandUser" :key="command.name" class="payment_card_block">
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>{{ command.name }}</div>
                <p class="display-1 text--primary">{{ command.number }} {{ command.name }}</p>
                <p>{{ command.description }}</p>
                <p>{{ command.price }} €</p>
              </v-card-text>
            </v-card>
          </div>
          <v-card class="mx-auto payment_card_details price_container" max-width="544">
            <v-card-text>
              <p>food price : {{ commandPrice }}€</p>
              <p>shipping cost : 2,5€</p>
              <p>tva : 10%</p>
              <p></p>
              <div class="total_price_container">
                total price :
                <div class="total_price">{{ totalPrice }}€</div>
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </div>
    </div>

    <div class>
      <CardForm
        :form-data="formData"
        @input-card-number="updateCardNumber"
        @input-card-name="updateCardName"
        @input-card-month="updateCardMonth"
        @input-card-year="updateCardYear"
        @input-card-cvv="updateCardCvv"
        v-bind:totalPrice="totalPrice"
      />
      <!-- backgroundImage="https://images.unsplash.com/photo-1572336183013-960c3e1a0b54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" -->
    </div>
  </div>
</template>

<script>
import CardForm from "@/components/CardForm";

import axios from "axios";

import commandStore from "../../stores/command";

export default {
  store: commandStore,
  name: "Purchase",
  components: {
    CardForm
  },
  data() {
    return {
      formData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: ""
      },
      commandBox: "",
      totalPrice: 0,
      userBalance: 0
    };
  },
  methods: {
    updateCardNumber(val) {
      console.log(val);
    },
    updateCardName(val) {
      console.log(val);
    },
    updateCardMonth(val) {
      console.log(val);
    },
    updateCardYear(val) {
      console.log(val);
    },
    updateCardCvv(val) {
      console.log(val);
    }
  },
  computed: {
    idUser() {
      return commandStore.state.idUser;
    },
    commandUser() {
      return commandStore.state.commandUser;
    },
    commandPrice() {
      return commandStore.state.commandPrice;
    }
  },
  mounted: async function() {
    if (this.idUser != 0) {
      await axios
        .post("/api/login_check", {
          username: this.$cookies.get("mailUser"),
          password: this.$cookies.get("passwordUser")
        })
        .then(response => {
          axios.defaults.headers.common = {
            Authorization: `bearer ${response.data.token}`
          };
          commandStore.commit("getUserId", response.data.data.id);
          commandStore.commit("getUserRoles", response.data.data.roles);
        })
        .catch(function(error) {
          console.log(error);
        });

      if (this.commandUser != undefined) {
        for (const plat in this.commandUser) {
          console.log(this.commandUser[plat]["number"]);
          commandStore.commit(
            "calculPrice",
            this.commandUser[plat]["price"],
            this.commandUser[plat]["number"]
          );
        }

        this.totalPrice = this.commandPrice + 2.5;
      }
    }
  }
};
</script>

<style lang="scss">
@import "Assets/Purchase.scss";
</style>
