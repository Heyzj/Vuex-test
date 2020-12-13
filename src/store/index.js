import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],  //数据列表
    inputPlaceholder: '请添加新的一项',
    inputVal: '', //输入框中的值
    id: 5,//添加项中id从5开始
    primaryKey: '0' //状态栏默认选中的值
  },
  mutations: {
    pushlist(state, data) { //渲染state中list的值
      state.list = data
    },
    setInputVal(state, val) { //将页面中input的值同步到state中的inputVal
      state.inputVal = val;
    },
    addItemList(state) {
      const newList = {
        id: state.id, // 添加每一项的ID
        info: state.inputVal.trim(), //
        done: false //复选框的选中状态
      };
      state.list.push(newList);
      state.id++;
      state.inputVal = ''
    },
    removeItems(state, id) { //删除对应的item项
      let i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1);
      }
    },
    CheckedChangeStatus(state, param) {//获取复选框改变的状态
      let i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.done
      }
    },
    ClearCheckedItem(state) { //清除所有已完成的item
      state.list = state.list.filter(x => x.done === false)
    },
    ChangePrimaryItem(state, e) { //切换状态栏的选中状态
      state.primaryKey = e
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then((res) => {
        // console.log(res.data);
        context.commit('pushlist', res.data)
      })
    }
  },
  getters: {
    unChecked(state) { //使用getter包装未完成的数据项
      return state.list.filter(x => x.done === false).length
    },
    showInfo(state) {//实现按需显示数据项
      if (state.primaryKey === '0') {
        return state.list
      } else if (state.primaryKey === '1') {
        return state.list.filter(x => x.done === false)
      } else {
        return state.list.filter(x => x.done === true)
      }
    }
  },
  modules: {}
})
