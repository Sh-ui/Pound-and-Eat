/**
 * Shui's Pounded Meal Generator
 * Main Application Initialization
 */

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create meal generator instance
  const mealGenerator = new MealGenerator();
  
  // Create UI instance with generator
  const ui = new MealGeneratorUI(mealGenerator);
  
  // Generate initial meal idea if URL has a query parameter
  if (window.location.search.includes('generate=true')) {
    ui.generateNewIdea();
  }

  // Create service worker for offline support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }
  
  // Add PWA install prompt
  let deferredPrompt;
  const installButton = document.createElement('button');
  installButton.style.display = 'none';
  installButton.className = 'install-btn';
  installButton.textContent = 'Install App';
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67+ from automatically showing the prompt
    e.preventDefault();
    
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show the install button
    installButton.style.display = 'block';
    
    installButton.addEventListener('click', () => {
      // Hide the install button
      installButton.style.display = 'none';
      
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clear the deferred prompt variable
        deferredPrompt = null;
      });
    });
    
    // Add install button to the page (e.g., in the header)
    const headerContainer = document.querySelector('header .container');
    if (headerContainer) {
      headerContainer.appendChild(installButton);
    }
  });
  
  // Basic keyboard shortcuts
  document.addEventListener('keydown', (event) => {
    // Generate new idea with Ctrl+G
    if (event.ctrlKey && event.key === 'g') {
      event.preventDefault();
      ui.generateNewIdea();
    }
    
    // Save current idea with Ctrl+S
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      ui.saveCurrentIdea();
    }
  });
}); 