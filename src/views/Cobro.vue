<template>
    <CobroComponent/>
    <ToastComponent/>
</template>

<script>

import CobroComponent from '@/components/CobroComponent.vue'; // @ is an alias to /src
import ToastComponent from '@/components/Toast.vue';

export default {
  name: 'Cobro',
  components: {
    CobroComponent,
    ToastComponent,
  },
};
</script>
