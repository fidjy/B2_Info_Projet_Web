<template>
  <div class="payment_global_container">
    <div class="payment_order">
      <div class="font-italic margin-cart">
        <div class="payment_order">
          <p>Your order</p>
        </div>
        <v-card class="mx-auto payment_card" max-width="544">
          <div>
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--primary">be•nev•o•lent</p>
                <p>pizza</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--primary">be•nev•o•lent</p>
                <p>pizza</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--primary">be•nev•o•lent</p>
                <p>pizza</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--primary">be•nev•o•lent</p>
                <p>pizza</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--primary">be•nev•o•lent</p>
                <p>pizza</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--primary">be•nev•o•lent</p>
                <p>pizza</p>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto payment_card_details" max-width="544">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--primary">be•nev•o•lent</p>
                <p>pizza</p>
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
        cardCvv: ""
      }
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
  }
};
</script>

<style lang="scss">
@import "Assets/Purchase.scss";
</style>
