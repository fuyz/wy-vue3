<template>
  <van-pull-refresh v-model="state.refreshing" @refresh="loadNew">
    <van-list class="listWrap" ref="vanListRef" @load="loadMore" v-model:loading="state.loading"
      :finished="state.finished" finished-text="没有更多了" :autoFill="false">
      <template v-if="state.dataList.length">
        <div class="newsItem" v-for="(item, index) in state.dataList" :key="index" @click="toDetail(item)">
          <template v-if="item.skipType !== 'live' && item.skipType != 'video'">
            <!--图片新闻-->
            <div class="newsItem-wrap" v-if="item.skipType == 'photoset'">
              <div class="left">
                <h3 class="title">{{ item.title }}</h3>
                <div class="detial">
                  <span class="pubTime">{{ item.mtime.slice(0, -3) }}</span>
                  <span class="reply">{{ item.replyCount }}跟帖</span>
                </div>
              </div>
              <div class="right">
                <img class="newsImg" :data-src="item.imgsrc" alt />
              </div>
            </div>
            <!--文章新闻-->
            <div class="newsItem-wrap" v-if="item.skipType == undefined">
              <!-- <Swiper ref="swiperRef" class="swiper" :modules="state.modules" :effect="'creative'" v-if="item.hasImg"
              :creative-effect="state.effectObj" :grab-cursor="true" :pagination="true" :autoHeight="true">
              <SwiperSlide class="slide"> -->
              <!-- v-for="(item, index) in monthCountData" :key="index" -->
              <!-- <img class="newsImg" v-lazy="item.imgsrc" alt />
              </SwiperSlide>
            </Swiper> -->
              <div class="no-swipe">
                <div class="left" v-if="!item.hasImg">
                  <h3 class="title">{{ item.title }}</h3>
                  <div class="detial">
                    <span class="source">{{ item.source }}</span>
                    <span class="pubTime">{{ item.mtime ? item.mtime.slice(5, -3) : item.ptime.slice(5, -3) }}</span>
                    <span class="reply">{{ item.replyCount }}跟帖</span>
                  </div>
                </div>
                <div class="right" v-if="!item.hasImg">
                  <img class="newsImg" :data-src="item.imgsrc" alt />
                </div>
              </div>
            </div>
            <!--专题新闻-->
            <div class="newsItem-wrap" v-if="item.skipType == 'special'">
              <div class="left">
                <h3 class="title">{{ item.title }}</h3>
                <div class="detial">
                  <span class="special">专题</span>
                  <span class="source">{{ item.source }}</span>
                  <span class="reply">{{ item.replyCount }}跟帖</span>
                </div>
              </div>
              <div class="right">
                <img class="newsImg" :data-src="item.imgsrc" alt />
              </div>
            </div>
            <!--视频新闻-->
            <div class="newsItem-wrap" v-if="item.skipType == 'video'">
              <div class="left">
                <h3 class="title">{{ item.title }}</h3>
                <div class="detial">
                  <span class="pubTime">{{ item.mtime.slice(0, -3) }}</span>
                  <span class="reply">{{ item.replyCount }}跟帖</span>
                </div>
              </div>
              <div class="right">
                <img class="newsImg" :data-src="item.imgsrc" alt />
              </div>
            </div>
          </template>
        </div>
      </template>
      <div v-else class="noData">暂无数据</div>
    </van-list>
  </van-pull-refresh>
</template>
<script setup>
import { onMounted, reactive, defineOptions, onActivated, getCurrentInstance, watch } from 'vue'

import URL_PARAMS from '@/utils/urls-config'
// import Dialog from '@/utils/dialog'
import { apiNewsList } from '@/api'
import { debounce } from '@/utils/tools'

// import { Swiper, SwiperSlide } from 'swiper/swiper-vue'
// import 'swiper/swiper.min.css'
// import 'swiper/modules/effect-creative.min.css'
// import { EffectCreative } from 'swiper/modules'

defineOptions({
  name: 'NewsList',
})

const { proxy } = getCurrentInstance()
const state = reactive({
  dataList: [],
  title: '头条',
  currentUrl: '',
  finished: false,
  loading: false,
  refreshing: false
  // effectObj: {
  //   prev: {
  //     shadow: true,
  //     translate: [0, 0, -400]
  //   },
  //   next: {
  //     translate: ['100%', 0, 0]
  //   }
  // },
  // modules: [EffectCreative],
})

onMounted(() => {
  debugger
  console.log('created')
  state.currentUrl = URL_PARAMS.urlArray[state.title]
  if (state.dataList.length) return
  state.title = proxy.$route.params.type || state.title
  getNewsList()

  console.log('mounted')

  //详情页返回到新闻列表时回到原位置
  // let pageY = this.$store.state.Position[this.title];
  // document.getElementsByClassName('indexWrap')[0].scrollTop = pageY ? pageY.y : 0;
  // const warpEle = document.getElementsByClassName('indexWrap')[0]
  // warpEle.onscroll = debounce(loadImg, 300)
  // proxy.$nextTick(() => {
  //   loadImg()
  // })
})
onActivated(() => {
  console.log('up')
  // loadImg()
})

watch(() => proxy.$route, (val) => {
  state.title = val.params.type
  getNewsList()
})

