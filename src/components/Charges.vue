

<template>
    <div style="">
    <!-- <div style="position: absolute; width: 98%;top: 50%;transform: translateY(-50%);"> -->
        
        <div style="padding-top: 20px;; padding-left:20px; padding-right:20px; padding-bottom: 20px;max-width: 600px; margin: 0 auto;">
            <div style="border-width: 2px; border-color: rgb(209, 209, 209); border-radius: 5px; background-color:rgb(232, 232, 232); padding-left:5px; padding-right:5px;" >
                <div style="display: flex; flex-direction:row; justify-content: center;">
                    <p style="color: black; font-size: 16px; margin: 0px; padding: 0px; text-align: center;">Charges Page</p>
                </div>
                <div style="display: flex; flex-direction:column; justify-content: center; padding-bottom: 5px;">
                    <v-text-field regular hide-details v-model="chargeName" placeholder="Bill Item Name (Optional)" style="flex-grow:1; border: solid 2px rgb(232, 232, 232);"/>
                    <v-text-field regular hide-details v-model="chargeAmount" placeholder="Enter Bill Item $ Amount" style="flex-grow:1; border: solid 2px rgb(232, 232, 232);"/>
                    <!-- <v-btn @click="onButtonTap" style="background-color:#068587; color:white; flex-grow:1;">Add</v-btn> -->

                    <!-- <TextField v-model="chargeName" hint="Bill Item Name (Optional)" flexGrow="1" />
                    <TextField v-model="chargeAmount" hint="Enter Bill Item $ Amount" flexGrow="1" /> -->
               
                </div>
                
                <div style="border-width: 2px; border-color: rgb(232, 232, 232); min-height:300px; background-color:white; padding-bottom: 10px;">
                    <!-- <Label text="Tap 1 or more name(s)" style="color: black; font-size: 16; text-align: center;" /> -->
                    <p style="padding: 0px; margin: 0px; text-align: center;">Click 1 or more name(s)</p>
                    <div v-for="person in $store.state.people" style="display: flex; flex-direction:row; justify-content: space-between; border-bottom: 3px solid rgb(232, 232, 232); margin: 7px;">
                        <p @click="makePersonActive(person.name)" class="personListed" style="padding: 0px; margin: 0px; font-size: 26px; cursor: pointer;" v-bind:class="{ active: person.isActive }">{{ person.name }}</p>
                    </div>
                </div>

                <div style="display: flex; flex-direction:column; justify-content: center">
                    <!-- <Button text="Add Item" @tap="addItem" flexGrow="1" style="background-color: #068587; color: white;" /> -->
                    <v-btn @click="addItem" style="background-color: #068587; color: white; flex-grow:1; margin: 5px; padding: 0px;">
                        Add Item
                    </v-btn>
                    <v-btn @click="nextScreen" style="background-color: #ed553b; color: white; flex-grow:1; margin: 5px; padding: 0px;">
                        Done Adding Items
                    </v-btn>
                    <v-btn to="/" style="background-color: rgb(86, 86, 86); color: white; flex-grow:1; margin: 5px; padding: 0px;">
                        Back
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>


<script >
//   import App from './App'
//   import TaxesAndTip from './TaxesAndTip'
//   var dialogs = require("tns-core-modules/ui/dialogs");

  export default {
    methods: {
        removePerson: function(personToRemove) {
            let newArray = this.$store.state.people.filter(function (person) {
                return person.name != personToRemove;
            });
            this.$store.state.people = newArray
        },
        makePersonActive(person) {
            this.$store.commit('makePersonActive', person)
        },
        addItem() {
            if(this.chargeAmount == ''){
                alert('Please enter the cost of the item')
            } else {
                // Check if no one is selected, if so add alert
                let peopleActive = []
                console.log(peopleActive.length)
                this.$store.state.people.forEach(function(person) {
                    if(person.isActive == true){
                        peopleActive.push(person.name)
                    }
                });

                // Check if peapleActive is 0 if so, alert
                if(peopleActive.length == 0){
                    alert('Please select at least one person to charge item to.')
                } else {
                    // Check if $ included and remove it if so
                    if(this.chargeAmount.charAt(0) == '$'){
                        this.chargeAmount = this.chargeAmount.substr(1)
                        console.log(this.chargeAmount)
                    }

                    let peopleToChargeTo = []
                    let amountToCharge = 0

                    this.$store.state.people.forEach(function(person) {
                        if(person.isActive == true){
                            peopleToChargeTo.push(person.name)
                        }
                    });

                    amountToCharge = (this.chargeAmount / peopleToChargeTo.length).toFixed(2)

                    // this.$store.state.chargesPrimaryKey++
                    this.$store.commit('increasePrimaryKey')

                    // Check if chargeName is blank and if so give it a name
                    if(this.chargeName == ''){
                        let newName = 'Charge ' + this.$store.state.chargesPrimaryKey
                        this.chargeName = newName
                        console.log(this.chargeName)
                    }

                    let chargeDetails = {
                            id: this.$store.state.chargesPrimaryKey,
                            itemName: this.chargeName,
                            itemAmount: this.chargeAmount,
                            peopleToChargeTo: peopleToChargeTo,
                            amountToCharge: amountToCharge
                        }

                    this.$store.commit('newCharge', chargeDetails)


                    // Add charge object to everyone in the array
                    // let arrayFromStore = this.$store.state.people
                    let arrayFromStore = this.$store.state.people
                    let id = this.$store.state.chargesPrimaryKey
                    let individualItemName = this.chargeName

                    peopleToChargeTo.forEach((personToBeCharged) => {
                        arrayFromStore.forEach((personInStore) => {
                            if(personToBeCharged == personInStore.name){
                                let individualChargeDetails = {
                                        id: id,
                                        itemName: individualItemName,
                                        amountToCharge: amountToCharge
                                    }
                                let payload = {personInStore, individualChargeDetails}
                                this.$store.commit('newIndividualCharge', payload)


                                // personInStore.individualCharges.push(
                                //     {
                                //         id: id,
                                //         itemName: individualItemName,
                                //         amountToCharge: amountToCharge
                                //     }
                                // )


                            }


                        })
                    });

                    // Clear out all values to start fresh on new item
                    // this.$store.state.people.forEach(function(element) {
                    //     element.isActive = false
                    // });
                    this.$store.commit('deactivateEveryone')
                    this.chargeName = ''
                    this.chargeAmount = ''
                    peopleToChargeTo = []
                }
            }
        },
        nextScreen() {
            this.$router.push('/taxesandtip')
        },
    },
    data() {
      return {
        chargeAmount: '',
        chargeName: ''
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