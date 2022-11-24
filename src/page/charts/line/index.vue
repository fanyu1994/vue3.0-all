<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
const instacne = getCurrentInstance()
const line = ref(null)
function genData(n: number): any {
  const d = ['范宇', '超人', '恶魔', '逗你玩', 'tmd']
  const rN = (obj: Array<any>) => {
    return Math.round(Math.random() * obj.length)
  }
  const c = rN(d)
  const xA = Array.from(
    new Array(n),
    (_, i) => `${d[Math.round(Math.random() * 4)]}_${i}`
  )

  return {
    xA,
  }
}
function randomOption(n: number, option: any) {
  option.series.forEach((e: any) => {
    e.data = Array.from(new Array(n), () => Math.round(Math.random() * 450))
  })
}
onMounted(() => {
  const chart = instacne?.appContext.config.globalProperties.$echarts.init(
    line.value
  )
  const { xA } = genData(10)
  const love = ['我', '爱', '中', '国', '!']
  const option = {
    title: {
      text: 'Stacked Area Chart',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: love,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xA,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: love[0],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: love[1],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: love[2],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: love[3],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: love[4],
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  }

  let option2 = {
    title: {
      text: 'ECharts 点击事件',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '帽子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 51],
      },
    ],
  }
  randomOption(xA.length, option)
  chart.setOption(option)
  chart.on('click', function (item: any) {
    console.log(item)
    if (item.seriesType === 'line') {
      option2.series[0].data = option.series[item.seriesIndex].data
      option2.series[0].name = item.seriesName
      option2.legend.data[0] = item.seriesName
      chart.clear()
      chart.setOption(option2)
    } else {
      chart.clear()
      chart.setOption(option)
    }
  })
  chart.getZr().on('click', function (item: any) {
    console.log(item)
  })
})
</script>
<template>
  <div id="line" ref="line">line</div>
</template>
