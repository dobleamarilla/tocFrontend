<template>
    <MesasComponent />
    <ToastComponent/>
</template>
<script>
import ToastComponent from '../components/Toast.vue';
import MesasComponent from '../components/MesasComponent.vue';

export default {
  name: 'Mesas',
  setup() {
    return {};
  },
  components: {
    MesasComponent,
    ToastComponent,
  },
};
</script>
