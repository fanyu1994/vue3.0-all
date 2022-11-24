<script lang="ts" setup>
import { getCurrentInstance, onMounted } from 'vue'
onMounted(() => {
  const instance = getCurrentInstance()
  console.log(instance, 'instance')

  const chart = instance?.appContext?.config.globalProperties.$echarts.init(
    document.querySelector('#histogram')
  )

  let option = {
    title: {
      text: 'ECharts 点击事件',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  }
  chart.setOption(option)
  chart.on('click', (p: any) => {
    console.log(p)
    if (p.name === '裤子') {
      option.series[0].data[option.xAxis.data.findIndex((e) => e === p.name)] =
        Math.random() * 50
      chart.setOption(option)
    }
  })
})
</script>
<template>
  <div id="histogram">histogram
  </div>
</template>
<style lang="less" scoped>
#histogram {
  width: 100%;
  height: 100%;
}
</style>
