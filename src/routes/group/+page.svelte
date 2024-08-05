<script>
  export let data;

  import  admin  from '$lib/assets/admin.png'
  import  member from '$lib/assets/member.png'
  import  coadmin from '$lib/assets/coadmin.png'
  import  create from '$lib/assets/create.png'

  console.log(data.groups)
  const lis = data.groups
</script>

<div class = "grid xl:grid-cols-4 lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1  place-items-center">
  {#each lis as li}
    <div class="card z-[5] bg-base-200 max-w-80 max-w-screen shadow-xl">
      <figure>
        {#if li.Admin == data.user.id}
          <img
          src={admin}
          alt="admin"
          />
          {:else if li.Co_Admins.includes(data.user.id)}
          <img
          src={coadmin}
          alt="coadmin"
          />
          {:else}
          <img
          src={member}
          alt="member"
          />
        
        {/if}
      </figure>
      <div class="card-body items-center">
        <h2 class="card-title">{li.grpname}</h2>
        <p >{li.expand.Admin.username}</p>
        <a href="/group/{li.id}" 
          class=" btn btn-circle bg-secondary  "
          ><svg height="2rem" width="2rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 227.096 227.096" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon style="fill:#010002;" points="152.835,39.285 146.933,45.183 211.113,109.373 0,109.373 0,117.723 211.124,117.723 146.933,181.902 152.835,187.811 227.096,113.55 "></polygon> </g> </g> </g></svg></a
        >
      </div>
    </div>
  {/each}
  {#if data.user.type == "examiner"}
  <div class="card z-[5] bg-base-200  max-w-80 shadow-xl">
    <figure>
      <img
        src={create}
        alt="create"
      />
    </figure>
    <div class="card-body items-center">
      <h2 class="card-title">Add New Group</h2>
      <a href="/group/new" 
        class=" btn btn-circle bg-secondary  "
        ><svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></a
      >
    </div>
  </div>
  {/if}
</div>
