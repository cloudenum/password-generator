<script lang="ts">
  import { memorable } from "$lib/password-generator";
  import { Slider } from "$lib/components/ui/slider";
  import { Label } from "$lib/components/ui/label";
  import * as Select from "$lib/components/ui/select";
  import { Switch } from "$lib/components/ui/switch";
  import type { Selected } from "bits-ui";
  import { onMount } from "svelte";

  let length = [4];
  let withNumbers = false;
  let capitalizeEachWords = false;
  let locale: Selected<string> = {
    value: "id",
    label: "Bahasa Indonesia"
  };

  export let password = "";
  export async function generate() {
    return await memorable(length[0], locale.value, capitalizeEachWords, withNumbers);
  }

  onMount(async () => {
    password = await generate();
  });
</script>

<div class="flex flex-col space-y-2">
  <Label>Language</Label>
  <Select.Root selected={locale} onSelectedChange={(v) => v && (locale = v)}>
    <Select.Trigger>
      <Select.Value placeholder="Select a Language" />
    </Select.Trigger>
    <Select.Content>
      <Select.Group>
        <Select.Label>Language</Select.Label>
        <Select.Item class="font-semibold" value="id" label="Bahasa Indonesia" />
        <Select.Item class="font-semibold" value="en" label="English" />
      </Select.Group>
    </Select.Content>
  </Select.Root>
</div>

<div class="flex flex-col space-y-2">
  <Label for="length" class="font-semibold">Length</Label>
  <div class="flex gap-x-4">
    <Slider id="length" class="flex-1" bind:value={length} step={1} min={3} max={16} />
    <span
      class="h-8 w-12 rounded-lg border bg-primary-50 text-center font-semibold leading-8 text-slate-600"
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
  <Switch id="capitalize-each-words" bind:checked={capitalizeEachWords} />
  <Label for="capitalize-each-words">Capitalize Each Words</Label>
</div>
