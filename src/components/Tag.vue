<template>
  <div class="tabs">
    <el-tag v-for="(item,index) in tags" :key="item.path" :closable="item.name!=='home'"
      :effect="$route.name ===item.name ? 'dark':'plain'" @click="changeMune(item)" @close="handleClose(item,index)" size="small">
      {{ item.name }}
    </el-tag>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'tag',
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations(['closeTag']),
    changeMune(item) {
     //console.log(item);
      this.$router.push({ name: item.name })
    },
    handleClose(item, index) {
      this.closeTag(item)
      const len = this.tags.length
      //删除之后的跳转的逻辑
      //分为激活的tag和未激活的tag两种类型
      if (item.name !== this.$route.name) {
        return
      }
      //表示的是删除的是最后一项
      if (index === len) {
        this.$router.push({
          name:this.tags[index-1].name
        })
      }
      else {
        this.$router.push({
          name:this.tags[index-1].name
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabs{
  padding: 20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}

</style>