<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAppInfoStore } from '@/stores/modules/appInfo';
import { useSettingsStore } from '@/stores/modules/settings';
import { useChampionsStore } from '@/stores/modules/champions';
import { getToken } from '@/utils/auth';
import ipcRenderer from '@/utils/ipcRenderer';

const router = useRouter();

/* 初始化state */
const appInfoStore = useAppInfoStore();
const settingsStore = useSettingsStore();
const championsStore = useChampionsStore();
appInfoStore.load();
settingsStore.load();
championsStore.load();

if (window.location.href.indexOf('/tools/rune') === -1 && window.location.href.indexOf('/tools/spells') === -1) {
  /* 判断是否已经登入 */
  const token = getToken();
  if (token) {
    router.push({ name: 'dashboard' });
  } else {
    router.push({ name: 'login' });
  }
}

/* 监听credentials是否存在，用于判断客户端是否启动 */
ipcRenderer.ipc.on('controller.lcu.enable', (_event, data) => {
  appInfoStore.lcuEnable = data;
});
</script>

<template>
  <router-view id="main" class="font-pingfang shadow-md select-none rounded-md" />
</template>

<style lang="less">
@import url('@arco-themes/vue-gi-demo/index.less');
@import url(./style/font.css);
@import url(./style/common.css);
.size {
  width: 100%;
  height: 100%;
}

html,
body {
  padding: 0 !important;
  margin: 0;
  // overflow: hidden;
  .size;
  #app {
    .size;
    #main {
      overflow: hidden;
    }
  }
  /* 圆框需要 不然圆角会有背景色*/
  background-color: rgba(0, 0, 0, 0);
  border-radius: 6px;
  overflow: hidden;
}
</style>
