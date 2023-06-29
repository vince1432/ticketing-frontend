<template>
  <header>
    <nav class="nav">
      <h3>Vue appss</h3>
      <ul class="nav-routes">
        <router-link class="nav-routes__items" :to="{ name: 'home' }"
          >Home</router-link
        >
        <router-link class="nav-routes__items" :to="{ name: 'about' }"
          >About</router-link
        >
        <router-link class="nav-routes__items" :to="{ name: 'login' }"
          >Login</router-link
        >
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  max-width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding: 25px 16px;

  .nav-routes {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 12px;
    list-style: none;
    gap: 12px;
    margin-right: 100px;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>
