<template>
 <div class="flex items-center h-full ">
   <a-result status="warning">
    <template #icon>
      <icon-info-circle-fill size="82" />
    </template>
    <template #title>
      <span class="text-lg">暂未获取到对局信息</span>
    </template>
    <template #subtitle>
      <span class="text-base">程序未检测到游戏对局的数据，该模块无法显示</span>
    </template>

    <a-typography  style="background: var(--color-fill-2); padding: 24px">
      <a-typography-paragraph >您可以尝试如下操作</a-typography-paragraph>
      <ul>
        <li>请确保以进入游戏，对局数据将在对局开始后2-5秒内获取到</li>
        <li>如以上操作无法解决您的问题，请加群咨询。</li>
      </ul>
    </a-typography>
  </a-result>
 </div>
</template>

<script setup>
</script>

<style lang="less" scoped>

</style>
