<template>
  <div class="toast-container position-absolute p-3
   bottom-0 start-50 translate-middle-x" role="alert"
    aria-live="assertive" aria-atomic="true">
    <div class="toast" :class="{
        'text-white bg-primary': tipoToast == 'PRIMARY',
        'text-white bg-secondary': tipoToast == 'SECONDARY',
        'text-white bg-success': tipoToast == 'SUCCESS',
        'text-white bg-danger': tipoToast == 'DANGER',
        'text-white bg-warning': tipoToast == 'WARNING',
        'text-white bg-info': tipoToast == 'INFO',
        'text-white bg-light': tipoToast == 'LIGHT',
        'text-white bg-dark': tipoToast == 'DARK'
    }">
      <div class="d-flex">
        <div class="toast-body">
          {{mensajeToast}}
        </div>
        <button type="button" class="btn-close
         btn-close-white me-2 m-auto"
          data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Toast',
  setup() {
    const store = useStore();
    const tipoToast = computed(() => store.state.toast.tipo);
    const mensajeToast = computed(() => store.state.toast.mensaje);

    function test() {
      store.dispatch('showToast');
    }

    onMounted(() => {
      store.dispatch('initToast');
    });

    return {
      tipoToast,
      mensajeToast,
      test,
    };
  },
};
</script>
