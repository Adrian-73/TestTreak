<script>
    import { onDestroy } from 'svelte';

  // @ts-ignore
  import { PaperAirplane } from 'svelte-hero-icons';
  import { writable } from 'svelte/store';
  // @ts-ignore
  export let data;
  let form ;
  // Calculate remaining time
  const currentTime = new Date();
  const endTime = new Date(data.end_time);
  const remainingTime = Math.floor((endTime - currentTime) / 1000);
  
  let questions = writable([]);
  
  data.expand.nat_via_paper.forEach(element => {
    element.type = 'nat';
    questions.update(n => [...n, element]);  
  });
  
  data.expand.short_answer_via_paper.forEach(element => {
    element.type = 'short_answer';
    questions.update(n => [...n, element]);  
  });

  data.expand.mcq_via_paper.forEach(element => {
    element.type = 'mcq';
    questions.update(n => [...n, element]); 
  });

  data.expand.msq_via_paper.forEach(element => {
    element.type = 'msq';
    element.answer =  [];
    questions.update(n => [...n, element]);  
  });

  // Sort questions by question number
  questions.update(n => n.sort((a, b) => a.qno - b.qno));
  console.log(data)
  onDestroy(
    
    () => {if(form){form.dispatchEvent(new Event('submit', { bubbles: true }))}}
  )
</script>

<style>
  .card {
    @apply bg-base-300 shadow-md rounded-lg p-4 mb-4;
  }
  .label {
    @apply flex justify-start items-center;
  }
</style>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">{data.expand.grp.grpname}</h1>
  <div class="mb-4">
    <h2 class="text-xl font-bold">{endTime}</h2>
  </div>
  <form method="POST" bind:this={form}>
    {#each $questions as question}
      <div class="card mb-4">
        <h2 class="text-xl font-bold mb-2">{question.qno}. {question.question}</h2>
        <div class="text-lg font-mono mb-2">(marks: {question.number}{#if question.neg_number}, negative: -{question.neg_number}{/if})</div>
        
        {#if question.type === 'nat'}
          <input type="number" step="0.01" class="input input-bordered" name="nat-{question.id}" placeholder="Enter your answer" />
        {:else if question.type === 'short_answer'}
          <input type="text" class="input input-bordered" name="short_answer-{question.id}" placeholder="Enter your answer" />
        {:else if question.type === 'mcq'}
          <div class="flex flex-col">
            <!-- Hidden input to ensure null is returned if no value is selected -->
            <input type="hidden" name="mcq-{question.id}" value={null} />
            {#each Object.keys(question.options) as option}
              <label class="label">
                <input type="radio" name="mcq-{question.id}" value="{option}" />
                <span class="text-lg pl-1">{question.options[option]}</span>
              </label>
            {/each}
          </div>
        {:else if question.type === 'msq'}
          <div class="flex flex-col">
            <input type="hidden" name="msq-{question.id}" value={question.answer} />
            {#each Object.keys(question.options) as option}
              <label class="label">
                <input type="checkbox" value="{option}" bind:group={question.answer}/>
                <span class="text-lg pl-1">{question.options[option]}</span>
              </label>
            {/each}
          </div>
        {/if}
      </div>
    {/each}

    <button class="btn btn-primary" type="submit">Submit Answers</button>
  </form>
</div>
