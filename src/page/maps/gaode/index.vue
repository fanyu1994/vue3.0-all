<template>
  <span style="margin-right: 10px; font-weight: 900">搜索:</span>
  <el-select
    v-model="mapSearchval"
    filterable
    remote
    reserve-keyword
    placeholder="请输入"
    :remote-method="remoteMethod"
    :loading="mapSearchLoading"
    @change="handleMapSearch"
  >
    <el-option
      v-for="item in mapSearchOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span> {{ `${item.label}` }} </span>
      <span style="font-size: small; color: rgba(0, 0, 0, 0.2)">{{
        item.district
      }}</span></el-option
    >
  </el-select>
  <div
    id="map-container"
    ref="mapContainer"
    style="width: 800px; margin: 10px; padding: 10px; height: 500px"
  ></div>
  <el-form :model="mapForm" :rules="mapRules" ref="mapForm" :inline="true">
    <el-form-item label="纬度坐标" prop="latitude">
      <el-input
        @change="handleChangeLnglat"
        v-model="mapForm.latitude"
        style="width: 250px"
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item label="经度坐标" prop="longitude">
      <el-input
        @change="handleChangeLnglat"
        v-model="mapForm.longitude"
        style="width: 250px"
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input
        :disabled="true"
        type="textarea"
        v-model="mapForm.address"
        style="width: 300px"
        :rows="2"
        placeholder=""
      />
    </el-form-item>
  </el-form>
  <div style="display: flex; justify-content: flex-end">
    <el-button @click="resetMap">取消</el-button>
    <el-button @click="saveMap" type="primary">确定</el-button>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'AddCommodity',
  props: ['type', 'cid', 'siteId'],
  components: {
    addCustomer,
    emptyTable,
  },
  data() {
    return {
      
      addCusVisible: false,
      map: null,
      geocoder: null,
      marker: null,
      markers: [],
      mapVisible: false,
      markerLayer: null,
      loading: false,
      ruleForm: {
        siteId: '',
        routeName: '',
        customer: '',
        pointArea: '',
        address: '',
      },
      rules: {
        siteId: [
          {
            required: true,
            message: '请选择业务线',
            trigger: 'blur',
          },
        ],
        routeName: [
          {
            required: true,
            message: '请输入配送点位名称',
            trigger: 'blur',
          },
        ],
      },
      pointForm: {
        pointName: '',
        pointArea: '',
        pointInfo: {
          address: '',
        },
        customer: '',
      },
      pointRules: {
        pointName: [
          {
            required: true,
            message: '请输入配送点位名称',
            trigger: 'blur',
          },
        ],
      },
      mapSearchval: '',
      mapSearchOptions: [],
      mapSearchLoading: false,
      mapForm: {
        latitude: '',
        longitude: '',
        address: '',
      },
      mapRules: {
        latitude: [
          {
            required: true,
            message: '请输入纬度坐标',
            trigger: 'blur',
          },
        ],
        longitude: [
          {
            required: true,
            message: '请输入经度坐标',
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'blur',
          },
        ],
      },
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      customerColumns: [
        { type: 'checkbox', width: 60 },
        {
          field: 'customerName',
          title: '客户名称',
          minWidth: 180,
        },
        {
          field: 'customerCode',
          title: '客户编码',
          showOverflow: 'tooltip',
          minWidth: 180,
        },
        {
          field: 'customerAbbreviation',
          title: '客户简称',
          showOverflow: 'tooltip',
          minWidth: 180,
        },
        {
          field: 'customerGroup',
          title: '所属客户组',
          showOverflow: 'tooltip',
          minWidth: 180,
        },
        {
          field: 'customerAddress',
          title: '客户地址',
          showOverflow: 'tooltip',
          minWidth: 180,
        },
      ],
      selectItems: [],
      bizList: [],
      customerList: [],
      categoryIdsOption: [],
      showTree: false,
      tableData: [],
      treeList: [],
      oldData: {},
    }
  },
  created() {
    this.openMap()
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.mapSearchLoading = true

        const auto = new AMap.Autocomplete({
          // input: query,
          city: '杭州',
        })
        auto.search(query, (status, result) => {
          console.log(status, result, 102)
          this.mapSearchLoading = false
          if (status === 'complete' && result.info === 'OK') {
            this.mapSearchOptions = result.tips.map((e) => ({
              label: e.name,
              value: e.id,
              ...e,
            }))
          }
        })
      } else {
        this.mapSearchOptions = []
      }
    },
    provinceFn(id) {
      return arealist({ parentId: id })
    },
    addCustomer(rows) {
      console.log('保存点位', rows)
      this.tableData = [...this.tableData, ...rows]
      this.$refs.xTable.updateFooter()
      this.addCusVisible = false
    },
    openMap() {
      this.mapVisible = true
      AMapLoader.load({
        key: 'cc03eb7a05ad02e6df77f0cdd3514e89',
        version: '2.0',
      eslint-disable-next-line max-len
        plugins: ['AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.AutoComplete'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map('map-container', {
            zoom: 11,
            center: [120.2089, 30.246022], // hz
          })
          this.geocoder = new AMap.Geocoder({
            city: '010',
          })
          this.map.on('click', this.mapClickHandler)
          // this.handlebatchPointDraw() // 绘制以前有的点
        })
        .catch((e) => {
          console.log(e)
        })
    },
    handleMapSearch() {
      const item = this.mapSearchOptions.find(
        (e) => e.value === this.mapSearchval
      )
      if (item) {
        this.mapForm.longitude = item.location.lng
        this.mapForm.latitude = item.location.lat
        const lnglat = [item.location.lng, item.location.lat]
        this.handlePointDraw(lnglat)
      }
    },
    mapClickHandler(e) {
      this.mapForm.longitude = e.lnglat.getLng()
      this.mapForm.latitude = e.lnglat.getLat()
      const lnglat = [this.mapForm.longitude, this.mapForm.latitude]
      this.handlePointDraw(lnglat)
    },
    handleChangeLnglat() {
      if (this.mapForm.latitude && this.mapForm.longitude) {
        const lnglat = [this.mapForm.longitude, this.mapForm.latitude]
        this.handlePointDraw(lnglat)
      }
    },
    handlePointDraw(lnglat) {
      if (this.marker) this.map.remove(this.marker)
      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          console.log(result, lnglat, 111)
          this.mapForm.address = result.regeocode.formattedAddress
          const icon = new AMap.Icon({
            // size: new AMap.Size(40, 50),
            image:
              'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
            // imageOffset: new AMap.Pixel(0, -60),
            // imageSize: new AMap.Size(40, 50),
          })
          this.marker = new AMap.Marker({
            position: new AMap.LngLat(
              this.mapForm.longitude,
              this.mapForm.latitude
            ),
            offset: new AMap.Pixel(-25, -60),
            icon, // 添加 Icon 实例
            title: result.regeocode.formattedAddress,
          })
          this.map.setZoomAndCenter(16, lnglat)
          this.map.add(this.marker)
        }
      })
    },
    handlebatchPointDraw() {
      const points = [
        [120.474632, 30.357086],
        [120.003593, 30.30434],
        [120.405967, 30.12752],
        [120.443733, 30.354716],
        [120.456779, 30.299597],
      ]
      // 获取点群坐标
      points.forEach((e) => {
        const marker = new AMap.Marker({
          position: e,
          title: e.name || '哈哈哈',
          map: this.map,
        })
        this.markers.push(marker)
      })
    },
    resetMap() {
      this.mapForm = { latitude: '', longitude: '', address: '' }
      this.$refs.mapForm.resetFields()
      this.mapVisible = false
    },
    saveMap() {
      this.ruleForm.address = this.mapForm.address
      this.resetMap()
    },

}
</script>
<style lang="less" scoped>
</style>
