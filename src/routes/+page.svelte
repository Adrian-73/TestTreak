<script>
  
  import banner from '$lib/assets/banner.jpg'
  import teacher from '$lib/assets/teacher.jpg'
  import { onMount } from 'svelte';
  let features = [
    'Secure online exams',
    'Multiple question types (MCQ, MSQ, NAT, Short answer)',
    'AI-powered short answer grading',
    'Real-time collaboration',
    'Instant results and analytics',
  ];

  onMount(() => {
    
  });
</script>

<svelte:head>
  <title>Test Trek - Online Examination Platform</title>
</svelte:head>

<main class="min-h-screen bg-base-200">

  <section class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src={banner} class="max-w-xl rounded-lg shadow-2xl" alt="Students taking online exam" />
      <!-- Image prompt: A group of diverse students sitting at computers, focused on taking an online exam -->
      <div>
        <h1 class="text-7xl font-bold">Welcome to Test Trek</h1>
        <p class="py-6 text-lg">Revolutionize your online examinations with our advanced platform. Featuring AI-powered grading, multiple question types, and seamless collaboration tools.</p>
        
      </div>
    </div>
  </section>

  <section id="features" class="py-16 bg-base-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each features as feature}
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">{feature}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod metus at sem bibendum, vel malesuada nunc malesuada.</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section id="about" class="py-16 bg-base-200">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-center">
        <div class="lg:w-1/2 mb-8 lg:mb-0">
          <h2 class="text-3xl font-bold mb-4">About Test Trek</h2>
          <p class="mb-4">Test Trek is a cutting-edge online examination platform designed to streamline the testing process for educators and students alike. Our platform combines the best features of Microsoft Teams with advanced AI-powered grading capabilities.</p>
          <p>With support for multiple question types and real-time collaboration tools, Test Trek provides a comprehensive solution for modern educational assessment needs.</p>
        </div>
        <div class="lg:w-1/2 lg:pl-8">
          <img src={teacher} class="rounded-lg shadow-xl" alt="Teacher creating an exam" />
        </div>
      </div>
    </div>
  </section>
  <section class="py-16 bg-base-300">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p class="mb-8">Join Test Trek today and revolutionize your online examination process.</p>
      <a href="/register" class="btn btn-primary btn-lg">Register Now</a>
    </div>
  </section>
  <section id="contact" class="py-16 bg-base-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <form class="max-w-md mx-auto">
        <div class="form-control mb-4">
          <label class="label" for="name">
            <span class="label-text">Name</span>
          </label>
          <input type="text" id="name" placeholder="Your name" class="input input-bordered w-full" />
        </div>
        <div class="form-control mb-4">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input type="email" id="email" placeholder="Your email" class="input input-bordered w-full" />
        </div>
        <div class="form-control mb-4">
          <label class="label" for="message">
            <span class="label-text">Message</span>
          </label>
          <textarea id="message" class="textarea textarea-bordered h-24" placeholder="Your message"></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-full">Send Message</button>
      </form>
    </div>
  </section>

  
</main>