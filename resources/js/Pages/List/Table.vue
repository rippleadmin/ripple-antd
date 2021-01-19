<template>
  <div>
    <w-component :value="table" />
  </div>
</template>

<script>
export default {
  props: {
    table: {
      type: Object,
      required: true
    }
  }
}
</script>
