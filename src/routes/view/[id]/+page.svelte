<script>
    /** @type {import('./$types').PageData} */
    export let data;
    console.log(data)
</script>
<main>
    <ul class="space-y-4">
        {#each data.answer as answer}
            <li class="card bg-base-200 shadow-xl">
                <div class="card-body">
                    <h3 class="card-title">Paper: {answer.expand.paper.name}</h3>
                    <p>submit Time: {new Date(answer.created).toLocaleString()}</p>
                    <p>Attempt: {answer.attempt}</p>
                    <div>
                        <a href='/view/answer/{answer.id}' class="btn btn-primary">view</a>
                    </div>
                </div>
            </li>
        {/each}
    </ul>
</main>