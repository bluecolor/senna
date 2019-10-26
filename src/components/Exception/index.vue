<template lang="pug">
q-dialog(v-model='visible' persistent)
  q-card()
    q-bar.bg-red-8
      div.text-white Exception
      q-space
      q-btn.q-mr-sm(round dense, flat, icon='o_file_copy', color='white' @click='onCopy')
        q-tooltip
          | Copy message
      q-btn(round dense, flat, icon='close', @click='onClose' color='white')
    q-card-section(style='width:500px; height:200px;')
      | {{ exception }}
</template>

<script>
import clipboard from '@/util/clipboard'

export default {
  props: {
    exception: { type: String, required: false },
    visible: { type: Boolean, default: true }
  },
  methods: {
    onCopy (e) {
      clipboard(this.exception, e)
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
