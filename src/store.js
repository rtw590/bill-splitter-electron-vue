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
    },
    increasePrimaryKey (state) {
      state.chargesPrimaryKey++
    },
    newCharge (state, chargeDetails) {
      state.charges.push(chargeDetails)
    },
    newIndividualCharge (state, payload) {
      console.log('mutation ran')
      // console.log(individualChargeDetails.amountToCharge)
      payload.personInStore.individualCharges.push(payload.individualChargeDetails)
    },
    deactivateEveryone (state) {
      state.people.forEach(person => {
        person.isActive = false
      })
    },
    addBillTotal (state, billTotal) {
      state.subtotal = billTotal
    },
    addTip (state, tip) {
      state.tip = tip
    },
    // totalEachPerson (state, payload) {
    //   payload.person.subtotal = payload.subtotal
    // },
    addTax (state, taxRate) {
      state.people.forEach(function(person) {
        let tax = 0
        tax = person.subtotal * taxRate
        person.taxOwed = tax
      });
    },
    tipEachPerson (state, subtotalOfAllPeople) {
      let tipTotal = state.tip
      state.people.forEach(function(person) {
        let tip = 0
        let tipRate = 0
        tipRate = tipTotal / subtotalOfAllPeople
        tip = person.subtotal * tipRate
        person.tipOwed = tip
      });
    },
    totalEachPerson (state) {
      state.people.forEach(function(person) {
        let personalTotals = 0
        personalTotals = person.subtotal + person.taxOwed + person.tipOwed
        person.total = personalTotals.toFixed(2)
      });
    },
    personViewing (state, person) {
      state.personViewing = person
    },
    personViewingCharges (state, charges) {
      state.personViewingCharges = charges
    },
    personViewingSubtotal (state, subtotal) {
      state.personViewingSubtotal = subtotal
    },
    personViewingTax (state, taxOwed) {
      state.personViewingTax = taxOwed
    },
    personViewingTip (state, tipOwed) {
      state.personViewingTip = tipOwed
    },
    personViewingTotal (state, total) {
      state.personViewingTotal = total
    },
  },
  actions: {

  }
})
