<template>
  <div id="vue-syntax">
    <h3 class="title is-3">Vue Syntax Ver.</h3>

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
  import Vue from 'vue'
  import {Item, Selectable} from '@/types'
  import ItemApi from '@/apis/ItemApi'

  type Test = Item & Selectable

  export default Vue.extend({
    data() {
      return {
        // データ
        items: [] as Test[],
        isLoading: false,
        // Viewでは使わない
        isLast: false,
        // Viewでは使わない
        cursor: null as string | null
      }
    },
    computed: {
      // for テーブル操作
      selectedFlag() {
        if (this.items.length && this.items.every((item: Selectable) => item.selected)) {
          return 2
        } else if (this.items.some((item: Selectable) => item.selected)) {
          return 1
        }
        return 0
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // for テーブル操作
      checkAll(flag: number) {
        this.items.forEach((item: Selectable) => item.selected = 2 === flag)
      },
      onClick(item: Item) {
        // 前処理してから画面遷移など
        // ...
        this.$router.push(`/items/${item.id}`)
      },
      // Viewでは使わない
      getList() {
        if (this.isLoading || this.isLast) return

        this.isLoading = true
        return new ItemApi().getList({cursor: this.cursor}).then((res: any) => {
          this.items.push(...res.data.items)
          if ((this.cursor = res.data.nextCursor) == null) {
            this.isLast = true
          }
        }).finally(() => this.isLoading = false)
      }
    }
  })
</script>
