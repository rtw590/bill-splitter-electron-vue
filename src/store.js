import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    people: [],
    charges: [],
    chargesPrimaryKey: 0,
    subtotal: 0,
    tip: 0,
    personViewing: '',
    personViewingCharges: [],
    personViewingTax: '',
    personViewingTip: '',
    personViewingSubtotal: '',
    personViewingTotal: ''
  },
  mutations: {
    addPerson (state, person) {
      state.people.push(
        {
            name: person,
            isActive: false,
            individualCharges: [],
            subtotal: 0
        }
      )
    },
    removePerson (state, personToRemove) {
      let newArray = state.people.filter(function (person) {
          return person.name != personToRemove;
      });
      state.people = newArray
    },
    makePersonActive (state, person) {
      state.people.forEach(function(element) {
        if(element.name == person){
            if(element.isActive == false){
                element.isActive = true
            } else {
                element.isActive = false
            }
        }
    });
    }
  },
  actions: {

  }
})
