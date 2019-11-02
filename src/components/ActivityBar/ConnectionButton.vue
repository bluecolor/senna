<template lang="pug">
q-btn(flat round color="white" icon="fas fa-database")
  q-menu(anchor="top right")
    q-list(dense style='min-width: 200px')
      q-item(v-for="c in connections" clickable, v-close-popup @click='onConnection(c)')
        q-item-section {{ c.name }}
      q-separator
      q-item(clickable, v-close-popup @click='onManageConnections')
        q-item-section Manage Connections
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { EventBus } from '@/util/event-bus.js'

export default {
  computed: {
    ...mapGetters('connection', [
      'connections'
    ])
  },
  methods: {
    ...mapActions('connection', [
      'connect'
    ]),
    ...mapActions('editor', [
      'openConnection'
    ]),
    async onConnection ({ id }) {
      EventBus.$emit('loading', true)
      try {
        await this.connect(id)
        this.openConnection(id)
      } catch (e) {
        EventBus.$emit('exception', e)
      } finally {
        EventBus.$emit('loading', false)
      }
    },
    onManageConnections () {
      this.$emit('manage-connections')
    }
  }
}
</script>
