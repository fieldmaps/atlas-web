<script lang="ts">
  import 'normalize.css';
  import { onMount } from 'svelte';

  onMount(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  });
</script>

<slot />

<style>
  @media only screen and (max-width: 768px) {
    :global(.maplibregl-ctrl) {
      display: none;
    }
  }

  :global(html, body) {
    height: 100%;
  }

  :global(body) {
    font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }
</style>
