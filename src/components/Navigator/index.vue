<template lang="pug">
.navigator-container
  connection(v-if='isConnection' @close='isConnection=false')
  q-bar.bg-grey-9.nav-bar
    q-btn(dense round flat icon='add' size='10.5px' color='white' @click='isConnection=true')
    q-btn(dense round flat icon='refresh' size='10.5px' color='white' @click='isConnection=true')
    q-space
    q-btn(dense round flat icon='keyboard_arrow_left' size='10.5px' color='white')
  connection-tree
</template>

<script>
import Connection from '@/components/Connection'
import ConnectionTree from './ConnectionTree'

export default {
  components: {
    Connection,
    ConnectionTree
  },
  data () {
    return {
      isConnection: false
    }
  }
}
</script>

<style lang="scss" scoped>

.navigator-container {
  .nav-bar {
    padding-right:5px;
    padding-left:5px;
    min-height: 37px;
  }
}

</style>
