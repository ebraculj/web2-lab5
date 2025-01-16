<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>Greška pri pristupu stranici. Nažalost ova stranica ne postoji. Klikom na poveznicu ispod ćete biti vraćeni na naslovnu stranicu.</p>
    <router-link to="/">Natrag na Naslovnicu</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>
