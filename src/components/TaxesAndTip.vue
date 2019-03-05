

<template>
    <div style="">
    <!-- <div style="position: absolute; width: 98%;top: 50%;transform: translateY(-50%);"> -->
        
        <div style="padding-top: 20px;; padding-left:20px; padding-right:20px; padding-bottom: 20px;max-width: 600px; margin: 0 auto;">
            <div style="border-width: 2px; border-color: rgb(209, 209, 209); border-radius: 5px; background-color:rgb(232, 232, 232); padding-left:5px; padding-right:5px;" >
                <div style="display: flex; flex-direction:row; justify-content: center;">
                    <p style="color: black; font-size: 16px; margin: 0px; padding: 0px;">Taxes and Tip Page</p>
                </div>
                <div style="display: flex; flex-direction:column; justify-content: center; padding-bottom: 5px;">
                    <v-text-field regular hide-details v-model="billTotal" placeholder="Enter Bill Total After Taxes" style="flex-grow:1; border: solid 2px rgb(232, 232, 232);"/>
                    <v-text-field regular hide-details v-model="tip" placeholder="Enter Tip Amount" style="flex-grow:1; border: solid 2px rgb(232, 232, 232);"/>
                </div>
                


                <div style="display: flex; flex-direction:column; justify-content: center">
                    <!-- <Button text="Add Item" @tap="addItem" flexGrow="1" style="background-color: #068587; color: white;" /> -->
                    <v-btn @click="nextScreen" style="background-color: #068587; color: white; flex-grow:1; margin: 5px; padding: 0px;">
                        Done
                    </v-btn>
                    <v-btn to="/charges" style="background-color: rgb(86, 86, 86); color: white; flex-grow:1; margin: 5px; padding: 0px;">
                        Back
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>


<script >
//   import App from './App'
//   import TotalsPage from './TotalsPage'

  export default {
    methods: {
        nextScreen() {
            // Add subtotal and tip to the store
            this.$store.commit('addBillTotal', this.billTotal)
            this.$store.commit('addTip', this.tip)

            // Add subtotal and tip to each person depending on their total

            // Total for each person
            this.$store.state.people.forEach((person) => {
                let chargesArray = []
                person.individualCharges.forEach((charge) => {
                    chargesArray.push(parseFloat(charge.amountToCharge))
                })
                person.subtotal = parseFloat(chargesArray.reduce((a, b) => a + b, 0).toFixed(2));
            });

            // Add everyone's subtotals and divide by billTotal to find tax rate
            let subtotalOfAllPeople = 0
            this.$store.state.people.forEach(function(person) {
                subtotalOfAllPeople = subtotalOfAllPeople + person.subtotal
            });

            let taxesOwed = this.$store.state.subtotal - subtotalOfAllPeople
            let taxRate = taxesOwed / subtotalOfAllPeople

            // Add Tax For Everyone
            this.$store.commit('addTax', taxRate)

            // Add tip for everyone
            this.$store.commit('tipEachPerson', subtotalOfAllPeople)

            // Get everyones final totals
            this.$store.commit('totalEachPerson')

            this.$router.push('/totals')


        }
    },
    data() {
      return {
        billTotal: '',
        tip: ''
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: rgb(232, 232, 232);
        text-align: center;
        color: #000000;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .personListed {
        font-size: 23;
        color: #333333;
    }

    .active {
        color: #ed553b;
        font-weight: bold;
    }
</style>