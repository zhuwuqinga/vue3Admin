<template>
  <div>
    <el-autocomplete
      v-model="model"
      :fetch-suggestions="querySearchAsync"
      :clearable="true"
      :value-key="valueKey"
      :style="{ width: width }"
      :disabled="disabled"
      :placeholder="placeholder"
      @select="handleSelect"
      @change="handleChange"
    ></el-autocomplete>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onUpdated,
  computed,
  watch,
  toRefs,
} from 'vue'
export default defineComponent({
  props: {
    model: {
      type: String,
      default: '',
    },
    // 银行列表
    data: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
    // 输入框长度
    width: {
      type: String,
      required: false,
      default: () => {
        return '300px'
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
    // 输入建议对象中用于显示的键名
    valueKey: {
      type: String,
      required: true,
      default: () => {
        return 'bankName'
      },
    },
    // 输入框提示信息
    placeholder: {
      type: String,
      required: false,
      default: () => {
        return '请输入银行名称'
      },
    },
  },
  setup(props: any, context: any) {
    const data = reactive({
      model: props.model,
    })
    // 父组件传值
    let restaurants: Array = reactive([])

    // 监听父组件传入的值
    watch(
      () => props.data,
      (newQuestion, oldQuestion) => {
        restaurants = newQuestion
      }
    )
    // 实时更新v-model值
    watch(
      () => props.model,
      (newQuestion, oldQuestion) => {
        console.log(newQuestion, 'newQuestion')
        data.model = newQuestion
      }
    )

    let timeout: number | undefined
    // 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
    const querySearchAsync = (queryString: any, cb: any) => {
      var results = queryString
        ? restaurants.filter(createFilter(queryString))
        : restaurants

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(results)
      }, 500 * Math.random())
    }
    // 模糊搜索
    const createFilter = (queryString: string) => {
      return (restaurant: { bankName: string }) => {
        return (
          restaurant.bankName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    }
    // 选中之后触发
    const handleSelect = (item: any) => {
      context.emit('handleSelect', item)
    }
    // 修改触发
    const handleChange = (item: any) => {
      context.emit('handleChange', item)
    }

    // 重新获取父组件传过来的值
    const getModel = (val: any) => {
      data.model = val
    }
    return {
      ...toRefs(data),
      restaurants,
      querySearchAsync,
      createFilter,
      handleSelect,
      getModel,
      handleChange
    }
  },
})
</script>
