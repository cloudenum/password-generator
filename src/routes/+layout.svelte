<script lang="ts">
  import "../app.pcss";
</script>

<div>
  <div
    class="from-primary-600 via-accent-500 to-secondary-400 fixed left-[20rem] top-40 h-[30rem] w-[40rem] animate-pulse rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-gradient-to-tr opacity-40"
  ></div>
  <div class="fixed inset-0 backdrop-blur-3xl"></div>
  <div class="relative z-[1]">
    <slot></slot>
  </div>
</div>
