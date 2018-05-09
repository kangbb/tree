# tree

一个简单的vue实现的文件树。主要实现了增加、删除、修改树节点的功能，并做了简单美化。

## 项目摘要
### 递归组件的使用
1. 设置`name`属性
2. 设置递归终止条件,`v-if`显示声明或者`v-for`隐式声明均可。

### 文件树数据的传递
最底层节点触发数据传递，各个父节点通过`this.$emit`递归传递数据，直到将数据传递到需要该数据的节点。
例如，修改文件树节点名称：
```javascript
// 触发
onEnter: function () {
  this.$emit('changeNode', this.treeNode.id, this.newName)
  this.edit_status = 0
  this.newName = ''
},
// 递归传递数据
changeNode: function (id, name) {
  this.$emit('changeNode', id, name)
},
```

### svg的使用
参考网址如下：
1. [未来必热：SVG Sprite技术介绍](http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)
2. [手摸手，带你优雅的使用 icon](https://segmentfault.com/a/1190000012213278)

我的使用方式：
1. 阿里云`Iconfont`库下载图标:[Iconfont-阿里巴巴矢量图标库](http://www.iconfont.cn/)
2. IcoMoon转换svg: [https://icomoon.io/app/#/select](https://icomoon.io/app/#/select)
3. 下载转换后的svg,根据`demo.html`使用