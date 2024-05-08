<script setup lang="ts">
import EAIconButton from '@/components/common/EAIconButton/EAIconButton.vue'
import IconBook from '@/components/icons/IconBook.vue'
import IconGift from '@/components/icons/IconGift.vue'
import IconStars from '@/components/icons/IconStars.vue'
import IconSettings from '@/components/icons/IconSettings.vue'

const tab = defineModel()
const emit = defineEmits(['update:modelValue'])
console.log(tab.value)
</script>

<template>
  <div class="EABar">
    <EAIconButton @click="emit('update:modelValue', 0)">
      <IconBook></IconBook>
    </EAIconButton>
    <EAIconButton @click="emit('update:modelValue', 1)">
      <IconGift></IconGift>
    </EAIconButton>
    <EAIconButton @click="emit('update:modelValue', 2)">
      <IconStars></IconStars>
    </EAIconButton>
    <EAIconButton @click="emit('update:modelValue', 3)">
      <IconSettings></IconSettings>
    </EAIconButton>
  </div>
</template>

<style scoped>
.EABar{
  width: 50px;
}
</style>