

<template>
    <div style="">
    <!-- <div style="position: absolute; width: 98%;top: 50%;transform: translateY(-50%);"> -->
        
        <div style="padding-top: 20px;; padding-left:20px; padding-right:20px; padding-bottom: 20px;max-width: 600px; margin: 0 auto;">
            <div style="border-width: 2px; border-color: rgb(209, 209, 209); border-radius: 5px; background-color:rgb(232, 232, 232); padding-left:5px; padding-right:5px;" >
                <div style="display: flex; flex-direction:row; justify-content: center;">
                    <p style="color: black; font-size: 16px; margin-bottom: 0px; text-align: center;">Totals</p>
                </div>
                <p style="color: black; font-size: 16px; text-align: center;">Click Name For Details</p>
                
                <div style="border-width: 2px; border-color: rgb(232, 232, 232); min-height:300px; background-color:white; padding-bottom: 10px;">
                    <div v-for="person in $store.state.people" @click="goToDetails(person.name)" style="display: flex; flex-direction:row; justify-content: space-between; border-bottom: 3px solid rgb(232, 232, 232); margin: 7px; cursor: pointer;">
                        <p class="personListed" style="padding: 0px; margin: 0px; font-size: 26px; cursor: pointer;">{{ person.name }}</p>
                        <p class="personListed" style="padding: 0px; margin: 0px; font-size: 26px; cursor: pointer;">${{ person.total }}</p>
                    </div>
                </div>

                <div style="display: flex; flex-direction:row; justify-content: center">
                    <!-- <v-btn to="/charges" style="background-color: rgb(86, 86, 86); color: white; flex-grow:1; margin: 10px; padding: 0px;">
                        That's Everyone!
                    </v-btn> -->
                </div>
            </div>
        </div>
    </div>
</template>


<script >
//   import ChargesPage from './ChargesPage'
//   import DetailsPage from './DetailsPage'

  export default {
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
        goToDetails(person) {
            console.log(person)
            this.$store.commit('personViewing', person)
            // this.$store.state.personViewing = person
            this.$router.push('/details')
        }
    },
    data() {
      return {
        person: ''
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