
<template lang='pug'>
.senna-monaco-editor(:style='style')
</template>

<script>
/* eslint-disable */

// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import * as monaco from 'monaco-editor'

function noop () {}

export { monaco }

export default {
  name: 'MonacoEditor',
  props: {
    diffEditor: { type: Boolean, default: false },
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number], default: '100%' },
    original: String,
    value: String,
    language: { type: String, default: 'sql' },
    theme: { type: String, default: 'vs' },
    options: {
      type: Object,
      default () {
        return {
        }
      }
    },
    editorMounted: { type: Function, default: noop },
    editorBeforeMount: { type: Function, default: noop }
  },

  watch: {
    options: {
      deep: true,
      handler (options) {
        this.editor && this.editor.updateOptions(options)
      }
    },
    value () {
      this.editor &&
        this.value !== this._getValue() &&
        this._setValue(this.value)
    },
    language () {
      if (!this.editor) return
      if (this.diffEditor) {
        const { original, modified } = this.editor.getModel()
        monaco.editor.setModelLanguage(original, this.language)
        monaco.editor.setModelLanguage(modified, this.language)
      } else {
        monaco.editor.setModelLanguage(this.editor.getModel(), this.language)
      }
    },
    theme () {
      this.editor && monaco.editor.setTheme(this.theme)
    },

    style () {
      this.editor && this.$nextTick(() => {
        this.editor.layout()
      })
    }
  },

  computed: {
    style () {
      return {
        width: !/^\d+$/.test(this.width) ? this.width : `${this.width}px`,
        height: !/^\d+$/.test(this.height) ? this.height : `${this.height}px`
      }
    }
  },
  mounted () {
    console.log('Init monaco')
    this.initMonaco()
  },
  beforeDestroy () {
    this.editor && this.editor.dispose()
  },
  methods: {
    initMonaco () {
      const { value, language, theme, options } = this
      Object.assign(options, this._editorBeforeMount())
      this.editor = monaco.editor[ this.diffEditor ? 'createDiffEditor' : 'create' ](this.$el, {
        value: value,
        language: language,
        theme: theme,
        ...options
      })
      this._registerCompletionItemProvider()
      this.diffEditor && this._setModel(this.value, this.original)
      this._editorMounted(this.editor)
    },
    _createDependencyProposals () {
        // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
        // here you could do a server side lookup
        return [
          {
            label: '"select"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Select keyword",
            insertText: 'select'
          },
          {
            label: '"from"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "From keyword",
            insertText: 'from'
          }
        ]
    },
    _registerCompletionItemProvider () {
      monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems: (model, position) => {
          // find out if we are completing a property in the 'dependencies' object.
          var textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
          var suggestions =  this._createDependencyProposals()
          return {
            suggestions: suggestions
          }
        }
      })
    },
    _getEditor () {
      if (!this.editor) return null
      return this.diffEditor ? this.editor.modifiedEditor : this.editor
    },
    _setModel (value, original) {
      const { language } = this
      const originalModel = monaco.editor.createModel(original, language)
      const modifiedModel = monaco.editor.createModel(value, language)
      this.editor.setModel({
        original: originalModel,
        modified: modifiedModel
      })
    },
    _setValue (value) {
      let editor = this._getEditor()
      if (editor) return editor.setValue(value)
    },
    _getValue () {
      let editor = this._getEditor()
      if (!editor) return ''
      return editor.getValue()
    },
    _editorBeforeMount () {
      const options = this.editorBeforeMount(monaco)
      return options || {}
    },
    _editorMounted (editor) {
      this.editorMounted(editor, monaco)
      if (this.diffEditor) {
        editor.onDidUpdateDiff(event => {
          const value = this._getValue()
          this._emitChange(value, event)
        })
      } else {
        editor.onDidChangeModelContent(event => {
          const value = this._getValue()
          this._emitChange(value, event)
        })
      }
    },
    _emitChange (value, event) {
      this.$emit('change', value, event)
      this.$emit('input', value)
    }
  }
}
</script>
