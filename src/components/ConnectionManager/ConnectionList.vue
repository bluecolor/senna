<template lang="pug">
.connection-list-container
  q-toolbar.bg-white.toolbar
    q-btn(flat dense round icon='add' style='margin-right:10px;')
    q-input.search(borderless dense v-model='search' placeholder='Search ...' )
  q-list.no-trans(dense separator)
    q-item.connection-item(v-for='c in _connections' clickable, v-ripple :key='c.id' @click="onMenu('edit', c)")
      q-item-section {{c.name}}
      q-space
      q-item-section.delete-btn(avatar @click.stop)
        q-btn(icon='more_vert' flat round)
          q-menu(touch-position)
            q-list(dense, style='min-width: 200px')
              q-item(clickable, v-close-popup @click="onMenu('duplicate', c)")
                q-item-section Duplicate
              q-item(clickable, v-close-popup @click="onMenu('edit', c)")
                q-item-section Edit
              q-item(clickable, v-close-popup @click="onMenu('delete', c)")
                q-item-section.text-red-9() Delete
</template>

<script>

import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      search: undefined
    }
  },
  computed: {
    ...mapGetters('connection', [
      'connections'
    ]),
    _connections () {
      if (!this.search) {
        return this.connections
      }
      return _.filter(this.connections, c => {
        if (c.name && c.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
          return true
        }
      })
    }
  },
  methods: {
    onMenu (event, connection) {
      this.$emit(event, connection)
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-btn {
  visibility: hidden;
}
.connection-item {
  padding-right: 3px;
}
.connection-item:hover {
  .delete-btn {
    visibility: visible;
  }
}
.no-trans *{
  -moz-transition: none;
  -webkit-transition: none;
  -o-transition: color 0 ease-in;
  transition: none;
}

.toolbar {
  border-bottom: 1px solid #ccc;
}

</style>
