

<template>
    <div style="">
    <!-- <div style="position: absolute; width: 98%;top: 50%;transform: translateY(-50%);"> -->
        
        <div style="padding-top: 20px;; padding-left:20px; padding-right:20px; padding-bottom: 20px;max-width: 600px; margin: 0 auto;">
            <div style="border-width: 2px; border-color: rgb(209, 209, 209); border-radius: 5px; background-color:rgb(232, 232, 232); padding-left:5px; padding-right:5px;" >
                <div style="display: flex; flex-direction:row; justify-content: center;">
                    <p style="color: black; font-size: 16px">Details For {{this.$store.state.personViewing}}</p>
                </div>
                <!-- <div style="display: flex; flex-direction:row; justify-content: center; padding-bottom: 5px;">
                    <v-text-field regular hide-details v-model="person" id="personInputField" v-on:keyup.enter="onButtonTap" placeholder="Enter Name" style="flex-grow:2; border: solid 2px rgb(232, 232, 232);"/>
                    <v-btn @click="onButtonTap" style="background-color:#068587; color:white; flex-grow:1;">Add</v-btn>
                </div> -->
                
                <div style="border-width: 2px; border-color: rgb(232, 232, 232); min-height:300px; background-color:white; padding-bottom: 10px;">
                    <div v-for="charge in $store.state.personViewingCharges" style="display: flex; flex-direction:row; justify-content: space-between; border-bottom: 3px solid rgb(232, 232, 232); margin: 7px;">
                        <p class="personListed" style="padding: 0px; margin: 0px; font-size: 26px;">{{ charge.itemName }}</p>
                        <p class="personListed" style="padding: 0px; margin: 0px; font-size: 26px;">${{ charge.amountToCharge }}</p>
                        <!-- <Label :text="charge.itemName" class="personListed"  /> -->
                        <!-- <Label :text="'$' + charge.amountToCharge" class="personListed"  /> -->
                    </div>
                </div>

                <p class="personListed" style="text-align: right; margin-bottom: 0px;">
                        Subtotal: ${{this.$store.state.personViewingSubtotal}}
                    </p>
                    
                    <p class="personListed" style="text-align: right; margin-bottom: 0px;"  >
                        Taxes: ${{this.$store.state.personViewingTax}}
                    </p>
                    
                    <p class="personListed" style="text-align: right; margin-bottom: 0px;"  >
                        Tip: ${{this.$store.state.personViewingTip}}
                    </p>
                    
                    <p class="personListed" style="text-align: right; margin-bottom: 0px; font-weight: 700;"  >
                        Total: ${{this.$store.state.personViewingTotal}}
                    </p>
                <div style="display: flex; flex-direction:row; justify-content: center">
                    <v-btn to="/totals" style="background-color: rgb(86, 86, 86); color: white; flex-grow:1; margin: 10px; padding: 0px;">
                        Back
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
//   import ChargesPage from './ChargesPage'

  export default {
    mounted: function () {
        // TODO: Add UI elemtns for Tax, tip and Total and populate that data

        let charges = []
        let personViewingNow = this.$store.state.personViewing
        let subtotal = ''
        let taxOwed = ''
        let tipOwed = ''
        let total = ''
        // Find which person we are trying to view
        this.$store.state.people.forEach(function(person) {
            if(person.name == personViewingNow){
                console.log('The if ran because they have the same name')
                charges = person.individualCharges
                subtotal = parseFloat(person.subtotal).toFixed(2)
                taxOwed = parseFloat(person.taxOwed).toFixed(2)
                tipOwed = parseFloat(person.tipOwed).toFixed(2)
                total = parseFloat(person.total).toFixed(2)
            }
        });

        // this.$store.state.personViewingCharges = charges
        // this.$store.state.personViewingSubtotal = subtotal
        // this.$store.state.personViewingTax = taxOwed
        // this.$store.state.personViewingTip = tipOwed
        // this.$store.state.personViewingTotal = total

        this.$store.commit('personViewingCharges', charges)
        this.$store.commit('personViewingSubtotal', subtotal)
        this.$store.commit('personViewingTax', taxOwed)
        this.$store.commit('personViewingTip', tipOwed)
        this.$store.commit('personViewingTotal', total)
    },
    methods: {
        onButtonTap() {
            this.$store.state.people.push(
                {
                    name: this.person,
                    isActive: false,
                    individualCharges: [],
                    subtotal: 0
                }
            )
            this.person = ''
        },
        nextScreen(person) {
            console.log(person)
            this.$navigateTo(ChargesPage);
        }
    },
    data() {
      return {
        personCharges: [],
        // personSubtotal: 0,
        // personTax: 0,
        // personTip:0,
        // personTotal: 0
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
</style>
