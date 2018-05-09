<template>
  <div class="tree-menu">
    <div :class="{selected: this.treeNode.isSelected, node_style: !this.treeNode.isSelected, selected_hover: this.treeNode.isSelected }">
      <div :style="indent" class="lable_class" @click="handleClick">
        <svg v-if="this.treeNode.type=='dir'" :style="this.arrow_rotate" class="icon icon-play3"><use xlink:href="#icon-play3"></use></svg>
        <svg :class="iconType"><use :xlink:href="iconName"></use></svg>
        <span v-if="!this.edit_status">{{ this.treeNode.name }}</span>
        <input v-if="this.edit_status" class="node_input" v-model="newName" @keyup.enter="onEnter"/>
      </div>
      <div v-if="!this.treeNode.root" class="span_func_icon" :style="indent">
        <svg class="icon icon-modify" @click="change_node"><use xlink:href="#icon-modify"></use></svg>
        <svg class="icon icon-delete" style="margin-left:5px;" @click="delete_node"><use xlink:href="#icon-delete"></use></svg>
      </div>
    </div>
    <tree-menu
      v-if="showChildren"
      v-for="node in this.treeNode.children"
      @selectNode="selectNode"
      :key = "node.id"
      :nodeData = "node"
      :depth="depth + 1"
      :clickable="clickable"
      @changeNode="changeNode"
      @deleteNode="deleteNode"
      @changeClickable="changeClickable"
    >
    </tree-menu>
  </div>
</template>

<script>
export default {
  props: ['depth', 'nodeData', 'clickable'],
  data: function () {
    return {
      icon_type: new Map([['folder-open', 'icon-folder-open'], ['folder-close', 'icon-folder'], ['file', 'icon-document']]),
      arrow_rotate: { transform: `none` },
      showChildren: false,
      edit_status: false,
      newName: '',
      treeNode: JSON.parse(JSON.stringify(this.nodeData))
    }
  },
  name: 'tree-menu',
  computed: {
    indent () {
      return { transform: `translate(${this.depth * 20}px)` }
    },
    iconType () {
      if (this.treeNode.type === 'dir') {
        if (this.showChildren) {
          return 'icon ' + this.icon_type.get('folder-open')
        }
        return 'icon ' + this.icon_type.get('folder-close')
      } else if (this.treeNode.type === 'file') {
        return 'icon ' + this.icon_type.get('file')
      } else {
        return 'icon ' + this.icon_type.get(this.treeNode.type)
      }
    },
    iconName () {
      if (this.treeNode.type === 'dir') {
        if (this.showChildren) {
          return '#icon-folder-open'
        }
        return '#icon-folder'
      } else if (this.treeNode.type === 'file') {
        return '#icon-document'
      } else {
        return '#' + this.icon_type.get(this.treeNode.type)
      }
    }
  },
  methods: {
    handleClick: function () {
      // 判断是否可以点击
      if (!this.clickable) {
        return
      }
      // 通过点击改变展开状态
      this.showChildren = !this.showChildren
      // 改变选中状态节点
      this.$emit('selectNode', this.treeNode)

      // 箭头旋转
      if (this.showChildren) {
        this.arrow_rotate = { transform: `rotate(90deg)` }
      } else {
        this.arrow_rotate = { transform: `none` }
      }
    },
    // 修改当前节点name
    change_node: function () {
      this.edit_status = 1
      this.$emit('changeClickable')
    },
    onEnter: function () {
      this.$emit('changeNode', this.treeNode.id, this.newName)
      this.edit_status = 0
      this.newName = ''
    },
    // 删除当前节点
    delete_node: function () {
      this.$emit('deleteNode', this.treeNode.id)
    },
    // 向上传递函数
    selectNode: function (node) {
      this.$emit('selectNode', node)
    },
    changeNode: function (id, name) {
      this.$emit('changeNode', id, name)
    },
    deleteNode: function (id) {
      this.$emit('deleteNode', id)
    },
    changeClickable: function () {
      this.$emit('changeClickable')
    }
  },
  watch: {
    nodeData: {
      handler: function (val, oldval) {
        this.treeNode = JSON.parse(JSON.stringify(val))
      },
      deep: true
    }
  }
}
</script>

<style>
.tree-menu {
  text-align: left;
}
.selected {
  background-color: rgb(172, 172, 172);
}
.node_style:hover {
  background-color: rgb(228, 228, 228);
}
.node_input {
  width: 50px;
  background-color: rgb(99, 99, 102);
}
.node_style:hover .span_func_icon {
  display: inline-block;
  margin-left: 5px;
}
.selected_hover:hover .span_func_icon {
  display: inline-block;
  margin-left: 10px;
}
.span_func_icon {
  display: none;
}
.lable_class {
  display:inline-block;
}
.icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
.icon-play3 {
  width: 10px;
  height: 10px;
  margin-bottom: 2px;
}
.icon-modify, .icon-delete {
  width: 14px;
  height: 14px;
}

</style>
