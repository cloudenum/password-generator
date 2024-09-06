<script>
  import { random } from "$lib/password-generator";
  import { Slider } from "$lib/components/ui/slider";
  import { Label } from "$lib/components/ui/label";
  import { Switch } from "$lib/components/ui/switch";
  import { onMount } from "svelte";

  let length = [16];
  let withNumbers = true;
  let withSymbols = false;

  export let password = "";
  export function generate() {
    return random(length[0], withNumbers, withSymbols);
  }

  onMount(() => {
    password = generate();
  });
</script>

<div class="flex flex-col gap-2">
  <Label for="length" class="font-semibold">Length</Label>
  <div class="flex gap-x-4">
    <Slider id="length" class="flex-1" bind:value={length} step={1} min={8} max={256} />
    <span
      class="bg-primary-50 h-8 w-12 rounded-lg border text-center font-semibold leading-8 text-slate-600"
    >
      {length[0]}
    </span>
  </div>
</div>

<div class="flex items-center space-x-2">
  <Switch id="with-numbers" bind:checked={withNumbers} />
  <Label for="with-numbers">Include Numbers</Label>
</div>

<div class="flex items-center space-x-2">
  <Switch id="with-symbols" bind:checked={withSymbols} />
  <Label for="with-symbols">Include Symbols</Label>
</div>
