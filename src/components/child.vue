<template>
  <div class="child-page">
    <input
      type="text"
      :value="input"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'child',
  props: ['input']
};
</script>
