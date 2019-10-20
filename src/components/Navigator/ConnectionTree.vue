<template lang='pug'>
.q-gutter-sm(@contextmenu="onContextMenu($event)")
  q-tree(
        :selected.sync="selected"
        :ticked.sync="ticked"
        :expanded.sync="expanded"
        accordion
        tick-strategy='none'
        :nodes="_connections"
        default-expand-all
        node-key="id"
        label-key='name'
        @lazy-load="onLazyLoad")
  connection-context-menu

</template>

<script>

import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'

import ConnectionContextMenu from './ConnectionContextMenu'

export default {
  components: {
    ConnectionContextMenu
  },
  data () {
    return {
      selected: '',
      ticked: [],
      expanded: []
    }
  },
  computed: {
    ...mapGetters('connection', [
      'connections'
    ]),
    _connections () {
      return _.map(this.connections, c => {
        c['lazy'] = true
        return c
      })
    }
  },
  methods: {
    ...mapActions('connection', [
      'findAll'
    ]),
    onContextMenu (e) {
      console.log(e)
    },
    onLazyLoad () {
    }
  },
  mounted () {
    this.findAll()
    console.log(this.connections)
  }
}
</script>
