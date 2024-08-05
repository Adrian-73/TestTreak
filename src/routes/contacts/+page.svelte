<script>
    export let data;

    let contacts = data.contacts || [];
    let currentUser = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        type: data.user.type
    };

    function removeContact(contactId) {
        // This function would typically make an API call to remove the contact
        contacts = contacts.filter(contact => contact.id !== contactId);
    }

    function addContact() {
        // This function would typically open a modal or navigate to an "add contact" page
        alert("Add contact functionality to be implemented");
    }
</script>

<main class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Contacts</h1>

    <div class="mb-8">
        <h2 class="text-2xl font-bold mb-2">Your Profile</h2>
        <div class="card bg-base-200 shadow-xl p-4">
            <p><strong>Username:</strong> {currentUser.username}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Type:</strong> {currentUser.type}</p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each contacts as contact (contact.id)}
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{contact.username}</h2>
                    <p>Email: {contact.email}</p>
                    <p>Type: {contact.type}</p>
                    <p>Verified: {contact.verified ? 'Yes' : 'No'}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-error btn-sm" on:click={() => removeContact(contact.id)}>Remove Contact</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <div class="mt-8">
        <button class="btn btn-primary" on:click={addContact}>Add New Contact</button>
    </div>
</main>

<style>
    /* Add any custom styles here */
</style>