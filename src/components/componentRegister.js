import Vue from 'vue';

//动态require组件,找到路径
const requireComponent = require.context('./', true, /.vue$/);
// 找到组件文件夹下以.vue命名的文件，如果文件名存在，那么取组件中的name作为注册的组件名
requireComponent.keys().forEach(filePath => {
  //组件实例
  const componentConfig = requireComponent(filePath);
  const componentName = componentConfig.default.name;
  Vue.component(componentName, componentConfig.default || componentConfig);
});
