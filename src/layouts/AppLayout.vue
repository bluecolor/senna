<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-bar.bg-primary.text-white(dark='', style='-webkit-app-region: drag; height:30px;')
    .col.text-center.text-weight-bold
      | Senna
    q-btn(dense='', flat='', round='', icon='lens', size='8.5px', color='green' @click='onMinimize')
    q-btn(dense='', flat='', round='', icon='lens', size='8.5px', color='yellow' @click='onMaximize')
    q-btn(dense='', flat='', round='', icon='lens', size='8.5px', color='red' @click='onClose')
  q-splitter(v-model='splitterModel', :style="`height: ${splitHeight}px`")
    template(v-slot:before='')
      navigator
    template(v-slot:after='')
      q-page-container
        router-view
  status-bar

</template>

<script>
import _ from 'lodash'
import { remote } from 'electron'
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
      isMaximized: false,
      splitHeight: 300,
      splitterModel: 30,
      leftDrawerOpen: false
    }
  },
  computed: {
  },
  methods: {
    onClose () {
      remote.getCurrentWindow().close()
    },
    onMinimize () {
      var window = remote.getCurrentWindow()
      window.minimize()
    },
    onMaximize () {
      var window = remote.getCurrentWindow()
      if (!window.isMaximized()) {
        window.maximize()
      } else {
        window.unmaximize()
      }
    },
    computeSplitHeight () {
      const winHeight = remote.getCurrentWindow().getSize()[1]
      this.splitHeight = winHeight - 55
    }
  },
  mounted () {
    this.computeSplitHeight()
    remote.getCurrentWindow().on('resize', _.debounce(() => {
      this.computeSplitHeight()
    }, 20))
  }
}
</script>

<style lang="stylus">
button {
  -webkit-app-region: no-drag;
}

</style>
