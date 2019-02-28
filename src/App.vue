<template>
  <v-app style="background-color: #ed553b;">
    <router-view/>
    <!-- <v-content>
      <Home/>
    </v-content>  -->
  </v-app>
</template>

<script>
import Home from './components/Home'
import Charges from './components/Charges'

export default {
  name: 'App',
  components: {
    Home,
    Charges
  },
  data () {
    return {
      //
    }
  }
}
</script>
