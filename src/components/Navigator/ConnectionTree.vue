<template lang='pug'>
.q-gutter-sm(@contextmenu="onContextMenu($event)")
  q-tree(
        no-nodes-label=' '
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

</template>

<script>

import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      isConfirm: false,
      contextMenuTarget: undefined,
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
      'findAll', 'destroy', 'create'
    ]),
    onLazyLoad ({ node, key, done, fail }) {
      done()
    }
  },
  mounted () {
    this.findAll()
  }
}
</script>
