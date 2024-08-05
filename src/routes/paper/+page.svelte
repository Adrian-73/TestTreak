<script>
// @ts-nocheck

  // @ts-ignore
  export let data;
  import { writable, get } from "svelte/store";

  const allgroup = data.allgroup;

 // @ts-ignore
   $: cards = writable([ {
      id: 1,
      content: {
        type: "MCQ",
        question: "What is 2+2?",
        options: {
          1: "3",
          2: "4",
          3: "5"
        },
        correct_option: "2",
        number: "5",
        neg_number: "2.5"
      }
    },
    {
      id: 2,
      content: {
        type: "MSQ",
        question: "Select all prime numbers",
        options: {
          1: "2",
          2: "3",
          3: "4",
          4: "5"
        },
        correct_option: ["1", "2", "4"],
        number: "5"
      }
    },
    {
      id: 3,
      content: {
        type: "NAT",
        question: "What is the value of Pi?",
        correct_answer: "3.14",
        number: "5"
      }
    },
    {
      id: 4,
      content: {
        type: "SA",
        question: "Define gravity",
        key: "Force of attraction",
        number: "5"
      }
    }]);
  let Submit = false;
  let submitError = "";
  /**
   * @type {{ id: any; } | null}
   */
  let editingCard = null;
  let Name = "Paper1";
  let Group = data.group ? data.group.id : null;

  let startTime = '';
  let endTime = '';
  $: form_data = {
    group: Group,
    name: Name,
    startTime: startTime,
    endTime: endTime,
    question: get(cards),
  };

  function updateFormData() {
    form_data = {
      group: Group,
      name: Name,
      startTime: new Date(startTime).toISOString().replace('T', ' ') ,
      endTime: new Date(endTime).toISOString().replace('T', ' ') ,
      // @ts-ignore
      question: ((cards) => {
        // @ts-ignore
        let temp = get(cards);
        for (let i = 0; i < temp.length; i++) {
          temp[i].id = i + 1;
          if (temp[i].content.type === "MCQ") {
            if (
              temp[i].content.question === "" ||
              temp[i].content.correct_option === "" ||
              temp[i].content.number === "" ||
              temp[i].content.neg_number === ""
            ) {
              for (
                let j = 1;
                j <= Object.keys(temp[i].content.options).length;
                j++
              ) {
                if (temp[i].content.options[j] === "") {
                  Submit = false;
                  submitError = `${i + 1} :Please fill all the fields`;
                }
              }
              Submit = false;
              submitError = "Please fill all the fields";
            } else {
              Submit = true;
            }
          } else if (temp[i].content.type === "MSQ") {
            if (
              temp[i].content.question === "" ||
              temp[i].content.number === "" ||
              temp[i].content.correct_option.length === 0
            ) {
              for (
                let j = 1;
                j <= Object.keys(temp[i].content.options).length;
                j++
              ) {
                if (temp[i].content.options[j] === "") {
                  Submit = false;
                  submitError = `${i + 1} :Please fill all the fields`;
                }
              }
              Submit = false;
              submitError = `${i + 1} :Please fill all the fields`;
            } else {
              Submit = true;
            }
          } else if (temp[i].content.type === "NAT") {
            if (
              temp[i].content.question === "" ||
              temp[i].content.correct_answer === "" ||
              temp[i].content.number === ""
            ) {
              Submit = false;
              submitError = `${i + 1} :Please fill all the fields`;
            } else {
              Submit = true;
            }
          } else if (temp[i].content.type === "SA") {
            if (
              temp[i].content.question === "" ||
              temp[i].content.key === "" ||
              temp[i].content.number === ""
            ) {
              Submit = false;
              submitError = `${i + 1} :Please fill all the fields`;
            } else {
              Submit = true;
            }
          }
        }
        if (temp.length === 0) {
          Submit = false;
          // @ts-ignore
          submitError = `${i + 1} :Please fill all the fields`;
        }
        return temp;
      })(cards),
    };
  }
  // @ts-ignore
  function editCard(card) {
    editingCard = card;
    updateFormData();
  }

  // @ts-ignore
  function saveCard(id, newContent) {
    cards.update((allCards) => {
      // @ts-ignore
      const index = allCards.findIndex((c) => c.id === id);
      if (index !== -1) {
        // @ts-ignore
        allCards[index].content = newContent;
      }
      return allCards;
    });
    editingCard = null;
    updateFormData();
  }

  function cancelEdit() {
    editingCard = null;
  }

  // @ts-ignore
  function rearrangeCards(event) {
    const { oldIndex, newIndex } = event.detail;
    cards.update((allCards) => {
      // @ts-ignore
      const movedItem = allCards.splice(oldIndex, 1)[0];
      // @ts-ignore
      allCards.splice(newIndex, 0, movedItem);
      updateFormData();
      return allCards;
    });
  }

  function addCard(type = "MCQ") {
    cards.update((allCards) => {
      console.log(allCards);
      const newId = allCards.length
        // @ts-ignore
        ? Math.max(...allCards.map((c) => c.id)) + 1
        : 1;
      let newCard;
      if (type === "MCQ") {
        newCard = {
          id: newId,
          content: {
            type: "MCQ",
            question: "",
            options: {
              1: "",
              2: "",
            },
            correct_option: "",
            number: "",
            neg_number: "",
          },
        };
      } else if (type === "MSQ") {
        newCard = {
          id: newId,
          content: {
            type: "MSQ",
            question: "",
            options: {
              1: "",
              2: "",
            },
            correct_option: [],
            number: "",
          },
        };
      } else if (type === "NAT") {
        newCard = {
          id: newId,
          content: {
            type: "NAT",
            question: "",
            correct_answer: "",
            number: "",
          },
        };
      } else if (type === "SA") {
        newCard = {
          id: newId,
          content: {
            type: "SA",
            question: "",
            key: "",
            number: "",
          },
        };
      }
      // @ts-ignore
      allCards.push(newCard);
      updateFormData();
      return allCards;
    });
  }

  // @ts-ignore
  function removeCard(id) {
    cards.update((allCards) => {
      // @ts-ignore
      return allCards.filter((card) => card.id !== id);
    });
    updateFormData();
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Editable Rearrangeable Cards</h1>
  <div class="card-container">
    <form method="POST">
      <select bind:value={Group} class="select select-bordered w-full mb-2">
        <option value={null}>Public</option>
        {#each allgroup as group}
          <option value={group.id}>{group.grpname}</option>
        {/each}
      </select>

      <input
        type="text"
        bind:value={Name}
        placeholder="Paper Name"
        class="input input-bordered w-full mb-2"
      />
      <input
        type="datetime-local"
        bind:value={startTime}
        placeholder="Start Time"
        class="input input-bordered w-full mb-2"
      />
      <input
        type="datetime-local"
        bind:value={endTime}
        placeholder="End Time"
        class="input input-bordered w-full mb-2"
      />

      {#each $cards as card, index}
        <div
          class="card"
          draggable="true"
          on:dragstart={(e) => e.dataTransfer.setData("text/plain", index)}
          on:drop={(e) => {
            e.preventDefault();
            rearrangeCards({
              detail: {
                oldIndex: parseInt(e.dataTransfer.getData("text/plain")),
                newIndex: index,
              },
            });
          }}
          on:dragover={(e) => e.preventDefault()}
        >
          {#if editingCard && editingCard.id === card.id}
            <div>
              <p><label>Q.no: {index + 1}</label></p>
              <label>Type: {card.content.type}</label>
              <input
                type="text"
                bind:value={card.content.question}
                placeholder="Question"
                class="input input-bordered w-full mb-2"
              />
              {#if card.content.type === "MCQ" || card.content.type === "MSQ"}
                <label>Options:</label>
                {#each Object.keys(card.content.options) as optionId}
                  <div class="flex gap-2 mb-2">
                    <input
                      type="text"
                      bind:value={card.content.options[optionId]}
                      placeholder="Option"
                      class="input input-bordered w-full"
                    />
                    <button
                      type="button"
                      class="btn btn-error btn-xs"
                      on:click={() => delete card.content.options[optionId]}
                      >Remove</button
                    >
                  </div>
                {/each}
                <button
                  type="button"
                  class="btn btn-secondary btn-xs"
                  on:click={() =>
                    (card.content.options[
                      Object.keys(card.content.options).length + 1
                    ] = "")}>Add Option</button
                >
                <input
                  type="text"
                  bind:value={card.content.correct_option}
                  placeholder="Correct Option"
                  class="input input-bordered w-full mt-2"
                />
                {#if card.content.type === "MCQ"}
                  <input
                    type="text"
                    bind:value={card.content.neg_number}
                    placeholder="Negative Marking"
                    class="input input-bordered w-full mt-2"
                  />
                {/if}
              {:else if card.content.type === "NAT"}
                <input
                  type="text"
                  bind:value={card.content.correct_answer}
                  placeholder="Correct Answer"
                  class="input input-bordered w-full mt-2"
                />
              {:else if card.content.type === "SA"}
                <input
                  type="text"
                  bind:value={card.content.key}
                  placeholder="Key"
                  class="input input-bordered w-full mt-2"
                />
              {/if}
              <input
                type="text"
                bind:value={card.content.number}
                placeholder="Marks"
                class="input input-bordered w-full mt-2"
              />
              <div class="flex justify-end mt-2">
                <button
                  type="button"
                  class="btn btn-primary btn-sm mr-2"
                  on:click={() => saveCard(card.id, card.content)}>Save</button
                >
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  on:click={cancelEdit}>Cancel</button
                >
              </div>
            </div>
          {:else}
            <div on:click={() => editCard(card)}>
              <p><strong>Q.no:</strong><label> {index + 1}</label></p>
              <p><strong>Type:</strong> {card.content.type}</p>
              <p><strong>Question:</strong> {card.content.question}</p>
              {#if card.content.type === "MCQ" || card.content.type === "MSQ"}
                <p><strong>Options:</strong></p>
                <ul>
                  {#each Object.keys(card.content.options) as optionId}
                    <li>{optionId}: {card.content.options[optionId]}</li>
                  {/each}
                </ul>
                <p>
                  <strong>Correct Option:</strong>
                  {Array.isArray(card.content.correct_option)
                    ? card.content.correct_option.join(", ")
                    : card.content.correct_option}
                </p>
                {#if card.content.type === "MCQ"}
                  <p>
                    <strong>Negative Marking:</strong>
                    {card.content.neg_number}
                  </p>
                {/if}
              {:else if card.content.type === "NAT"}
                <p>
                  <strong>Correct Answer:</strong>
                  {card.content.correct_answer}
                </p>
              {:else if card.content.type === "SA"}
                <p><strong>Key:</strong> {card.content.key}</p>
              {/if}
              <p><strong>Marks:</strong> {card.content.number}</p>
            </div>
          {/if}
          <div>
            <button
              type="button"
              class="btn btn-error btn-sm mt-2"
              on:click={() => removeCard(card.id)}>Delete</button
            >
          </div>
        </div>
      {/each}
      <div class="">
        <label
          >data
          <textarea
            class="textarea textarea-bordered w-full"
            name="data"
            value={JSON.stringify(form_data)}
            readonly
          />
        </label>
      </div>
      <div class="flex justify-between ">
        <div class="mt-4">
          <button
            type="button"
            class="btn btn-primary mr-2"
            on:click={() => addCard("MCQ")}>Add MCQ Card</button
          >
          <button
            type="button"
            class="btn btn-primary mr-2"
            on:click={() => addCard("MSQ")}>Add MSQ Card</button
          >
          <button
            type="button"
            class="btn btn-primary mr-2"
            on:click={() => addCard("NAT")}>Add NAT Card</button
          >
          <button
            type="button"
            class="btn btn-primary"
            on:click={() => addCard("SA")}>Add Short Answer Card</button
          >
        </div>
        {#if !Submit}
          <button
            class="btn btn-error mt-4 ml-2"
            style="pointer-events: none;  cursor: not-allowed;  opacity: 0.65;filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;">Submit Question Paper</button
          >
        {:else}
          <button class="btn btn-secondary mt-4 ml-2"
            >Submit Question Paper</button
          >
        {/if}
      </div>
    </form>
  </div>
</div>

<style>
  .card-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .card {
    @apply bg-accent-content shadow-md rounded-lg p-4 flex flex-col gap-2;
    cursor: pointer;
  }
</style>
