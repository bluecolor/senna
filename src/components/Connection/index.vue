<template lang="pug">
q-dialog(
  v-model='visible' persistent='',  transition-hide='flip-up' @close='onClose')
  q-card(style='min-height: 50vh; min-width: 60vh;')
    q-bar.bg-primary.text-white
      div Connection
      q-space
      q-btn(dense round flat icon='close', @click='onClose')
    q-banner.text-white.bg-green(v-if='isSuccess' inline-actions)
      | Success.
      template(v-slot:action='')
        q-btn(flat='', color='white', label='Dismiss' @click='onDisMiss')
    q-banner.text-white.bg-red(v-if='isError' inline-actions)
      | Error.
      | {{errorMessage}}
      template(v-slot:action='')
        q-btn(flat='', color='white', label='Dismiss' @click='onDisMiss')
    q-card-section(style='min-height: 50vh; min-width: 60vh;')

      q-form.q-gutter-md
        q-input(dense outlined v-model="name" label="Name" placeholder='Connection name')
        .host-port-container
          q-input.host.q-mr-md(dense outlined v-model="host" label="Host" placeholder='Host or ip')
          q-input.port(type='number' dense outlined v-model="port" label="Port" placeholder='Port number')
        .database-container
          q-input.database.q-mr-md(dense outlined v-model="database" label="Database")
          q-select.service(options-dense dense outlined v-model="serviceSid" :options="serviceSidOptions")
        q-input(dense outlined v-model="username" label="Username" )
        q-input(type='password' dense outlined v-model="password" label="Password" )
    q-card-actions(align="right")
      q-btn(dense, flat color="primary" @click='onClose') Close
      q-btn(dense, flat color="primary" @click='onTest') Test
      q-btn(dense, flat color="primary" :loading='isSaveLoading' @click='onSave' ) Save
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      errorMessage: '',
      isSuccess: false,
      isError: false,
      isTestLoading: false,
      isSaveLoading: false,
      visible: true,
      serviceSid: 'Service Name',
      serviceSidOptions: [
        'Service Name', 'SID'
      ],
      id: undefined,
      name: '',
      host: 'localhost',
      port: 1530,
      database: 'orcl',
      username: 'fstest',
      password: 'fstest'
    }
  },
  methods: {
    ...mapActions('connection', [
      'test', 'create', 'update'
    ]),
    async onTest () {
      this.isSaveLoading = true
      const host = this.host
      const port = this.port
      const database = this.database
      const username = this.username
      const password = this.password
      const result = await this.test({ host, port, database, username, password })
      this.isSaveLoading = false
      if (result.success) {
        this.isError = false
        this.isSuccess = true
      } else {
        this.isSuccess = false
        this.isError = true
        this.errorMessage = result.error
      }
    },
    onSave () {
      this.isSaveLoading = true
      const name = this.name
      const host = this.host
      const port = this.port
      const database = this.database
      const username = this.username
      const password = this.password
      const payload = {
        id: this.id, name, host, port, database, username, password
      }
      try {
        if (this.id) {
          this.onUpdate(payload)
        } else {
          this.onCreate(payload)
        }
      } catch (e) {
        this.isError = true
        this.errorMessage = e.message
        console.log(e.message)
      }

      this.isSaveLoading = false
    },
    onCreate (payload) {
      this.create(payload)
      this.onClose()
    },
    onUpdate (payload) {
      this.update(payload)
      this.onClose()
    },
    onDisMiss () {
      this.isError = this.isSuccess = false
    },
    onClose () {
      this.$emit('close')
    },
    load (connection) {
      this.id = connection.id
      this.name = connection.name
      this.host = connection.host
      this.port = connection.port
      this.database = connection.database
      this.username = connection.username
      this.password = connection.username
    }
  }
}
</script>

<style lang="scss" scoped>
.host-port-container {
  display: flex;
  .host {
    flex-grow: 1;
  }
  .port {
    width: 150px;
  }
}

.database-container {
  display: flex;
  .database {
    flex-grow: 1
  }
  .service {
    width: 150px;
  }
}

</style>
