<script>
  let name = "";
  let description = "";
</script>

<div class="form-container">
  <h1 class="text-2xl font-bold mb-4">Add New Group</h1>
  <form method="POST" class="form-control">
    <label for="name" class="label">
      <span class="label-text">Name</span>
    </label>
    <input
      type="text"
      name="name"
      id="name"
      value={name}
      required
      class="input input-bordered mb-4"
    />
    <label for="description" class="label">
      <span class="label-text">Description</span>
    </label>
    <input
      type="text"
      name="description"
      id="description"
      value= {description}
      required
      class="input input-bordered mb-4"
    />
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>

<style>
  .form-container {
    @apply max-w-md mx-auto p-4 bg-base-100 shadow-md rounded-lg;
  }
</style>
