<template>
  <div>
    <TeclasArticulos/>
    <ModalTecladoPeso/>
    <PanelInferior/>
    <ModalInstallWizard/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TeclasArticulos from '@/components/TeclasArticulos.vue'; // @ is an alias to /src
import ModalTecladoPeso from '@/components/ModalTecladoPeso.vue'; // @ is an alias to /src
import PanelInferior from '@/components/PanelInferior.vue'; // @ is an alias to /src
import ModalInstallWizard from '@/components/InstallWizard.vue'; // @ is an alias to /src


export default defineComponent({
  name: 'Home',
  components: {
    TeclasArticulos,
    ModalTecladoPeso,
    PanelInferior,
    ModalInstallWizard
  },
});
</script>
