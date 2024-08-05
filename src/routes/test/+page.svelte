<script>
  import { writable} from 'svelte/store';
  import { onMount } from 'svelte';
  // Initialize questions
  let questions = writable([
    {
      id: 1,
      type: "MCQ",
      question: "What is 2+2?",
      options: {
        1: "3",
        2: "4",
        3: "5"
      },
      correct_option: "2",
      number: "5",
      neg_number: "2.5",
      answer: null
    },
    {
      id: 2,
      type: "MSQ",
      question: "Select all prime numbers",
      options: {
        1: "2",
        2: "3",
        3: "4",
        4: "5"
      },
      correct_option: ["1", "2", "4"],
      number: "5",
      answer: []
    },
    {
      id: 3,
      type: "NAT",
      question: "What is the value of Pi?",
      correct_answer: "3.14",
      number: "5",
      answer: ""
    },
    {
      id: 4,
      type: "SA",
      question: "Define gravity",
      key: "Force of attraction",
      number: "5",
      answer: ""
    }
  ]);

  let timeLeft = writable(600); // 10 minutes in seconds
  /**
   * @type {number | undefined}
   */
  let interval;

  onMount(() => {
    interval = setInterval(() => {
      timeLeft.update(n => {
        if (n > 0) {
          return n - 1;
        } else {
          clearInterval(interval);
          submitAnswers();
          return 0;
        }
      });
    }, 1000);
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function handleMCQAnswer(question, option) {
    questions.update(qs => {
      const q = qs.find(q => q.id === question.id);
      if (q) {
        q.answer = option;
      }
      return qs;
    });
  }

  function handleMSQAnswer(question, option) {
    questions.update(qs => {
      const q = qs.find(q => q.id === question.id);
      if (q) {
        if (q.answer.includes(option)) {
          q.answer = q.answer.filter(ans => ans !== option);
        } else {
          q.answer.push(option);
        }
      }
      return qs;
    });
  }

  function handleNATAnswer(question, answer) {
    questions.update(qs => {
      const q = qs.find(q => q.id === question.id);
      if (q) {
        q.answer = answer;
      }
      return qs;
    });
  }

  function handleSAAnswer(question, answer) {
    questions.update(qs => {
      const q = qs.find(q => q.id === question.id);
      if (q) {
        q.answer = answer;
      }
      return qs;
    });
  }

  function submitAnswers() {
    const answers = $questions.map(q => ({
      id: q.id,
      answer: q.answer
    }));
    console.log(answers);
    alert('Time is up! Answers submitted. Check console for details.');
  }

  function manuallySubmit() {
    clearInterval(interval);
    submitAnswers();
  }
</script>

<style>
  .card {
    @apply bg-base-100 shadow-md rounded-lg p-4 mb-4;
  }
</style>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Question Paper</h1>
  <div class="mb-4">
    <h2 class="text-xl font-bold">Time Left: {$timeLeft}</h2>
  </div>

  {#each $questions as question}
    <div class="card">
      <h2 class="text-xl font-bold mb-2">{question.question}</h2>

      {#if question.type === "MCQ"}
        {#each Object.keys(question.options) as option}
          <div class="mb-2">
            <input type="radio" id="option-{option}" name="mcq-{question.id}" on:change={() => handleMCQAnswer(question, option)} />
            <label for="option-{option}">{question.options[option]}</label>
          </div>
        {/each}

      {:else if question.type === "MSQ"}
        {#each Object.keys(question.options) as option}
          <div class="mb-2">
            <input type="checkbox" id="option-{option}" name="msq-{question.id}" on:change={() => handleMSQAnswer(question, option)} />
            <label for="option-{option}">{question.options[option]}</label>
          </div>
        {/each}

      {:else if question.type === "NAT"}
        <input type="text" bind:value={question.answer} placeholder="Your Answer" class="input input-bordered w-full" on:input={(e) => handleNATAnswer(question, e.target.value)} />

      {:else if question.type === "SA"}
        <textarea bind:value={question.answer} placeholder="Your Answer" class="textarea textarea-bordered w-full" on:input={(e) => handleSAAnswer(question, e.target.value)}></textarea>
      {/if}
    </div>
  {/each}

  <button class="btn btn-primary" on:click={manuallySubmit}>Submit Answers</button>
</div>
