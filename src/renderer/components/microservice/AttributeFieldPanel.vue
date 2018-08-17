<template>
  <v-layout row wrap class="mb-3">
    <v-flex xs3 class="text-xs-right subheading mt-1 pr-4">
      <v-tooltip top v-if="attribute.required">
        <v-icon small slot="activator"
          style="font-size: 8pt; vertical-align: top;" class="red--text">
          fa-asterisk
        </v-icon>
        <span>Attribute is required</span>
      </v-tooltip>
      <strong>{{ attribute.name }}</strong>:
      <v-tooltip right>
        <v-icon class="grey--text text--lighten-2"
          style="font-size: 11pt; margin-top: -2px;" slot="activator">
          fa-question-circle
        </v-icon>
        <span>{{ attribute.description }}</span>
      </v-tooltip>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-if="readOnly" :required="attribute.required"
        v-model="displayValue" hide-details single-line disabled>
      </v-text-field>
      <v-select v-else-if="attribute.choices"
        :items="attribute.choices" hide-details v-model="editedConstValue"
        item-text="name" item-value="value">
      </v-select>
      <v-text-field v-else-if="attribute.type === 'String'"
        :required="attribute.required" v-model="editedConstValue"
        hide-details single-line>
      </v-text-field>
      <v-text-field v-else-if="attribute.type === 'Integer'"
        :required="attribute.required" type="number"
        v-model="editedConstValue" hide-details single-line>
      </v-text-field>
      <v-switch v-else-if="attribute.type === 'Boolean'"
        :label="attribute.name" v-model="editedBooleanValue" hide-details>
      </v-switch>
      <device-type-selector
        v-else-if="attribute.type === 'DeviceTypeReference'"
        v-model="editedConstValue">
      </device-type-selector>
      <customer-selector v-else-if="attribute.type === 'CustomerReference'"
        v-model="editedConstValue">
      </customer-selector>
      <area-selector v-else-if="attribute.type === 'AreaReference'"
        v-model="editedConstValue">
      </area-selector>
      <scripts-selector v-else-if="attribute.type === 'Script'"
        v-model="editedConstValue" :identifier="identifier" 
        :tenantToken="tenantToken">
      </scripts-selector>
    </v-flex>
    <v-flex xs3 class="pl-2">
      <span v-if="readOnly && editedEnvVar">
        <strong>Env Var</strong>: {{editedEnvVar}}
      </span>
      <v-text-field v-else-if="!readOnly" v-model="editedEnvVar"
        hide-details placeholder="Env Variable">
      </v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
import DeviceTypeSelector from '../devicetypes/DeviceTypeSelector'
import CustomerSelector from '../customers/CustomerSelector'
import AreaSelector from '../areas/AreaSelector'
import ScriptsSelector from '../microservice/ScriptsSelector'

export default {

  data: () => ({
    editedBooleanValue: true,
    editedConstValue: null,
    editedEnvVar: null,
    displayValue: null
  }),

  components: {
    DeviceTypeSelector,
    CustomerSelector,
    AreaSelector,
    ScriptsSelector
  },

  props: ['attribute', 'readOnly', 'identifier', 'tenantToken'],

  watch: {
    attribute: {
      immediate: true,
      handler (attr, old) {
        let val = attr ? attr.value : null
        if (val && val.startsWith('${') && val.endsWith('}')) {
          let content = val.substring(2)
          content = content.substring(0, content.length - 1)
          let parts = content.split(':')
          this.$data.editedBooleanValue = parts[1] && parts[1] === 'true'
          this.$data.editedConstValue = parts[1]
          this.$data.editedEnvVar = parts[0]
          this.$data.displayValue = parts[1]
        } else {
          this.$data.editedBooleanValue = val && val === 'true'
          this.$data.editedConstValue = val
          this.$data.editedEnvVar = null
          if (!val && this.readOnly && attr.default) {
            this.$data.displayValue = '(Defaulted to ' + attr.default + ')'
          } else {
            this.$data.displayValue = val
          }
        }
      }
    },

    /** Push update */
    editedBooleanValue: function (val) {
      this.$data.editedConstValue = '' + val
      this.onValueUpdated()
    },

    /** Push update */
    editedConstValue: function (val) {
      this.onValueUpdated()
    },

    /** Push update */
    editedEnvVar: function (val) {
      this.onValueUpdated()
    }
  },

  methods: {
    onValueUpdated: function () {
      let val = this.$data.editedConstValue
      let env = this.$data.editedEnvVar
      let newValue

      if (val && (val.length > 0)) {
        newValue = env ? '${' + env + ':' + val + '}' : val
      } else {
        newValue = env ? '${' + env + '}' : null
      }

      if (newValue && newValue !== this.attribute.value) {
        var updated = {}
        updated.attribute = this.attribute
        updated.oldValue = this.attribute.value
        updated.newValue = newValue
        this.$emit('attributeUpdated', updated)
      }
    }
  }
}
</script>

<style scoped>
.input-group {
  padding: 0;
  margin: 0;
}
</style>
