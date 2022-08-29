













<template>
  <div id="lazy-select">
    <el-select
      v-load-more="loadmore"
      v-model="value"
      v-bind="binds"
      :remote-method="remoteMethod"
      @focus="handleFocus"
      @change="handleChange"
      :loading="loading"
    >
      <el-option
        v-for="item in options"
        :label="item.name + ' /' + item.orderUnitName"
        :value="item.skuId"
        :key="item.productId + '_' + item.skuId"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { throttle } from 'utils/fun'
import { addStore } from 'api/market'

export default {
  data() {
    return {
      value: [],
      options: [],
      loading: false,
      baseSearchData: {
        size: 10,
        current: 1,
      },
    }
  },
  props: {
    binds: {
      type: Object,
      default: () => ({
        multiple: false,
        filterable: false,
        remote: false,
        reserveKeyword: false,
        placeholder: '请输入关键词',
        disabled: false,
      }),
    },
    searchData: {
      type: Object,
      default: () => null,
    },
    option: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value',
        key: 'index',
        api: '',
      }),
    },
  },
  directives: {
    loadMore: {
      bind(el, binding) {
        console.log(el, binding, 'cs')

        const rootDom = el.querySelector('.el-select-dropdown__wrap')

        const option = {
          root: rootDom,
          rootMargin: '0px 0px 0px 0px',
          thresholds: 1,
        }
        const io = new IntersectionObserver((entry) => {
          entry.forEach((e) => {
            const { target } = e
            throttle(binding.value(), 500)
            io.unobserve(target)
          })
        }, option)
        rootDom.addEventListener('scroll', throttle(() => {
          const elements = Array.from(rootDom.querySelectorAll('li'))
          elements.forEach((li, index, arr) => {
            if (index === arr.length - 1) {
              io.observe(li)
            } else {
              io.unobserve(li)
            }
          })
        }, 1000))
      },
    },
  },
  mounted() {
    // console.log(this.option, 'xxxxxxxxx');
    // console.log(this.option.label.split('.'), 'yyyyyyyyyy');
  },
  methods: {
    loadmore() {
      console.log('loadmore')
      this.baseSearchData.current += 1
      addStore({
        ...this.searchData,
        ...this.baseSearchData,
      })
        .then((res) => {
          this.options = [...this.options, ...res.data.records]
          console.log(this.options, 'yyyyyyyyy')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    remoteMethod(query) {
      console.log(query, 'query')
    },
    handleFocus() {
      addStore({
        ...this.searchData,
        ...this.baseSearchData,
      })
        .then((res) => {
          this.options = res.data.records
          console.log(this.options, 'xxxxxxx')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleChange(val) {
      console.log(val, 'handleChange')
    },
  },
}
</script>

