<template>
  <q-layout view="lHh Lpr lFf">
    <q-bar dark class="bg-primary text-white" style='-webkit-app-region: drag'>
      <div class="col text-center text-weight-bold">
        Blue
      </div>
      <q-btn dense flat round icon="lens" size="8.5px" color="green" />
      <q-btn dense flat round icon="lens" size="8.5px" color="yellow" />
      <q-btn dense flat round icon="lens" size="8.5px" color="red" />
    </q-bar>
    <q-splitter v-model="splitterModel" style="height: 400px" >

      <template v-slot:before>
        <navigator> </navigator>
      </template>

      <template v-slot:after>
        <q-page-container>
          <router-view />
        </q-page-container>
      </template>

    </q-splitter>
    <status-bar></status-bar>
  </q-layout>
</template>

<script>
import Navigator from '@/components/Navigator'
import StatusBar from '@/components/StatusBar'

export default {
  name: 'AppLayout',
  components: {
    Navigator,
    StatusBar
  },
  data () {
    return {
      splitterModel: 30,
      leftDrawerOpen: false
    }
  }
}
</script>

<style lang="stylus">
button {
  -webkit-app-region: no-drag;
}

</style>
