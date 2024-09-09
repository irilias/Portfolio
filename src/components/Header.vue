
<template>
  <header class="header">
    <div class="logo">Logo</div>
    <div class="social-icons">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-github"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-linkedin"></i>
      </a>
    </div>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .social-icons {
    display: flex;
    gap: 1rem;

    a {
      color: white;
      font-size: 1.5rem;
      transition: color 0.3s ease;

      &:hover {
        color: #ddd;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
