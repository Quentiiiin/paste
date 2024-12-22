<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount, tick } from "svelte";
  
      let textarea: HTMLTextAreaElement | undefined = $state();
  
      let contentState: 'empty' | 'ready' | 'waiting' = $state('empty');
      let content = $state('');
      let lines = $derived.by(() => {
          const l = [];
          const r  = content.split("\n").length;
          for(let i = 0; i < r; i++) {
              l.push(i + 1);
          }
          return l;
      });
  
      onMount(async () => {
          await tick();
          textarea?.focus();
      });
  
      function handleInput() {
          if(textarea) {
              textarea.style.height = "auto";
              textarea.style.height = textarea.scrollHeight + 'px';
              if(textarea.value.length > 0) {
                  contentState = 'ready';
              } else {
                  contentState = "empty";
              }
          }
      }
  
      async function handleSubmit() {
          if(contentState !== 'ready') {
              return;
          }
          contentState = 'waiting';
          const res = await fetch('/post', {
              method: 'POST',
              body: JSON.stringify({
                  content: content
              })
          });
          if(res.ok) {
              const json: any = await res.json();
              const id = json.id;
              goto('/x/'+ id)
          }
      }
  
  </script>
  
  <div class="  flex m-2">
      <div class=" pr-2 w-8 text-zinc-400">
          {#each lines as line}
              {line} <br/>
          {/each}
      </div>
      <div>
          <textarea rows="1" bind:value={content} oninput={handleInput} bind:this={textarea} class=" resize-none bg-zinc-700 textinput overflow-y-hidden" spellcheck="false"></textarea>
          <button onclick={handleSubmit} class:ready={contentState === 'ready'} class:unready={contentState === 'empty'} class:waiting={contentState === 'waiting'} class=" pl-2">
              submit
          </button>
      </div>
  </div>
  
  <style>
      .textinput {
          width: calc(100vw - 4rem);
          -webkit-spell-check: false;
          -moz-spell-check: false;
      }
      .textinput:focus {
          border-radius: 0px;
          outline: none;
      }
      .ready {
          @apply text-blue-400;
      }
      .unready {
          @apply text-zinc-500 cursor-not-allowed;
      }
      .waiting {
          @apply text-cyan-100 cursor-wait;
      }
  </style>