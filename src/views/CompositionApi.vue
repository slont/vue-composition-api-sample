<template>
  <div id="composition-api">
    <h3 class="title is-3">Composition API Ver.</h3>

    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th class="cell-checkbox">
          <b-checkbox :value="selectedFlag" :true-value="2" :false-value="0" :indeterminate="1 === selectedFlag"
                      @input="checkAll"/>
        </th>
        <th class="cell-name">名前</th>
      </tr>
      </thead>

      <tbody v-if="isLoading"><tr><td>読み込み中</td></tr></tbody>
      <tbody v-else>
      <tr v-for="item in items" :key="item.id">
        <td class="cell-checkbox">
          <b-checkbox v-model="item.selected"/>
        </td>
        <td class="cell-name" @click="onClick(item)">
          {{ item.name }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'
  import ItemModule from '@/modules/item'
  import TableModule from '@/modules/table'

  export default defineComponent({
    setup(props, ctx) {
      const itemModule = ItemModule(ctx)
      const tableModule = TableModule(itemModule.items)

      /** Init **/
      itemModule.getList()

      return {
        ...itemModule,
        ...tableModule,
      }
    }
  })
</script>
