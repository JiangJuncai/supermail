<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" />
      <detail-param-info :param-info="itemParams" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {}
    }
  },
  created() {
    // 1、保存存入的iid
    this.iid = this.$route.params.iid

    // 2、根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 1、获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      // 2、获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // 3、获取店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 4、获取商品详情
      this.detailInfo = data.detailInfo
      // 5、获取商品参数信息
      this.itemParams = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>