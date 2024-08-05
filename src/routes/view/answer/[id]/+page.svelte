<script>
    import Qushtion from '$lib/components/qushtion.svelte';
    import { onDestroy } from 'svelte';
    
    // @ts-ignore
    import { writable } from 'svelte/store';
    // @ts-ignore
    export let data;
    
    // Calculate remaining time
    const currentTime = new Date();
    const endTime = new Date(data.paper.end_time);
    const remainingTime = Math.floor((endTime - currentTime) / 1000);
    
    let questions = writable([]);
    
    data.paper.expand.nat_via_paper.forEach(element => {
      element.type = 'nat';
      questions.update(n => [...n, element]);  
    });
    
    data.paper.expand.short_answer_via_paper.forEach(element => {
      element.type = 'short_answer';
      questions.update(n => [...n, element]);  
    });
  
    data.paper.expand.mcq_via_paper.forEach(element => {
      element.type = 'mcq';
      questions.update(n => [...n, element]); 
    });
  
    data.paper.expand.msq_via_paper.forEach(element => {
      element.type = 'msq';
      element.answer =  element.answer.split(',');
      questions.update(n => [...n, element]);  
    });
  
    // Sort questions by question number
    questions.update(n => n.sort((a, b) => a.qno - b.qno));
    
    onDestroy(() => {
      // Clean-up logic if needed
    });
  </script>
  
  <style>
    .card {
      @apply bg-base-300 shadow-md rounded-lg p-4 mb-4;
    }
    .label {
      @apply flex justify-start items-center;
    }
    .correct {
      @apply bg-green-700 ;
    }
    .selected {
      @apply bg-cyan-800;
    }
    .option {
      @apply p-2;
    }
  </style>
  
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">{data.paper.expand.grp.grpname}</h1>
    <div class="mb-4">
      <h2 class="text-xl font-bold">End Time: {new Date(data.paper.end_time).toLocaleString()}</h2>
    </div>
  
    {#each $questions as question}
      <div class="card mb-4">
        <h2 class="text-xl font-bold mb-2">{question.qno}. {question.question}</h2>
        <div class="text-lg font-mono mb-2">
          (marks: {question.number}{#if question.neg_number}, negative: -{question.neg_number}{/if})
        </div>
  
        {#if question.type === 'nat'}
          <div class="text-lg">
            <div>Your answer: {data.answer.response[`nat-${question.id}`]}</div>
            <div class="correct">Correct answer: {question.key}</div>
          </div>
        {:else if question.type === 'short_answer'}
          <div class="text-lg">
            <div>Your answer: {data.answer.response[`short_answer-${question.id}`]}</div>
            <div class="correct">Correct answer: {question.key}</div>
          </div>
        {:else if question.type === 'mcq'}
          <div class="text-lg">
            {#each Object.keys(question.options) as option}
              <div class="option {option == data.answer.response[`mcq-${question.id}`] ? 'selected' : ''} {option == question.answer ? 'correct' : ''}">
                {#if option == question.answer}
                  <span class="correct">{question.options[option]} (Correct)</span>
                {:else if option == data.answer.response[`mcq-${question.id}`]}
                  <strong class="selected">{question.options[option]} (Selected)</strong>
                {:else}
                  {question.options[option]}
                {/if}
              </div>
            {/each}
          </div>
        {:else if question.type === 'msq'}
          <div class="text-lg">
            {#each Object.keys(question.options) as option}
              <div class="option {data.answer.response[`msq-${question.id}`].split(',').includes(option) ? 'selected' : ''} {question.answer.includes(option) ? 'correct' : ''}">
                {#if question.answer.includes(option)}
                  <span class="correct">{question.options[option]} (Correct)</span>
                {:else if data.answer.response[`msq-${question.id}`].split(',').includes(option)}
                  <strong class="selected">{question.options[option]} (Selected)</strong>
                {:else}
                  {question.options[option]}
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  
    <div class="mt-4 text-lg font-bold">Total Score: {data.answer.score}</div>
  </div>
  