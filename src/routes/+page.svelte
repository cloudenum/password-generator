<script lang="ts">
  import { Card } from "$lib/components/ui/card";
  import Memorable from "./Memorable.svelte";
  import Pin from "./Pin.svelte";
  import Random from "./Random.svelte";
  import { onMount } from "svelte";
  import Copy from "svelte-radix/Copy.svelte";
  import type { Alert as AlertType } from "$lib/components";
  import Alert from "$lib/components/Alert.svelte";

  enum PasswordType {
    Random = "random",
    Pin = "pin",
    Memorable = "memorable"
  }

  let alertComponent: Alert;
  let alert: AlertType | null = null;

  let type = PasswordType.Random;
  let memorableComponent: Memorable;
  let pinComponent: Pin;
  let randomComponent: Random;

  let password = "";

  const generate = async () => {
    if (type === PasswordType.Random) {
      password = randomComponent.generate();
    } else if (type === PasswordType.Pin) {
      password = pinComponent.generate();
    } else if (type === PasswordType.Memorable) {
      password = await memorableComponent.generate();
    } else {
      password = "";
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert = {
        title: "Password copied",
        message: "You can paste it anywhere you want",
        icon: Copy
      };
    });
  };

  const changeType = async (to: PasswordType) => {
    type = to;
    password = "";
  };

  onMount(() => {
    generate();
  });
</script>

<main class="flex min-h-screen items-center justify-center p-4 lg:p-16">
  <div class="w-full max-w-lg">
    <header class="w-full p-4">
      <h1 class="text-center text-2xl font-bold lg:text-3xl">Password Generator</h1>
    </header>
    <div class="mt-4">
      <Card class="p-8 lg:p-12">
        <div class="flex flex-col gap-5">
          <div class="flex flex-wrap gap-4">
            <button
              class="flex-1 rounded border border-primary px-3 py-2 text-lg font-semibold hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
              class:bg-primary={type === PasswordType.Random}
              class:text-white={type === PasswordType.Random}
              on:click={() => changeType(PasswordType.Random)}
            >
              Random
            </button>
            <button
              class="flex-1 rounded border border-primary px-3 py-2 text-lg font-semibold hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
              class:bg-primary={type === PasswordType.Pin}
              class:text-white={type === PasswordType.Pin}
              on:click={() => changeType(PasswordType.Pin)}
            >
              Pin
            </button>
            <button
              class="flex-1 rounded border border-primary px-3 py-2 text-lg font-semibold hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
              class:bg-primary={type === PasswordType.Memorable}
              class:text-white={type === PasswordType.Memorable}
              on:click={() => changeType(PasswordType.Memorable)}
            >
              Memorable
            </button>
          </div>

          <div
            class="border-primary-300 bg-primary-50 flex min-h-32 w-full items-center justify-center rounded-lg border p-4 text-foreground md:p-6 lg:p-8"
          >
            <p
              class="flex flex-wrap items-center justify-center break-all text-center text-lg font-semibold leading-5 tracking-wider sm:text-xl"
            >
              {password}
            </p>
          </div>

          {#if type === PasswordType.Random}
            <Random bind:password bind:this={randomComponent} />
          {:else if type === PasswordType.Pin}
            <Pin bind:password bind:this={pinComponent} />
          {:else if type === PasswordType.Memorable}
            <Memorable bind:password bind:this={memorableComponent} />
          {/if}

          <button
            class="focus:ring-accent-300 border-accent-400 text-accent-500 mx-auto w-full max-w-md rounded border px-3 py-2 text-lg font-semibold transition-transform hover:scale-105 focus:scale-105"
            on:click={copyPassword}
          >
            Copy Password
          </button>

          <button
            class="hover:bg-primary-600 focus:bg-primary-600 mx-auto w-full max-w-md rounded border border-primary bg-primary px-3 py-2 text-lg font-semibold text-white"
            on:click={generate}
          >
            Generate
          </button>
        </div>
      </Card>
    </div>
  </div>
</main>

{#if alert}
  <Alert
    on:close={() => (alert = null)}
    title={alert.title}
    message={alert.message}
    icon={alert.icon}
  />
{/if}
