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
// import MonacoEditor from 'monaco-editor-vue'
import EditorContainer from '@/components/EditorContainer'

export default {
  name: 'PageIndex',
  components: {
    // MonacoEditor,
    EditorContainer
  },
  data () {
    return {
      options: {
      }
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    }
  },
  mounted () {
  }
}
</script>
