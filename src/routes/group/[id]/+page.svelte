<script>
    import { onMount, onDestroy } from 'svelte';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import PocketBase from 'pocketbase';

    export let data;
    data.group.expand.Co_Admins = data.group.expand.Co_Admins || [];
    data.group.expand.Members = data.group.expand.Members || [];
    
    let showPapers = true;
    let newMessage = '';
    let chatMessages = data.chatMessages || [];
    /**
   * @type {PocketBase}
   */
    let pb;

    $: allUsers = [
        { ...data.group.expand.Admin, role: 'Admin' },
        ...data.group.expand.Co_Admins.map((/** @type {any} */ user) => ({ ...user, role: 'Co-Admin' })),
        ...data.group.expand.Members.map((/** @type {any} */ user) => ({ ...user, role: 'Member' }))
    ];

    $: papers = data.group.expand.paper_via_grp || [];

    onMount(() => {
        pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your PocketBase URL
        pb.collection('grpchat').subscribe('*', async ({ action, record }) => {
            if (action === 'create') {
                const expandedRecord = await pb.collection('grpchat').getOne(record.id, {
                    expand: 'sender'
                    
                });
                console.log(expandedRecord);
                chatMessages = [...chatMessages, expandedRecord];
            }
        });
    });

    onDestroy(() => {
        if (pb) {
            pb.collection('grpchat').unsubscribe();
        }
    });

    function handleSubmit() {
        newMessage = '';
        invalidateAll();
    }

    /**
   * @param {{ user_id: any; }} message
   */
    function isCurrentUser(message) {
        // @ts-ignore
        return message.sender === data.user.id;
    }
</script>
<b class = "text-lg">text</b>

<main class="container mx-auto p-4 flex">
    <aside class="w-1/4 pr-4">
        <h2 class="text-xl font-bold mb-4">Group Members</h2>
        <ul class="menu bg-base-200 w-full rounded-box">
            {#each allUsers as user}
                <li>
                    <a class="flex justify-between" href="/chat/{user.id}">
                        <span>{user.username}</span>
                        <span class="badge">{user.role}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </aside>

    <div class="w-3/4">
        <div class="tabs tabs-boxed mb-4">
            <button
                class="tab" 
                class:tab-active={showPapers} 
                on:click={() => showPapers = true}
            >
                Papers
        </button>
            <button 
                class="tab" 
                class:tab-active={!showPapers} 
                on:click={() => showPapers = false}
            >
                Chat Room
            </button>
        </div>

        {#if showPapers}
            <div class="papers">
                <h2 class="text-2xl font-bold mb-4">Papers</h2>
                {#if papers.length > 0}
                    <ul class="space-y-4">
                        {#each papers as paper}
                            <li class="card bg-base-100 shadow-xl">
                                <div class="card-body">
                                    <h3 class="card-title">Paper: {paper.name}</h3>
                                    <p>Start Time: {new Date(paper.start_time).toLocaleString()}</p>
                                    <p>End Time: {new Date(paper.end_time).toLocaleString()}</p>
                                    <p>Max Attempts: {paper.max_attempts}</p><div>
                                    <a href = "/test/{paper.id}" class="btn btn-primary">Start</a>
                                    {#if data.user.type == "examiner"}
                                        <a href = "/edit/{paper.id}" class="btn btn-accent">Edit</a>
                                        <a href = "/delete/{paper.id}" class="btn btn-error">Delete</a>
                                    {/if}
                                    {#if new Date(paper.end_time) < new Date()}
                                        <a href='/view/{paper.id}' class="btn btn-primary">view</a>
                                    {/if}</div>
                                </div>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p>No papers available.</p>
                {/if}
            </div>
        {:else}
            <div class="chat-room">
                <h2 class="text-2xl font-bold mb-4">Chat Room</h2>
                <div class="chat-messages h-96 overflow-y-auto mb-4 p-4 bg-base-200 rounded-box">
                    {#each chatMessages as message}
                        <div class="chat {isCurrentUser(message) ? 'chat-end' : 'chat-start'} mb-2">
                            <div class="chat-header">
                                {message.expand?.sender?.username || 'Unknown'}
                            </div>
                            <div class="chat-bubble {isCurrentUser(message) ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
                                {message.message}
                            </div>
                        </div>
                    {/each}
                </div>
                <form 
                    method="POST" 
                    action="?/sendMessage" 
                    use:enhance={() => {
                        return ({ result }) => {
                            if (result.type === 'success') {
                                handleSubmit();
                            }
                        };
                    }}
                    class="flex"
                >
                    <input type="hidden" name="userId" value={data.user.id} />
                    <input 
                        type="text" 
                        name="message"
                        bind:value={newMessage} 
                        placeholder="Type a message..." 
                        class="input input-bordered flex-grow mr-2"
                    />
                    <button type="submit" class="btn btn-primary">Send</button>
                </form>
            </div>
        {/if}
    </div>
</main>
