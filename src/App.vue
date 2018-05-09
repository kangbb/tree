<template>
  <div id="app">
    <div id="function_icon">
      <svg class="icon icon-file-add" @click="addFlie"><use xlink:href="#icon-file-add"></use></svg>
      <svg class="icon icon-folder-add" style="margin-left:5px" @click="addFolder"><use xlink:href="#icon-folder-add"></use></svg>
    </div>
    <tree-menu
      @selectNode="selectNode"
      :nodeData="tree"
      :depth="0"
      @changeNode="changeNode"
      @deleteNode="deleteNode"
      :clickable="clickable"
      @changeClickable="changeClickable"
    >
    </tree-menu>
  </div>
</template>

<script>
import TreeMenu from './components/TreeMenu.vue'
export default {
  data: function () {
    return {
      tree: {
        name: 'app',
        id: 1,
        type: 'dir',
        root: true,
        isSelected: false,
        children: [
          {
            name: 'src',
            id: 2,
            type: 'dir',
            isSelected: false,
            children: [
              {
                name: 'asssets',
                id: 3,
                type: 'dir',
                isSelected: false,
                children: []
              }
            ]
          },
          {
            name: 'bin',
            id: 4,
            type: 'dir',
            isSelected: false,
            children: [
              {
                name: 'main.go',
                id: 5,
                type: 'file',
                isSelected: false,
                children: []
              }
            ]
          }
        ]
      },
      selNode: null,
      clickable: true
    }
  },
  name: 'App',
  components: {
    TreeMenu
  },
  methods: {
    selectNode: function (node) {
      if (!this.selNode) {
        // 将当前选中节点的isSelected属性变为true
        this.$utilNode.getNode(this.tree, node.id).node.isSelected = true
        this.selNode = node
        return
      }
      // 将前一个选中节点的isSelected属性变为false
      this.$utilNode.getNode(this.tree, this.selNode.id).node.isSelected = false
      // 将当前选中节点的isSelected属性变为true
      this.$utilNode.getNode(this.tree, node.id).node.isSelected = true
      // 记录当前选中节点
      this.selNode = node
    },
    // 修改节点的可点击性
    changeClickable: function () {
      this.clickable = !this.clickable
    },
    // 修改节点名称
    changeNode: function (id, name) {
      console.log(name)
      this.$utilNode.getNode(this.tree, id).node.name = name
      this.$utilNode.childrenSort(this.$utilNode.getNode(this.tree, id).parentNode.children)
      this.clickable = !this.clickable
    },
    // 删除节点
    deleteNode: function (id) {
      if (this.selNode.id === id) {
        this.selNode = null
      }
      var children = this.$utilNode.getNode(this.tree, id).parentNode.children
      children.forEach((v, i) => {
        if (v.id === id) {
          children.splice(i, 1)
        }
      })
    },
    // 增加文件
    addFlie: function () {
      if (!this.selNode || this.selNode.type !== 'dir') {
        return
      }
      var children = this.$utilNode.getNode(this.tree, this.selNode.id).node.children
      children.push({
        name: 'newfile',
        id: this.$utilNode.generateUUID(),
        type: 'file',
        isSelected: false,
        children: []
      })
      this.$utilNode.childrenSort(children)
    },
    // 增加文件夹
    addFolder: function () {
      if (!this.selNode || this.selNode.type !== 'dir') {
        return
      }
      var children = this.$utilNode.getNode(this.tree, this.selNode.id).node.children
      children.push({
        name: 'newfolder',
        id: this.$utilNode.generateUUID(),
        type: 'dir',
        isSelected: false,
        children: []
      })
      this.$utilNode.childrenSort(children)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.icon-file-add, .icon-folder-add {
  width: 20px !important;
  height: 20px !important;
}
</style>
