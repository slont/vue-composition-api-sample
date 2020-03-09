import {computed, Ref} from '@vue/composition-api'
import {Selectable} from '@/types'

export default (itemsRef: Ref<Selectable[]>) => {
  const selectedFlag = computed(() => {
    if (itemsRef.value.length && itemsRef.value.every((item: Selectable) => item.selected)) {
      return 2
    } else if (itemsRef.value.some((item: Selectable) => item.selected)) {
      return 1
    }
    return 0
  })

  function checkAll(flag: number) {
    itemsRef.value.forEach((operable: Selectable) => operable.selected = 2 === flag)
  }

  return {
    selectedFlag,
    checkAll
  }
}
