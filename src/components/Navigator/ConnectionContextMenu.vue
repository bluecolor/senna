<template lang="pug">
q-menu(touch-position, context-menu)
  q-list(dense, style='min-width: 200px')
    q-item(clickable, v-close-popup)
      q-item-section New Editor
    q-separator
    q-item(clickable, v-close-popup)
      q-item-section Duplicate
    q-item(clickable, v-close-popup)
      q-item-section Edit
    q-item(clickable, v-close-popup)
      q-item-section Delete
    q-separator
    q-item(clickable, v-close-popup)
      q-item-section Connect
    q-item(clickable, v-close-popup)
      q-item-section Disconnect

</template>

<script>
export default {

}
</script>
