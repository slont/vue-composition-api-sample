import {reactive, toRefs} from '@vue/composition-api'
import {SetupContext} from '@vue/composition-api/dist/component/component'
import {Item, Selectable} from '@/types'
import ItemApi from '@/apis/ItemApi'

export default ({root}: SetupContext) => {
  const state = reactive({
    items: [] as (Item & Selectable)[],
    isLoading: false
  })
  let isLast = false
  let cursor: string | null = null

  // フェッチ
  function getList() {
    if (isLast || state.isLoading) return

    state.isLoading = true
    return new ItemApi().getList({cursor: cursor}).then((res: any) => {
      state.items.push(...res.data.items)
      if ((cursor = res.data.nextCursor) == null) {
        isLast = true
      }
    }).finally(() => state.isLoading = false)
  }

  // リストアイテムクリック
  async function onClick(item: Item) {
    await root.$router.push(`/items/${item.id}`)
  }

  return {
    getList, onClick,
    ...toRefs(state)
  }
}
