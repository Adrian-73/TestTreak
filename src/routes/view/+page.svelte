<script>
    /** @type {import('./$types').PageData} */
    export let data;
    console.log(data)
    ;
</script>
<main>
    {#each data.grps as grp}
    <section class='m-3'>

    <div ><h1 class = "text-2xl font-bold mb-4" >{grp.grpname}</h1>
        <ul class="space-y-4">
            {#if grp.expand}
            {#each grp.expand.paper_via_grp as paper}
                <li class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title">Paper: {paper.name}</h3>
                        <p>Start Time: {new Date(paper.start_time).toLocaleString()}</p>
                        <p>End Time: {new Date(paper.end_time).toLocaleString()}</p>
                        <p>Max Attempts: {paper.max_attempts}</p><div>
                            
                        {#if data.user.type == "examiner"}
                            <a href = "/edit/{paper.id}" class="btn btn-accent">Edit</a>
                            <a href = "/delete/{paper.id}" class="btn btn-error">Delete</a>
                        {/if}
                        {#if new Date(paper.end_time) < new Date()}
                            <a href='view/{paper.id}' class="btn btn-primary">view</a>
                        {/if}</div>
                    </div>
                </li>
            {/each}{/if}
        </ul>
    </div>
    </section>
        
    {/each}
</main>