<template lang="pug">
q-dialog.bg-white(
  v-model='visible' persistent,  transition-hide='flip-up' @close='onClose'
)
  q-dialog(v-model='isConfirm', persistent)
    q-card(style='min-width:50vh;')
      q-card-section.row.items-center()
        q-avatar(icon='delete', color='red-4', text-color='white')
        span.q-ml-sm Delete connection ?
      q-card-actions(align='right')
        q-btn(flat, label='No', color='primary', v-close-popup)
        q-btn(flat, label='Yes', color='primary', v-close-popup @click='onDelete')

  q-layout.rounded-borders.bg-white(view='hHh Lpr lff', container, style='max-height: 60vh; min-width: 90vh;')
    q-header(dense :height-hint='20')
      q-toolbar.cm-toolbar()
        q-btn(flat, @click='drawerLeft = !drawerLeft', round, dense, icon='menu')
        div.title Connection Manager
        q-space
        q-btn(dense round flat icon='close', @click='onClose')
    q-drawer(v-model='drawerLeft', show-if-above, bordered, :width='300', :breakpoint='500', content-class='white')
      q-scroll-area.fit
        connection-list(
          @edit='onEdit',
          @delete='onDeleteConfirm',
          @duplicate='onDuplicate'
        )
    q-page-container.bg-white
      q-form.q-gutter-md.q-pa-md
        q-input(dense outlined v-model="name" label="Name" placeholder='Connection name')
        .host-port-container
          q-input.host.q-mr-md(dense outlined v-model="host" label="Host" placeholder='Host or ip')
          q-input.port(type='number' dense outlined v-model="port" label="Port" placeholder='Port number')
        .database-container
          q-input.database.q-mr-md(dense outlined v-model="database" label="Database")
          q-select.service(options-dense dense outlined v-model="serviceSid" :options="serviceSidOptions")
        q-input(dense outlined v-model="username" label="Username" )
        q-input(type='password' dense outlined v-model="password" label="Password" )
    q-footer.bg-white.cm-footer
      .row
        q-space
        q-btn.cm-action-btn(dense, flat color="primary" @click='onClose') Close
        q-btn.cm-action-btn(dense, flat color="primary" @click='onTest') Test
        q-btn.cm-action-btn(dense, flat color="primary" :loading='isSaveLoading' @click='onSave' ) Save

</template>

<script>

import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import ConnectionList from './ConnectionList'

export default {
  components: {
    ConnectionList
  },
  data () {
    return {
      connection: undefined,
      isConfirm: false,
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
      password: 'fstest',
      drawer: false,
      drawerLeft: false,
      drawerRight: false
    }
  },
  computed: {
    ...mapGetters('connection', [
      'connections'
    ])
  },
  methods: {
    ...mapActions('connection', [
      'test', 'create', 'update', 'destroy'
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
    onDeleteConfirm (connection) {
      this.connection = connection
      this.isConfirm = true
    },
    onDelete () {
      const { id } = this.connection
      this.destroy(id)
      this.isConfirm = false
    },
    onEdit (connection) {
      const c = _.cloneDeep(connection)
      this.id = c.id
      this.name = c.name
      this.host = c.host
      this.port = c.port
      this.database = c.database
      this.username = c.username
      this.password = c.password
    },
    onDuplicate (c) {
      let connection = _.cloneDeep(c)

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
    onDismiss () {
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

.cm-toolbar {
  min-height: 40px;
  .title {
    font-size: 16px;
    margin-left: 10px;
  }
}
.cm-footer {
  height: 50px;
  padding: 10px;
  .row {
    height: 100%;
    .cm-action-btn {
      margin-left: 10px;
    }
  }
}

</style>
