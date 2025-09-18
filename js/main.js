// Brandown Wijngaarde — Portfolio Interactions
(function(){
  const root = document.documentElement;
  
  // Custom Cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .card, .service-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
      });
    });
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('bw-theme');
  const initial = stored || (prefersDark ? 'dark' : 'light');
  if(initial === 'dark'){
    root.setAttribute('data-theme','dark');
  } else if(initial === 'light'){
    root.setAttribute('data-theme','light');
  }

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  if(toggle){
    toggle.addEventListener('click',()=>{
      const current = root.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('bw-theme', next);
    });
  }

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-nav');
  if(navToggle && navList){
    navToggle.addEventListener('click',()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });
    navList.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      });
    });
  }

  // Year
  const year = document.getElementById('year');
  if(year){ year.textContent = String(new Date().getFullYear()); }

  // Enhanced reveal on scroll with multiple animation types
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry, index)=>{
      if(entry.isIntersecting){
        setTimeout(()=>{
          entry.target.classList.add('visible');
          // Add gentle effects based on element type
          if(entry.target.classList.contains('service-card')){
            entry.target.style.animation = `smoothSlide 1.2s ease-out ${index * 0.15}s both`;
          }
          if(entry.target.classList.contains('flip-card')){
            entry.target.style.animation = `softZoom 1.2s ease-out ${index * 0.2}s both`;
          }
        }, index * 150); // Gentle staggered delay
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.1, rootMargin:'-50px'});
  
  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el=>observer.observe(el));

  // Parallax effect for hero stats
  const heroStats = document.querySelectorAll('.stat');
  window.addEventListener('scroll', ()=>{
    const scrolled = window.pageYOffset;
    heroStats.forEach((stat, index)=>{
      const speed = 0.5 + (index * 0.1);
      stat.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Calm loading animation with gentle effects
  window.addEventListener('load', ()=>{
    document.body.classList.add('loaded');
    
    // Trigger hero animations with gentle delays
    const heroElements = document.querySelectorAll('.hero-main h1, .hero-description, .hero-actions');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 300);
    });
  });

  // Add gentle hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.btn, .nav-arrow, .gallery-item, .service-card, .flip-card, .project-link');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-1px)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translateY(0)';
    });
  });

  // Add click functionality to project links
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Add a subtle click animation
      link.style.transform = 'scale(0.98)';
      setTimeout(() => {
        link.style.transform = 'translateY(-2px)';
      }, 100);
    });
  });

  // Mouse move parallax for cards
  const cards = document.querySelectorAll('.card, .service-card, .testimonial');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  // Typing effect for hero title
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 1000);
  }

  // Counter animation for stats
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start) + '+';
      if (start >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      }
    }, 16);
  };

  // Trigger counter animation when stats are visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.textContent);
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStatsSection = document.querySelector('.hero-stats');
  if (heroStatsSection) {
    statsObserver.observe(heroStatsSection);
  }

  // 3D Dino Model Loader
  function initDinoModel() {
    const canvas = document.getElementById('dino-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Variable to store the loaded FBX model
    let dinoModel = null;

    // Camera position
    camera.position.set(3, 2, 5);
    camera.lookAt(0, 0, 0);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      
      // Rotate the GLB model if it's loaded
      if (dinoModel) {
        dinoModel.rotation.y += 0.01;
        dinoModel.rotation.x += 0.005;
      }
      
      renderer.render(scene, camera);
    }

    // Handle resize
    function handleResize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);
    animate();

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load(
      'assets/models/dino.glb',
      function(gltf) {
        // Store the model reference
        dinoModel = gltf.scene;
        
        // Add the loaded model to the scene
        dinoModel.scale.setScalar(2);
        dinoModel.position.set(0, -1, 0);
        scene.add(dinoModel);
        
        console.log('GLB model loaded successfully');
      },
      function(progress) {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      function(error) {
        console.log('Error loading GLB model:', error);
        // Show a simple loading message if GLB fails to load
        const loadingText = document.createElement('div');
        loadingText.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #666;
          font-family: Arial, sans-serif;
          font-size: 14px;
          text-align: center;
        `;
        loadingText.textContent = 'Loading 3D Model...';
        canvas.parentElement.appendChild(loadingText);
      }
    );
  }

  // Initialize the 3D model when the page loads
  setTimeout(initDinoModel, 1000); // Delay to ensure everything is loaded
})();


