<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :placeholder="inputPlaceholder" :value="inputVal"
             @change="ChangeInputVal"/>
    <a-button type="primary" @click="addItems">添加事项</a-button>

    <a-list bordered :dataSource="showInfo" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>(cStatusChange(e,item.id))">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unChecked }}条未完成</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="primaryKey==='0'?'primary':'default'" @click="primaryItem('0')">全部</a-button>
          <a-button :type="primaryKey==='1'?'primary':'default'" @click="primaryItem('1')">未完成</a-button>
          <a-button :type="primaryKey==='2'?'primary':'default'" @click="primaryItem('2')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click.prevent="ClearChecked">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputVal', 'inputPlaceholder', 'primaryKey']),
    ...mapGetters(['unChecked', 'showInfo'])
  },
  methods: {
    //监听搜索文本框的值的变化
    ChangeInputVal(res) {
      console.log(res.target.value);
      this.$store.commit('setInputVal', res.target.value);
    },
    addItems() { // 添加input中的值到state的list中
      if (this.inputVal.trim().length <= 0) {
        return this.$message.warning('输入的值不能为空！', 1);
      }
      this.$store.commit('addItemList');
    },
    removeItem(id) {//点击删除按钮，删除对应的item项
      this.$store.commit('removeItems', id);
    },
    cStatusChange(e, id) {
      // console.log(e.target.checked);
      // console.log(id);
      const checkParam = {
        id: id,
        done: e.target.checked
      };
      this.$store.commit('CheckedChangeStatus', checkParam);
    },
    ClearChecked() {
      this.$store.commit('ClearCheckedItem')
    },
    primaryItem(e) {
      this.$store.commit('ChangePrimaryItem', e)
    }

  }

}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
</style>
