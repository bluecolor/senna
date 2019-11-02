<template lang="pug">
.editor-container()
  q-tabs.editor-tabs(
    ref='tabs'
    :key='componentKey'
    :style='"max-width:" + tabsWidth + "px"'
    v-model='tab' align='left', inline-label active-color='primary' )
    editor-tab(
      v-for='t in tabs', :key='t.id', :id='t.id'
      :title='t.title'
    )
      div()
        | Tab {{t}}
        q-btn.z-max.q-ml-md.all-pointer-events.close-btn(
          flat round, dense, size='xs', color='negative', icon='close', @click.stop='removeTab(t)')
    q-btn.q-ml-sm(dense flat icon='add' color='grey-8' @click='onNewTab')
  editor-tab-content

</template>

<script>

import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import EditorTab from '@/components/EditorTab'
import EditorTabContent from '@/components/EditorTabContent'

export default {
  components: {
    EditorTab,
    EditorTabContent
  },
  data () {
    return {
      tabsWidth: 1000,
      scrollTimer: undefined,
      componentKey: 0,
      version: 'Quasar.version',
      tab: undefined
    }
  },
  computed: {
    ...mapGetters('editor', [
      'activeConnection', 'openConnections'
    ]),
    tabs () {
      return this.activeConnection.tabs
    },
    activeTab () {
      return _.find(this.activeConnection.tabs, { active: true })
    }
  },
  watch: {
  },
  methods: {
    ...mapActions('editor', [
      'newTab'
    ]),
    forceRerender () {
      this.componentKey += 1
    },
    scrollToEnd (value = 9999) {
      this.animScrollTo(value)
    },
    animScrollTo (value) {
      this.stopAnimScroll()
      this.scrollTowards(value)

      this.scrollTimer = setInterval(() => {
        if (this.scrollTowards(value)) {
          this.stopAnimScroll()
        }
      }, 0.1)
    },
    stopAnimScroll () {
      clearInterval(this.scrollTimer)
    },
    scrollTowards (value) {
      let
        content = this.$refs.tabs.$refs.content,
        left = content.scrollLeft,
        done = false

      left += 9999999
      done = true

      content['scrollLeft'] = left
      return done
    },
    onNewTab () {
      this.newTab().then(id => {
        this.tab = id
      })
      this.forceRerender()
      this.scrollToEnd()
    },
    removeTab (id) {
      console.log('Removing tab', id)
    }
  },
  mounted () {
    this.tab = this.activeTab.id
    const el = document.querySelector('.editor-container')
    var observer = new ResizeObserver(resizeObserverEntries => {
      for (let entry of resizeObserverEntries) {
        const rect = entry.contentRect
        this.tabsWidth = rect.width
        this.scrollToEnd()
      }
    })
    observer.observe(el)
  }
}
</script>

<style lang="scss" scoped>
.tab-panel {
  padding: 0 !important;
}
</style>
