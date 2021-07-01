<template>
  <div>
    <Teclas/>
    <ModalPeso/>
    <Footer/>
    <InstallWizard/>
  </div>
</template>

<script>
// @ is an alias to /src
import Teclas from '@/components/Teclas.vue'; // @ is an alias to /src
import ModalPeso from '@/components/ModalPeso.vue'; // @ is an alias to /src
import Footer from '@/components/Footer.vue'; // @ is an alias to /src
import InstallWizard from '@/components/InstallWizard.vue'; // @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Teclas,
    ModalPeso,
    Footer,
    InstallWizard,
  },
};
</script>
