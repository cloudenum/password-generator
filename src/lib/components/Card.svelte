<script lang="ts">
</script>

<div class="w-full rounded-lg border bg-card p-8 text-card-foreground shadow-lg">
  {#if $$slots.header}
    <div>
      <slot name="header"></slot>
    </div>
  {/if}

  <slot></slot>

  {#if $$slots.footer}
    <div>
      <slot name="footer"></slot>
    </div>
  {/if}
</div>
