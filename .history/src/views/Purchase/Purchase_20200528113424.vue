<template>
  <div class="payment_global_container">
    <div class="payment_order">
      <div class="font-italic margin-cart">
        <div class="payment_order">
          <p>Your order</p>
        </div>
        <v-card class="mx-auto payment_card scrollbar" max-width="544">
          <div v-for="command in commandBox.plats" :key="command.name" class="payment_card_block">
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>{{ command.name }}</div>
                <p
                  class="display-1 text--primary"
                >{{ $cookies.get(command['@id']) }} {{ command.name }}</p>
                <p>{{ command.description }}</p>
                <p>{{ command.price }} €</p>
              </v-card-text>
            </v-card>
          </div>
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
      />
      <!-- backgroundImage="https://images.unsplash.com/photo-1572336183013-960c3e1a0b54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" -->
    </div>
  </div>
</template>

<script>
import CardForm from "@/components/CardForm";
import axios from "axios";

export default {
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
        cardCvv: "",
        commandPrice: "",
        totalPrice: ""
      },
      commandBox: ""
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
  mounted: async function() {
    await axios
      .get("/api/users/" + this.$cookies.get("idUser"))
      .then(response => {
        for (const progressCommand in response.data.Commandes) {
          if (response.data.Commandes[progressCommand].state == 0) {
            this.commandBox = response.data.Commandes[progressCommand];
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });

      for(const value in this.commandBox) {
        
      }
  }
};
</script>

<style lang="scss">
@import "Assets/Purchase.scss";
</style>
