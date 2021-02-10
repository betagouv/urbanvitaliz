---
layout: empty
scripts:
    - src: "./scripts/dependencies/buffer.js"
      defer: true
      crossorigin: "anonymous"
    - src: "./build/assistant.rollup.js"
      defer: true
      crossorigin: "anonymous"
styles:
    - href: "./build/assistant.rollup.css"
---

# Trouver des réponses sur les friches

<div class="svelte-main"></div>

<style>
  main{
    padding-top: 1rem;
  }

  h1{
    margin-bottom: 2.5rem;
  }

  .svelte-main{
    max-width: 50rem;
  }
</style>