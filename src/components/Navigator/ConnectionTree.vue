<template lang='pug'>
.q-gutter-sm(@contextmenu="onContextMenu($event)")
  q-dialog(v-model='isConfirm', persistent)
    q-card(style='min-width:50vh;')
      q-card-section.row.items-center()
        q-avatar(icon='delete', color='red-4', text-color='white')
        span.q-ml-sm Delete connection ?
      q-card-actions(align='right')
        q-btn(flat, label='No', color='primary', v-close-popup)
        q-btn(flat, label='Yes', color='primary', v-close-popup @click='onDelete')

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
  connection-context-menu(@select='onContextMenuSelect')

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
    onContextMenuSelect (command) {
      switch (command) {
        case 'delete': this.isConfirm = true; break
        case 'edit': this.onEditConnection(); break
        case 'duplicate': this.onDuplicateConnection(); break
      }
    },
    onContextMenu (e) {
      this.contextMenuTarget = e.target.innerText
    },
    onLazyLoad () {
    },
    onDelete () {
      const { id } = _.find(this.connections, { name: this.contextMenuTarget })
      this.destroy(id)
    },
    onEditConnection () {
      const connection = _.find(this.connections, { name: this.contextMenuTarget })
      this.$emit('edit-connection', connection)
    },
    onDuplicateConnection () {
      let connection = _.chain(this.connections)
        .find({ name: this.contextMenuTarget })
        .cloneDeep()
        .value()

      const makeName = (name) => {
        let c = _.find(this.connections, { name })
        if (c === undefined) {
          return name
        } else {
          return makeName(`Copy of ${name}`)
        }
      }

      connection.name = makeName(`Copy of ${connection.name}`)
      this.create(connection)
    }
  },
  mounted () {
    this.findAll()
  }
}
</script>
