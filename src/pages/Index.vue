<template>
  <div id="app">
    <editor-container></editor-container>
    <!-- <MonacoEditor
      width="1705"
      height="880"
      theme="vs-dark"
      language="javascript"
      :options="options"
      @change="onChange"
    ></MonacoEditor> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import MonacoEditor from 'monaco-editor-vue'
import EditorContainer from '@/components/EditorContainer'

export default {
  name: 'PageIndex',
  components: {
    EditorContainer
  },
  data () {
    return {
      options: {
      }
    }
  },
  methods: {
    ...mapActions('connection', {
      'findAllConnections': 'findAll'
    }),
    onChange (value) {
    }
  },
  mounted () {
    this.findAllConnections()
  }
}
</script>
