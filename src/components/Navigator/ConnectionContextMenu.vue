<template lang="pug">
q-menu(touch-position, context-menu )
  q-list(dense, style='min-width: 200px')
    q-item(clickable, v-close-popup @click="onMenu('new-editor')")
      q-item-section() New Editor
    q-separator
    q-item(clickable, v-close-popup @click="onMenu('duplicate')")
      q-item-section Duplicate
    q-item(clickable, v-close-popup @click="onMenu('edit')")
      q-item-section Edit
    q-item(clickable, v-close-popup @click="onMenu('delete')")
      q-item-section.text-red-9() Delete
    q-separator
    q-item(clickable, v-close-popup)
      q-item-section Connect
    q-item(clickable, v-close-popup)
      q-item-section Disconnect

</template>

<script>
export default {
  methods: {
    onMenu (command) {
      this.$emit('select', command)
    }
  }
}
</script>