const loadImg = () => {
  const warpEle = document.getElementsByClassName('indexWrap')[0]
  const imgEleArr = document.querySelectorAll('.indexWrap img')
  const scrollTop = warpEle.scrollTop
  const clientH = document.documentElement.clientHeight
  for (let i = 0; i < imgEleArr.length; i++) {
    const imgEle = imgEleArr[i]
    if (scrollTop + clientH > imgEle.offsetTop - 200) {
      // if (imgEleArr[i].src) continue
      const src = imgEle.getAttribute('data-src')
      src && (imgEle.src = src)
    }
  }
}
/*请求数据*/
const getNewsList = (obj) => {
  if (!obj) {
    state.currentUrl = URL_PARAMS.urlArray[state.title]
    const newsDataMap = proxy.$store.state.news.newsDataMap
    if (newsDataMap[state.title]) {
      //使用缓存数据
      state.dataList = newsDataMap[state.title]
      return
    } else {
      state.dataList = []
    }
  } else if (obj.loadMore) {
    //加载更多
    state.currentUrl = transformUrl(state.currentUrl, 'loadMore')
  } else if (obj.loadNew) {
    //加载更新
    state.currentUrl = transformUrl(state.currentUrl, 'loadNew')
  }
  // Dialog.showLoading(true)
  apiNewsList(state.currentUrl)
    .then((res) => {
      try {
        res = JSON.parse(res.body)
        const urlParamArr = state.currentUrl.split('/')
        const urlKey = urlParamArr[urlParamArr.length - 2]
        const dataArr = res[urlKey]
        if (!dataArr.length) {
          state.finished = true
          return
        }
        if (!obj) {
          state.dataList = dataArr
        } else if (obj.loadMore) {
          // this.dataList = this.dataList.concat(dataArr);
          state.dataList = dataArr
        } else if (obj.loadNew) {
          state.dataList = dataArr.concat(state.dataList)
        }
        //缓存数据
        proxy.$store.commit('setData', {
          type: 'news',
          title: state.title,
          data: state.dataList,
        })
        console.log(['新闻列表', state.currentUrl, state.dataList])

        // function artiList (data) {
        //   return data;
        // }
      } catch (err) {
        console.log(err)
        // Dialog.confirm(
        //   {
        //     message: '网络错误，请刷新重试！',
        //     confirmButtonText: '刷新',
        //   },
        //   () => {
        //     this.getNewsList()
        //   }
        // )
      } finally {
        const loadmore = proxy.$refs.vanListRef
        if (!obj || obj.loadNew) {
          loadmore.onTopLoaded()
        } else if (obj.loadMore) {
          loadmore.onBottomLoaded()
        }
      }
    })
    .finally(() => {
      // Dialog.showLoading(false)
    })
}
/*上拉加载更多*/
const loadMore = () => {
  getNewsList({ loadMore: true })
}
/*下拉刷新*/
const loadNew = () => {
  getNewsList({ loadNew: true })
}
/*跳转-》详情页*/
const toDetail = (obj) => {
  if (obj.specialID) {
    proxy.$router.push({
      name: 'special',
      query: {
        specialID: obj.specialID,
      },
    })
  } else {
    proxy.$router.push({
      name: 'newsDetail',
      query: {
        postid: obj.postid,
        skipID: obj.skipID,
        docid: obj.docid,
        photosetID: obj.photosetID,
        setid: obj.setid,
        skipType: obj.skipType,
      },
    })
  }
}
/*转换url*/
const transformUrl = (url, key) => {
  const urlArr = url.split('/')
  let lastUrlStr = urlArr[urlArr.length - 1]
  const paramsArr = lastUrlStr.split('.')
  let [start, end] = paramsArr[0].split('-')
  if (key === 'loadNew') {
    start = Number(start) + 20
  } else if (key === 'loadMore') {
    end = Number(end) + 20
  }
  paramsArr[0] = start + '-' + end
  lastUrlStr = paramsArr.join('.')
  urlArr[urlArr.length - 1] = lastUrlStr
  const newUrl = urlArr.join('/')
  console.log(newUrl)
  return newUrl
}
</script>
<style scoped lang="scss">
.listWrap {
  .mint-loadmore-content {
    min-height: 80vh;
  }
}

.newsItem {
  min-height: 2rem;
  padding: 0.1rem 0.22rem;
  border-bottom: 1px solid #f5f7f9;
}

.newsItem-wrap {
  display: flex;
  /*height: 2rem;*/
}

.newsItem-wrap .no-swipe {
  height: 2rem;
  display: flex;
}

.left {
  width: 60%;
  padding: 0.1rem 0.1rem 0.1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right {
  width: 40%;
  overflow: hidden;
  padding: 0.1rem 0.1rem 0.1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
  -webkit-line-clamp: 2;
  /*用来限制在一个块元素显示的文本的行数*/
  -webkit-box-orient: vertical;
  margin-top: 0;
  margin-bottom: 5px;
}

.detial {
  line-height: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.special,
.source,
.pubTime,
.reply {
  font-size: 0.2rem;
  color: #999;
  margin-right: 10px;
}

.special {
  color: red;
}

.newsImg {
  vertical-align: -webkit-baseline-middle;
  max-width: 100%;
  /*max-height: 100%;*/
}
</style>
