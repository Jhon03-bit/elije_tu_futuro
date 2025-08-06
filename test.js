// Enhanced test functionality with better UX and accessibility
const Carreras = {
  ingenieria: {
    titulo: "🔧 ¡Podrías estudiar Ingeniería de Software, Robótica o Sistemas!",
    descripcion: "Estas carreras se enfocan en resolver problemas complejos usando tecnología. Tienen alta demanda laboral y buenos salarios.",
    salario: "$25,000 - $80,000 MXN mensual",
    universidades: ["UNAM", "Tecnológico de Monterrey", "IPN"]
  },
  psicologia: {
    titulo: "🧠 Te iría bien en Psicología, Educación o Trabajo Social.",
    descripcion: "Profesiones centradas en ayudar a las personas y mejorar su bienestar emocional y social.",
    salario: "$15,000 - $45,000 MXN mensual",
    universidades: ["UNAM", "UAM", "Iberoamericana"]
  },
  negocios: {
    titulo: "📈 ¡Carreras como Administración, Marketing o Economía son para ti!",
    descripcion: "Orientadas a liderar equipos, crear empresas y tomar decisiones estratégicas.",
    salario: "$20,000 - $70,000 MXN mensual",
    universidades: ["Tecnológico de Monterrey", "UNAM", "Anáhuac"]
  }
};

// Smooth scroll function
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Enhanced result display
function mostrarResultado(respuesta) {
  const resultadoDiv = document.getElementById("resultado");
  const carrera = Carreras[respuesta];
  
  if (!carrera) {
    resultadoDiv.innerHTML = '<p class="text-red-600">Error al procesar tu respuesta. Por favor, intenta de nuevo.</p>';
    return;
  }
  
  resultadoDiv.innerHTML = `
    <div class="bg-blue-50 p-4 rounded-lg mt-4">
      <h3 class="text-lg font-bold text-blue-800 mb-2">${carrera.titulo}</h3>
      <p class="text-gray-700 mb-3">${carrera.descripcion}</p>
      <div class="text-sm">
        <p class="font-semibold">💰 Salario promedio: <span class="text-green-600">${carrera.salario}</span></p>
        <p class="font-semibold mt-2">🏫 Universidades recomendadas:</p>
        <ul class="list-disc list-inside text-gray-600">
          ${carrera.universidades.map(uni => `<li>${uni}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  
  // Add animation
  resultadoDiv.classList.add('fade-in');
  
  // Scroll to result
  setTimeout(() => {
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        smoothScroll(this.getAttribute('href'));
      }
    });
  });
  
  // Form validation and submission
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const nombre = this.querySelector('input[type="text"]').value.trim();
      const email = this.querySelector('input[type="email"]').value.trim();
      const mensaje = this.querySelector('textarea').value.trim();
      
      // Validation
      if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos.');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
  
  // Add loading states for buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      if (this.type !== 'submit') {
        this.classList.add('opacity-75');
        setTimeout(() => {
          this.classList.remove('opacity-75');
        }, 300);
      }
    });
  });
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab' && !e.shiftKey) {
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (document.activeElement === lastElement) {
      e.preventDefault();
      focusableElements[0].focus();
    }
  }
});

// Performance optimization: Lazy load images when we add them
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
  // Google Analytics 4 tracking code would go here
  console.log('Event tracked:', { category, action, label });
}

// Track test completions
function trackTestCompletion(result) {
  trackEvent('Test Vocacional', 'Completado', result);
}
