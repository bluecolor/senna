<template lang="pug">
.content.editor-tab-content
  q-splitter(horizontal
    :limits="[25, Infinity]"
    v-model="splitter"
    reverse
    unit="px"
    :style="`height: ${splitHeight}px`"
  )
    template(v-slot:before style='overflow-y: hidden; overflow-x: hidden;')
      monaco-editor(
        :width="editorWidth"
        :height="editorHeight"
        theme="vs"
        language="sql"
        :options="options"
      )
    template(v-slot:after)
      output-container(@minimize='onMinimizeOutputContainer' :id='id')
</template>

<script>
import _ from 'lodash'
import { remote } from 'electron'
import OutputContainer from './OutputContainer'
import MonacoEditor from '@/components/MonacoEditor'

export default {
  props: { id: { type: Number } },
  components: {
    MonacoEditor,
    OutputContainer
  },
  data () {
    return {
      editorWidth: undefined,
      editorHeight: undefined,
      options: {
      },
      splitterPrev: undefined,
      splitter: 150,
      splitHeight: 300
    }
  },
  methods: {
    computeSplitHeight () {
      const winHeight = remote.getCurrentWindow().getSize()[1]
      this.splitHeight = winHeight - 93
    },
    onMinimizeOutputContainer (isMinimized) {
      if (isMinimized) {
        this.splitterPrev = this.splitter
        this.splitter = 25
      } else {
        this.splitter = this.splitterPrev
      }
    }
  },
  mounted () {
    this.computeSplitHeight()
    remote.getCurrentWindow().on('resize', _.debounce(() => {
      this.computeSplitHeight()
    }, 20))

    const el = document.querySelector('.editor-tab-content .q-splitter__panel.q-splitter__before.col')
    var observer = new ResizeObserver(resizeObserverEntries => {
      for (let entry of resizeObserverEntries) {
        const rect = entry.contentRect
        this.editorWidth = rect.width
        this.editorHeight = rect.height
      }
    })
    observer.observe(el)
  }
}
</script>

<style lang="scss">
.editor-tab-content {
  .q-splitter__panel.q-splitter__before.col {
    overflow: hidden;
  }
}

</style>
