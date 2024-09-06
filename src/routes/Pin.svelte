<script lang="ts">
  import { pin } from "$lib/password-generator";
  import { Slider } from "$lib/components/ui/slider";
  import { Label } from "$lib/components/ui/label";
  import { onMount } from "svelte";

  let length = [6];

  export let password = "";
  export function generate() {
    return pin(length[0]);
  }

  onMount(() => {
    password = generate();
  });
</script>

<div class="flex flex-col gap-2">
  <Label for="length" class="font-semibold">Length</Label>
  <div class="flex gap-x-4">
    <Slider id="length" class="flex-1" bind:value={length} step={1} min={3} max={12} />
    <span
      class="bg-primary-50 h-8 w-12 rounded-lg border text-center font-semibold leading-8 text-slate-600"
    >
      {length[0]}
    </span>
  </div>
</div>
