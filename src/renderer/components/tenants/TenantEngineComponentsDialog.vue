<template>
  <base-dialog title="Tenant Engine Runtime State" width="600"
    :visible="dialogVisible" :hideCreate="true" cancelLabel="Close"
    :error="error" @cancelClicked="onCancelClicked">
    <v-tabs v-model="active">
      <v-tabs-bar dark color="primary">
        <v-tabs-item key="components" href="#components">
          Components
        </v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content key="components" id="components">
          <v-card flat>
            <v-card-text>
              <el-tree class="component-tree" ref="tree" default-expand-all
                node-key="componentId" :data="treeData" :props="treeProps"
                :expand-on-click-node="false" @node-click="handleNodeClick">
                <span slot-scope="{ node, data }">
                  <component-status-icon class="mr-1" :status="data.status">
                  </component-status-icon>
                  <span>
                    {{ data.componentName }} ({{ data.status }})
                  </span>
                </span>
              </el-tree>
            </v-card-text>
          </v-card>
          <v-card class="ma-3" v-if="errorItemSelected" raised>
            <v-card-text>
              <div v-for="message in selected.errorStack" :key="message">
                {{ message }}
              </div>
            </v-card-text>
          </v-card>
          <v-card class="ma-3" v-else raised>
            <v-card-text>
              Click components with errors to display details here...
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </base-dialog>
</template>

<script>
import BaseDialog from '../common/BaseDialog'
import ComponentStatusIcon from './ComponentStatusIcon'

export default {

  data: () => ({
    active: null,
    menu: null,
    selected: null,
    treeProps: {
      children: 'childComponentStates',
      label: 'componentName'
    },
    error: null
  }),

  components: {
    BaseDialog,
    ComponentStatusIcon
  },

  props: ['tenantState', 'dialogVisible'],

  computed: {
    treeData: function () {
      return [this.tenantState.componentState]
    },

    errorItemSelected: function () {
      let selected = this.$data.selected
      if (selected && (selected.status === 'LifecycleError')) {
        return true
      }
      return false
    }
  },

  methods: {
    onCancelClicked: function () {
      this.$emit('closeClicked')
    },

    /** Handle tree node clicked */
    handleNodeClick: function (node) {
      this.$data.selected = node
    }
  }
}
</script>

<style scoped>
.component-tree {
  max-height: 400px;
  overflow-y: auto;
}
</style>
