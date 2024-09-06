<script lang="ts">
  import { flyAndScale } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import * as AlertComponent from "$lib/components/ui/alert";

  export let title = "";
  export let message = "";
  export let icon: any = null;

  const dispatch = createEventDispatcher();

  onMount(() => {
    setTimeout(() => {
      dispatch("close");
    }, 4000);
  });
</script>

<div class="fixed inset-x-0 bottom-0 p-8" transition:flyAndScale={{}}>
  <AlertComponent.Root class="mx-auto w-full max-w-xl shadow">
    <svelte:component this={icon} />
    <AlertComponent.Title class="font-semibold">{title}</AlertComponent.Title>
    <AlertComponent.Description>{message}</AlertComponent.Description>
  </AlertComponent.Root>
</div>
