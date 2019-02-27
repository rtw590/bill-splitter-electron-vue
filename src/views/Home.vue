

<template>
    <div style="position: absolute; width: 98%;top: 50%;transform: translateY(-50%);">
        
        <div style="padding-top: 20px;; padding-left:20px; padding-right:20px; max-width: 600px; margin: 0 auto;">
            <div style="border-width: 2px; border-color: rgb(209, 209, 209); border-radius: 5px; background-color:rgb(232, 232, 232); padding-left:5px; padding-right:5px;" >
                <div style="display: flex; flex-direction:row; justify-content: center;">
                    <p style="color: black; font-size: 16px">Add Everyone Who Is Splitting The Bill</p>
                </div>
                <div style="display: flex; flex-direction:row; justify-content: center; padding-bottom: 5px;">
                    <input v-model="person" hint="Enter Name" style="flex-grow:2; border: solid 2px rgb(232, 232, 232);"/>
                    <button @click="onButtonTap" style="background-color:#068587 color:white; flex-grow:1;">Add</button>
                </div>
                
                <div style="border-width: 2px; border-color: rgb(232, 232, 232); min-height:300px; background-color:white;">
                    <!-- <v-template> -->
                        <div v-for="person in $store.state.people" style="display: flex; flex-direction:row; justify-content: space-between; height: 22px; border-bottom: 3px solid rgb(232, 232, 232);">

                            <p class="personListed" style="padding: 0px; margin: 0px;">{{ person.name }}</p>
                            <button @click="removePerson(person.name)" style="color: white; font-size: 12; font-weight: bold; background-color:#f2b134;">
                              X
                            </button>

                        </div>
                    <!-- </v-template> -->
                </div>
                <div style="display: flex; flex-direction:row; justify-content: center">
                  <button @click="nextScreen" style="background-color: rgb(86, 86, 86); color: white; flex-grow:1; margin: 5px; padding: 5px;">
                    That's Everyone!
                  </button>
                </div>
            </div>
        </div>


    </div>
</template>

<script >
  // import ChargesPage from './ChargesPage'
  // var dialogs = require("tns-core-modules/ui/dialogs");

  export default {
    methods: {
        onButtonTap() {
            // Check if name field is blank and display alert if it is
            if(this.person == '') {
                    dialogs.alert({
                    title: "Name Field Blank",
                    message: "Please enter a name",
                    okButtonText: "Ok"
                }).then(function () {
                    console.log("Dialog closed!");
                });
            } else {
                // Check if name is already in people array and if so display alert
                let namesInArray = []
                this.$store.state.people.forEach(function(person) {
                    namesInArray.push(person.name)
                });
                if(namesInArray.includes(this.person) == true){
                        dialogs.alert({
                        title: "Please Add Unique Name",
                        message: "Each person needs to have a different name",
                        okButtonText: "Ok"
                    }).then(function () {
                        console.log("Dialog closed!");
                    });
                } else {
                  console.log('The proper part is running')
                  console.log(this.person)
                  // store.commit('addPerson', 10)
                  this.$store.commit('addPerson', this.person)
                  // this.$store.state.people.push(
                  //   {
                  //       name: this.person,
                  //       isActive: false,
                  //       individualCharges: [],
                  //       subtotal: 0
                  //   }
                  // )
                  this.person = ''
                } 
            }
        },
        removePerson: function(personToRemove) {
            let newArray = this.$store.state.people.filter(function (person) {
                return person.name != personToRemove;
            });
            this.$store.state.people = newArray
        },
        nextScreen() {
            console.log('Next screen hit')
            this.$navigateTo(ChargesPage);
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
