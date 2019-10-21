<template lang="pug">
.navigator-container
  connection(v-if='isConnection' @close='isConnection=false' ref='connection')
  q-bar.bg-grey-8.nav-bar
    q-btn(dense round flat icon='add' size='10.5px' color='white' @click='isConnection=true')
    q-btn(dense round flat icon='refresh' size='10.5px' color='white' @click='isConnection=true')
    q-space
  connection-tree(@edit-connection='onEditConnection')
</template>

<script>
import Connection from '@/components/Connection'
import ConnectionTree from './ConnectionTree'
import ActivityBar from '@/components/ActivityBar'

export default {
  components: {
    Connection,
    ConnectionTree,
    ActivityBar
  },
  data () {
    return {
      isConnection: false
    }
  },
  methods: {
    onEditConnection (connection) {
      this.isConnection = true
      setTimeout(() => {
        this.$refs['connection'].load(connection)
      }, 20)
    },
    onToggleContent () {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss" scoped>

.navigator-container {
  height: 100%;
  .nav-bar {
    padding-right:5px;
    padding-left:5px;
    min-height: 37px;
  }
}

</style>
