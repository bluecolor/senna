<template lang="pug">
  .activity-bar.bg-grey-9
    connection-manager(v-if='isConnectionManagerVisible'
      @close='isConnectionManagerVisible=false'
      ref='connection')
    q-btn.q-mt-sm(flat round :color="active === 2 ? 'white' : 'grey-5'" icon="far fa-compass" @click='onFiles')
    q-btn.q-mt-sm(flat round :color="active === 2 ? 'white' : 'grey-5'" icon="o_folder" @click='onFiles')
    q-space
    connection-button.connections(
      @manage-connections='isConnectionManagerVisible=true'
    )
    q-btn.settings(flat round icon="fas fa-cog" color='white' @click='onDatabaseNav')
</template>

<script>
import { mapActions } from 'vuex'
import ConnectionButton from './ConnectionButton'
import ConnectionManager from '@/components/ConnectionManager'

export default {
  components: {
    ConnectionButton,
    ConnectionManager
  },
  data () {
    return {
      isConnectionManagerVisible: false,
      active: 1
    }
  },
  methods: {
    ...mapActions('connection', {
      'findAllConnections': 'findAll'
    }),
    ...mapActions('app', [
      'openConnection'
    ]),
    onDatabaseNav () {
      this.onClick(1)
    },
    onFiles () {
      this.onClick(2)
    },
    onEditConnection (connection) {
      this.isConnection = true
      setTimeout(() => {
        this.$refs['connection'].load(connection)
      }, 20)
    },
    onClick (i) {
      if (this.active === i) {
        this.active = undefined
        this.$emit('hide-navigator')
      } else {
        this.active = i
        this.$emit('show-navigator')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-bar {
  padding-top: 10px;
  padding-left: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50px;
  .settings {
    margin-top: auto;
    margin-bottom: 10px;
  }
  .connections {
    margin-top: auto;
    margin-bottom: 10px;
  }
  .q-item__section--avatar {
    min-width: 32px !important;
  }
}
</style>
