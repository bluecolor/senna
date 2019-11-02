<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-bar.bg-primary.text-white(dark, style='-webkit-app-region: drag; height:30px;')
    .col.text-center.text-weight-bold
      | Senna
    q-btn(dense, flat, round, icon='lens', size='8.5px', color='green' @click='onMinimize')
    q-btn(dense, flat, round, icon='lens', size='8.5px', color='yellow' @click='onMaximize')
    q-btn(dense, flat, round, icon='lens', size='8.5px', color='red' @click='onClose')
  .page-container
    activity-bar(
      @hide-navigator='onHideNavigator'
      @show-navigator='onShowNavigator'
      style='height:100%;' :style="`height: ${splitHeight}px`")
    .content-container
      exception(v-if='isException', @close='isException=false' :exception='exception')
      loading(v-if='isLoading')
      welcome(v-if='connections.length === 0' :style="`height: ${splitHeight}px`")
      q-splitter.splitter(
        v-for='c in connections'
        v-if= 'c.active'
        :limits="[0, 90]"
        v-model='splitter' :style="`height: ${splitHeight}px`"
      )
        template(v-slot:before)
          navigator
        template(v-slot:after)
          q-page-container
            editor-container
  status-bar

</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import { remote } from 'electron'
import Navigator from '@/components/Navigator'
import StatusBar from '@/components/StatusBar'
import ActivityBar from '@/components/ActivityBar'
import Welcome from './Welcome'
import Loading from '@/components/Loading'
import { EventBus } from '@/util/event-bus.js'
import Exception from '@/components/Exception'
import EditorContainer from '@/components/EditorContainer'

export default {
  name: 'AppLayout',
  components: {
    Navigator,
    StatusBar,
    ActivityBar,
    Welcome,
    Loading,
    Exception,
    EditorContainer
  },
  data () {
    return {
      exception: 'Unknown exception occured',
      isException: false,
      isLoading: false,
      isMaximized: false,
      splitHeight: 300,
      splitterPrev: 0,
      splitter: 30,
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters('editor', [
      'activeConnection', 'connections'
    ])
  },
  methods: {
    ...mapActions('connection', {
      'findAllConnections': 'findAll'
    }),
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
    },
    onHideNavigator () {
      this.splitterPrev = this.splitter
      this.splitter = 0
    },
    onShowNavigator () {
      this.splitter = this.splitterPrev
    }
  },
  mounted () {
    this.findAllConnections()
    this.computeSplitHeight()
    remote.getCurrentWindow().on('resize', _.debounce(() => {
      this.computeSplitHeight()
    }, 20))
    EventBus.$on('loading', loading => {
      this.isLoading = loading
    })
    EventBus.$on('exception', e => {
      this.exception = e.message
      this.isException = true
    })
  }
}
</script>

<style lang="stylus">
button {
  -webkit-app-region: no-drag;
}

.content-container {
  width: 100%;
}

.page-container {
  display: flex;
  .splitter {
    flex-grow: 1;
  }
}

</style>

<style>
  body {
    overflow: hidden;
  }
</style>
