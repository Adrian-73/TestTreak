<script>
    import { writable } from 'svelte/store';
    export let data;
    console.log(data)
    // Initialize data
    let groups = writable([
      { id: 1, name: "Group 1", description: "This is group 1." },
      { id: 2, name: "Group 2", description: "This is group 2." },
      { id: 3, name: "Group 3", description: "This is group 3." }
    ]);
  
    let publicExams = writable([
      { id: 1, name: "Public Exam 1", date: "2023-06-01" },
      { id: 2, name: "Public Exam 2", date: "2023-07-15" },
      { id: 3, name: "Public Exam 3", date: "2023-08-20" }
    ]);
  
    let groupExams = writable([
      { id: 1, name: "Group Exam 1", group: "Group 1", date: "2023-06-10" },
      { id: 2, name: "Group Exam 2", group: "Group 2", date: "2023-07-22" },
      { id: 3, name: "Group Exam 3", group: "Group 3", date: "2023-09-05" }
    ]);
  </script>
  
  <style>
    .card {
      @apply  shadow-md rounded-lg p-4 mb-4;
    }
  </style>
  
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Home Page</h1>
  
    <div class="mb-8 ">
      <h2 class="text-2xl font-bold mb-4">Groups</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each $groups as group}
          <div class="card h-56">
            <h3 class="text-xl font-bold">{group.name}</h3>
            <p>{group.description}</p>
          </div>
        {/each}
      </div>
    </div>
  
    <div class="mb-8 ">
      <h2 class="text-2xl font-bold mb-4">Public Exams</h2>
      <div class="flex-col flex gap-4 ">
        {#each $publicExams as exam}
          <div class="card">
            <h3 class="text-xl font-bold">{exam.name}</h3>
            <p>Date: {exam.date}</p>
          </div>
        {/each}
      </div>
    </div>
  
    <div>
      <h2 class="text-2xl font-bold mb-4">Group Exams</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each $groupExams as exam}
          <div class="card">
            <h3 class="text-xl font-bold">{exam.name}</h3>
            <p>Group: {exam.group}</p>
            <p>Date: {exam.date}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
  