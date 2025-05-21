/**
 * Shui's Pounded Meal Generator
 * UI Interactions
 */

class MealGeneratorUI {
  constructor(generator) {
    // Store reference to generator logic
    this.generator = generator;
    
    // UI elements
    this.generateBtn = document.getElementById('generate-btn');
    this.resultContainer = document.getElementById('result');
    this.mealTitle = document.getElementById('meal-title');
    this.flavorProfile = document.getElementById('flavor-profile');
    this.instructions = document.getElementById('instructions');
    this.notes = document.getElementById('notes');
    this.saveBtn = document.getElementById('save-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.savedList = document.getElementById('saved-list');
    
    // Filter elements
    this.cuisineFilter = document.getElementById('cuisine-filter');
    this.proteinFilter = document.getElementById('protein-filter');
    this.flavorFilter = document.getElementById('flavor-filter');
    
    // Current cuisine tooltip (will be created dynamically)
    this.currentTooltip = null;
    this.activeTooltip = null;
    
    // Locked components for RNG massage
    this.lockedComponents = {};
    this.lockedSummary = null;
    
    // Initialize
    this.initEventListeners();
    this.populateFilterOptions();
    this.loadSavedIdeas();
    
    // Close tooltips when clicking outside
    document.addEventListener('click', (e) => {
      if (this.activeTooltip && !e.target.closest('.cuisine-info')) {
        this.activeTooltip.classList.remove('active');
        this.activeTooltip = null;
      }
    });
  }
  
  /**
   * Initialize all event listeners
   */
  initEventListeners() {
    // Generate button
    this.generateBtn.addEventListener('click', () => this.generateNewIdea());
    
    // Save button
    this.saveBtn.addEventListener('click', () => this.saveCurrentIdea());
    
    // Share button
    this.shareBtn.addEventListener('click', () => this.shareMealIdea());
    
    // Filter changes
    this.cuisineFilter.addEventListener('change', () => this.updateFilters());
    this.proteinFilter.addEventListener('change', () => this.updateFilters());
    this.flavorFilter.addEventListener('change', () => this.updateFilters());
  }
  
  /**
   * Generate a new meal idea and update the UI
   */
  generateNewIdea() {
    // Get current filters
    const filters = this.getActiveFilters();
    
    // Generate meal idea with preserved components if any are locked
    const mealIdea = this.generator.generateMeal(filters, this.lockedComponents);
    
    // Update UI with new idea
    this.updateUI(mealIdea);
    
    // Show result container if hidden
    this.resultContainer.classList.remove('hidden');
    
    // Scroll to result
    this.resultContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Update generate button appearance
    this.updateGenerateButtonState();
  }
  
  /**
   * Update UI with meal idea
   * @param {Object} mealIdea - Meal idea object
   */
  updateUI(mealIdea) {
    // Update title with lockable components
    this.updateTitleWithLockableComponents(mealIdea);
    
    // Update flavor profile with cuisine info icon
    const cuisineInfo = this.createCuisineInfo(mealIdea.cuisine, mealIdea.flavorProfile);
    
    // Clear flavor profile and add new content
    this.flavorProfile.innerHTML = '';
    this.flavorProfile.appendChild(cuisineInfo);
    
    // Clear existing instructions
    this.instructions.innerHTML = '';
    
    // Add each instruction step
    mealIdea.steps.forEach(step => {
      const li = document.createElement('li');
      
      // Process step text to make components lockable
      li.innerHTML = this.processStepText(step, mealIdea);
      
      // Add click event listeners to lockable components in this step
      const lockableComponents = li.querySelectorAll('.lockable-component');
      lockableComponents.forEach(component => {
        component.addEventListener('click', () => this.toggleComponentLock(component));
      });
      
      this.instructions.appendChild(li);
    });
    
    // Update notes
    this.notes.textContent = `This ${mealIdea.cuisine} dish uses the ${mealIdea.template} workflow. The irregular textures from pounding create a rustic, satisfying meal with minimal prep.`;
    
    // Add cuisine-specific tips
    const tipElement = document.createElement('p');
    tipElement.className = 'cuisine-tip';
    tipElement.innerHTML = this.generateCuisineTip(mealIdea);
    this.notes.appendChild(tipElement);
    
    // Create or update locked summary
    this.updateLockedSummary();
  }
  
  /**
   * Process step text to make components lockable
   * @param {string} step - Instruction step text
   * @param {Object} mealIdea - Current meal idea
   * @returns {string} Processed HTML with lockable components
   */
  processStepText(step, mealIdea) {
    // Get all components for this meal
    const components = {
      cuisine: mealIdea.cuisine,
      technique: mealIdea.technique,
      protein: mealIdea.protein,
      vegetable: mealIdea.vegetable,
      aromatics: mealIdea.aromatics,
      finishers: mealIdea.finishers,
      vessel: mealIdea.vessel,
      flavorProfile: mealIdea.flavorProfile
    };
    
    // Replace component mentions with lockable spans
    let processedStep = step;
    
    for (const [type, value] of Object.entries(components)) {
      if (!value) continue;
      
      // Create regex to find the component in text
      const regex = new RegExp(`\\b${value}\\b`, 'gi');
      
      // Check if this component is locked
      const isLocked = this.lockedComponents[type] === value;
      
      // Replace with lockable component
      processedStep = processedStep.replace(regex, (match) => {
        return `<span class="lockable-component ${isLocked ? 'locked' : ''}" 
                    data-type="${type}" 
                    data-value="${value}">${match}</span>`;
      });
    }
    
    return processedStep;
  }
  
  /**
   * Update title with lockable components
   * @param {Object} mealIdea - Meal idea object
   */
  updateTitleWithLockableComponents(mealIdea) {
    const titleParts = {
      cuisine: mealIdea.cuisine,
      technique: `${mealIdea.technique.toUpperCase()}ED`,
      protein: mealIdea.protein.toUpperCase(),
      vegetable: mealIdea.vegetable.toUpperCase()
    };
    
    // Create HTML for title with lockable components
    let titleHTML = '';
    
    for (const [type, value] of Object.entries(titleParts)) {
      // Skip connecting words
      if (type === 'technique') {
        titleHTML += ' ';
      } else if (type === 'protein') {
        titleHTML += ' ';
      } else if (type === 'vegetable') {
        titleHTML += ' WITH ';
      }
      
      // Check if this component is locked
      const originalValue = mealIdea[type]; // Get non-uppercase version for data attribute
      const isLocked = this.lockedComponents[type] === originalValue;
      
      // Add lockable component span
      titleHTML += `<span class="lockable-component ${isLocked ? 'locked' : ''}" 
                      data-type="${type}" 
                      data-value="${originalValue}">${value}</span>`;
    }
    
    // Update title HTML
    this.mealTitle.innerHTML = titleHTML;
    
    // Add click event listeners to lockable components
    const lockableComponents = this.mealTitle.querySelectorAll('.lockable-component');
    lockableComponents.forEach(component => {
      component.addEventListener('click', () => this.toggleComponentLock(component));
    });
  }
  
  /**
   * Create cuisine info element with tooltip
   * @param {string} cuisine - Cuisine name
   * @param {string} flavorProfile - Flavor profile description
   * @returns {HTMLElement} Cuisine info element
   */
  createCuisineInfo(cuisine, flavorProfile) {
    // Create container
    const container = document.createElement('div');
    container.className = 'cuisine-info';
    
    // Create text span with lockable components
    const text = document.createElement('span');
    
    // Check if cuisine or flavor profile is locked
    const isCuisineLocked = this.lockedComponents.cuisine === cuisine;
    const isFlavorLocked = this.lockedComponents.flavorProfile === flavorProfile;
    
    // Create lockable spans
    const cuisineSpan = `<span class="lockable-component ${isCuisineLocked ? 'locked' : ''}" 
                            data-type="cuisine" 
                            data-value="${cuisine}">${cuisine}</span>`;
    
    const flavorSpan = `<span class="lockable-component ${isFlavorLocked ? 'locked' : ''}" 
                            data-type="flavorProfile" 
                            data-value="${flavorProfile}">${flavorProfile}</span>`;
    
    text.innerHTML = `${cuisineSpan} cuisine - ${flavorSpan} flavor profile`;
    container.appendChild(text);
    
    // Add click event listeners to lockable components
    const lockableComponents = text.querySelectorAll('.lockable-component');
    lockableComponents.forEach(component => {
      component.addEventListener('click', () => this.toggleComponentLock(component));
    });
    
    // Create info icon
    const infoIcon = document.createElement('span');
    infoIcon.className = 'info-icon';
    infoIcon.textContent = 'i';
    container.appendChild(infoIcon);
    
    // Get cuisine description
    const cuisineData = this.generator.compatibility.cuisines[cuisine];
    
    if (cuisineData && cuisineData.description) {
      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'cuisine-tooltip';
      
      // Add content to tooltip
      const heading = document.createElement('h4');
      heading.textContent = `${cuisine} Cuisine`;
      tooltip.appendChild(heading);
      
      const description = document.createElement('p');
      description.textContent = cuisineData.description;
      tooltip.appendChild(description);
      
      const flavorText = document.createElement('p');
      flavorText.className = 'flavor';
      flavorText.textContent = `Flavor profile: ${flavorProfile}`;
      tooltip.appendChild(flavorText);
      
      // Add tooltip to container
      container.appendChild(tooltip);
      
      // Add click event to info icon
      infoIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close any active tooltip first
        if (this.activeTooltip && this.activeTooltip !== tooltip) {
          this.activeTooltip.classList.remove('active');
        }
        
        // Toggle this tooltip
        tooltip.classList.toggle('active');
        
        // Update active tooltip reference
        this.activeTooltip = tooltip.classList.contains('active') ? tooltip : null;
      });
    }
    
    return container;
  }
  
  /**
   * Toggle component lock status
   * @param {HTMLElement} component - The component element that was clicked
   */
  toggleComponentLock(component) {
    const type = component.dataset.type;
    const value = component.dataset.value;
    
    // Toggle locked state
    if (this.lockedComponents[type] === value) {
      // Unlock component
      delete this.lockedComponents[type];
      component.classList.remove('locked');
    } else {
      // Lock component
      this.lockedComponents[type] = value;
      component.classList.add('locked');
    }
    
    // Update all instances of this component type
    const allInstances = document.querySelectorAll(`.lockable-component[data-type="${type}"][data-value="${value}"]`);
    allInstances.forEach(instance => {
      if (this.lockedComponents[type] === value) {
        instance.classList.add('locked');
      } else {
        instance.classList.remove('locked');
      }
    });
    
    // Update locked summary
    this.updateLockedSummary();
    
    // Update generate button state
    this.updateGenerateButtonState();
  }
  
  /**
   * Update the locked components summary
   */
  updateLockedSummary() {
    // Create locked summary if it doesn't exist
    if (!this.lockedSummary) {
      this.lockedSummary = document.createElement('div');
      this.lockedSummary.className = 'locked-summary';
      
      const title = document.createElement('div');
      title.className = 'locked-summary-title';
      title.textContent = 'Locked Components:';
      this.lockedSummary.appendChild(title);
      
      const items = document.createElement('div');
      items.className = 'locked-items';
      this.lockedSummary.appendChild(items);
      
      // Add to recipe card
      this.resultContainer.querySelector('.recipe-card').appendChild(this.lockedSummary);
    }
    
    // Get the items container
    const itemsContainer = this.lockedSummary.querySelector('.locked-items');
    itemsContainer.innerHTML = '';
    
    // Check if any components are locked
    const hasLockedComponents = Object.keys(this.lockedComponents).length > 0;
    
    // Toggle visibility of summary
    if (hasLockedComponents) {
      this.lockedSummary.classList.add('active');
      
      // Add each locked component
      for (const [type, value] of Object.entries(this.lockedComponents)) {
        const item = document.createElement('div');
        item.className = 'locked-item';
        
        // Format type for display
        const typeDisplay = type.charAt(0).toUpperCase() + type.slice(1);
        
        item.textContent = `${typeDisplay}: ${value}`;
        
        // Add unlock icon
        const unlockIcon = document.createElement('span');
        unlockIcon.className = 'unlock-icon';
        unlockIcon.innerHTML = '&times;';
        unlockIcon.addEventListener('click', (e) => {
          e.stopPropagation();
          this.unlockComponent(type, value);
        });
        
        item.appendChild(unlockIcon);
        itemsContainer.appendChild(item);
      }
    } else {
      this.lockedSummary.classList.remove('active');
    }
  }
  
  /**
   * Unlock a specific component
   * @param {string} type - Component type
   * @param {string} value - Component value
   */
  unlockComponent(type, value) {
    // Remove from locked components
    delete this.lockedComponents[type];
    
    // Update all instances of this component
    const allInstances = document.querySelectorAll(`.lockable-component[data-type="${type}"][data-value="${value}"]`);
    allInstances.forEach(instance => {
      instance.classList.remove('locked');
    });
    
    // Update locked summary
    this.updateLockedSummary();
    
    // Update generate button state
    this.updateGenerateButtonState();
  }
  
  /**
   * Update generate button appearance based on locked components
   */
  updateGenerateButtonState() {
    const hasLockedComponents = Object.keys(this.lockedComponents).length > 0;
    
    if (hasLockedComponents) {
      this.generateBtn.classList.add('partial-reroll');
      this.generateBtn.textContent = 'Reroll Unlocked Components';
    } else {
      this.generateBtn.classList.remove('partial-reroll');
      this.generateBtn.textContent = 'Generate Meal Idea';
    }
  }
  
  /**
   * Save current meal idea
   */
  saveCurrentIdea() {
    const success = this.generator.saveCurrentIdea();
    
    if (success) {
      // Show success message
      this.showNotification('Meal idea saved!');
      
      // Refresh saved ideas list
      this.loadSavedIdeas();
    } else {
      this.showNotification('Failed to save meal idea.', 'error');
    }
  }
  
  /**
   * Share current meal idea
   */
  shareMealIdea() {
    const idea = this.generator.currentIdea;
    
    if (!idea) {
      this.showNotification('No meal idea to share.', 'error');
      return;
    }
    
    // Build share text
    const shareText = `Shui's Pounded Meal Generator idea:\n\n${idea.title}\n\nSteps:\n${idea.steps.map((step, i) => `${i+1}. ${step}`).join('\n')}`;
    
    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: idea.title,
        text: shareText
      }).catch(error => {
        console.error('Error sharing:', error);
        this.fallbackShare(shareText);
      });
    } else {
      this.fallbackShare(shareText);
    }
  }
  
  /**
   * Fallback sharing method using clipboard
   * @param {string} text - Text to share
   */
  fallbackShare(text) {
    // Create a temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    
    // Copy text
    textarea.select();
    document.execCommand('copy');
    
    // Remove textarea
    document.body.removeChild(textarea);
    
    // Show notification
    this.showNotification('Copied to clipboard! Ready to paste and share.');
  }
  
  /**
   * Show a notification to the user
   * @param {string} message - Message to display
   * @param {string} type - Notification type (success or error)
   */
  showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  /**
   * Populate filter dropdowns
   */
  populateFilterOptions() {
    const filterOptions = this.generator.getFilterOptions();
    
    // Populate cuisines
    filterOptions.cuisines.forEach(cuisine => {
      const option = document.createElement('option');
      option.value = cuisine;
      option.textContent = cuisine;
      this.cuisineFilter.appendChild(option);
    });
    
    // Populate proteins
    filterOptions.proteins.forEach(protein => {
      const option = document.createElement('option');
      option.value = protein;
      option.textContent = protein;
      this.proteinFilter.appendChild(option);
    });
    
    // Populate flavor profiles
    filterOptions.flavorProfiles.forEach(flavor => {
      const option = document.createElement('option');
      option.value = flavor;
      option.textContent = flavor;
      this.flavorFilter.appendChild(option);
    });
  }
  
  /**
   * Get active filters from UI
   * @returns {Object} Current filter values
   */
  getActiveFilters() {
    return {
      cuisine: this.cuisineFilter.value || null,
      protein: this.proteinFilter.value || null,
      flavorProfile: this.flavorFilter.value || null
    };
  }
  
  /**
   * Update filters and regenerate idea if visible
   */
  updateFilters() {
    // Only regenerate if we already have a visible result
    if (!this.resultContainer.classList.contains('hidden')) {
      this.generateNewIdea();
    }
  }
  
  /**
   * Load and display saved meal ideas
   */
  loadSavedIdeas() {
    const savedIdeas = this.generator.getSavedIdeas();
    
    // Clear existing items
    this.savedList.innerHTML = '';
    
    if (savedIdeas.length === 0) {
      // Show empty state
      const emptyState = document.createElement('p');
      emptyState.className = 'empty-state';
      emptyState.textContent = 'Your saved meal ideas will appear here';
      this.savedList.appendChild(emptyState);
      return;
    }
    
    // Add each saved idea
    savedIdeas.forEach(idea => {
      const savedItem = document.createElement('div');
      savedItem.className = 'saved-item';
      
      // Create title
      const title = document.createElement('h3');
      title.textContent = idea.title;
      savedItem.appendChild(title);
      
      // Create info
      const info = document.createElement('p');
      
      // Create cuisine info with tooltip
      const cuisineInfo = this.createCuisineInfo(idea.cuisine, idea.flavorProfile);
      info.appendChild(cuisineInfo);
      
      savedItem.appendChild(info);
      
      // Create action buttons
      const actions = document.createElement('div');
      actions.className = 'saved-actions';
      
      // Load button
      const loadBtn = document.createElement('button');
      loadBtn.className = 'secondary-btn';
      loadBtn.textContent = 'Load';
      loadBtn.addEventListener('click', () => {
        this.generator.currentIdea = idea;
        this.updateUI(idea);
        this.resultContainer.classList.remove('hidden');
        this.resultContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Reset locked components when loading a saved idea
        this.lockedComponents = {};
        this.updateGenerateButtonState();
      });
      actions.appendChild(loadBtn);
      
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'secondary-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        if (confirm('Delete this saved meal idea?')) {
          this.generator.deleteSavedIdea(idea.id);
          this.loadSavedIdeas();
        }
      });
      actions.appendChild(deleteBtn);
      
      savedItem.appendChild(actions);
      
      // Add to saved list
      this.savedList.appendChild(savedItem);
    });
  }
  
  /**
   * Generate cuisine-specific tips for recipe customization
   * @param {Object} mealIdea - Current meal idea
   * @returns {string} HTML string with cuisine tips
   */
  generateCuisineTip(mealIdea) {
    const cuisine = mealIdea.cuisine;
    const cuisineData = this.generator.compatibility.cuisines[cuisine];
    
    if (!cuisineData) {
      return ''; // No specific tips for this cuisine
    }
    
    let tipHTML = '<strong>Cuisine Tips:</strong> ';
    
    // Get potential aromatics swaps
    let aromaticTips = '';
    if (cuisineData.recommendedAromatics && cuisineData.recommendedAromatics.length > 0) {
      // Filter out the current aromatics
      const otherAromatics = cuisineData.recommendedAromatics.filter(a => a !== mealIdea.aromatics);
      if (otherAromatics.length > 0) {
        const suggestionList = otherAromatics.slice(0, 2).join(' or ');
        aromaticTips = `Amp up your aromatics with ${suggestionList}. `;
      }
    }
    
    // Get potential finisher swaps
    let finisherTips = '';
    if (cuisineData.recommendedFinishers && cuisineData.recommendedFinishers.length > 0) {
      // Filter out the current finisher
      const otherFinishers = cuisineData.recommendedFinishers.filter(f => f !== mealIdea.finishers);
      if (otherFinishers.length > 0) {
        const suggestionList = otherFinishers.slice(0, 2).join(' or ');
        finisherTips = `Add a finishing touch with ${suggestionList}. `;
      }
    }
    
    // Vessel suggestions with proper categorization
    let vesselTips = '';
    // Group vessels by appropriate preposition
    const vesselGroups = {
      in: ['lettuce cups', 'kale leaves', 'collard wraps', 'cabbage leaves', 'perilla leaves'],
      over: ['rice', 'noodles'],
      with: ['flatbread', 'torn bread', 'bare hands/fork']
    };
    
    // Determine current vessel's category
    let currentVesselPreposition = null;
    for (const [preposition, vessels] of Object.entries(vesselGroups)) {
      if (vessels.includes(mealIdea.vessel)) {
        currentVesselPreposition = preposition;
        break;
      }
    }
    
    // Build vessel suggestion
    const suggestedVessels = [];
    
    // Add one suggestion from a different preposition category if possible
    if (currentVesselPreposition) {
      // Find an alternative serving method from a different category
      const alternativePrepositions = Object.keys(vesselGroups).filter(p => p !== currentVesselPreposition);
      
      if (alternativePrepositions.length > 0) {
        // Pick a random alternative category
        const altPreposition = alternativePrepositions[Math.floor(Math.random() * alternativePrepositions.length)];
        const altVessels = vesselGroups[altPreposition];
        
        if (altVessels && altVessels.length > 0) {
          const randomAltVessel = altVessels[Math.floor(Math.random() * altVessels.length)];
          suggestedVessels.push(`${altPreposition} ${randomAltVessel}`);
        }
      }
    }
    
    // Add one more vessel from any category (that's not the current vessel)
    const allVessels = [].concat(...Object.values(vesselGroups));
    const availableVessels = allVessels.filter(v => v !== mealIdea.vessel);
    
    if (availableVessels.length > 0) {
      // Get a random vessel that's not already suggested
      const filteredVessels = availableVessels.filter(v => !suggestedVessels.some(s => s.includes(v)));
      
      if (filteredVessels.length > 0) {
        const randomVessel = filteredVessels[Math.floor(Math.random() * filteredVessels.length)];
        
        // Find appropriate preposition
        let preposition = 'with'; // default
        for (const [p, vessels] of Object.entries(vesselGroups)) {
          if (vessels.includes(randomVessel)) {
            preposition = p;
            break;
          }
        }
        
        // Make sure we're not duplicating a preposition + vessel combination
        if (!suggestedVessels.some(s => s === `${preposition} ${randomVessel}`)) {
          suggestedVessels.push(`${preposition} ${randomVessel}`);
        }
      }
    }
    
    // Create vessel tips if we have suggestions
    if (suggestedVessels.length > 0) {
      vesselTips = `Consider serving ${suggestedVessels.join(' or ')} for variation. `;
    }
    
    // Combine all tips
    tipHTML += aromaticTips + finisherTips + vesselTips;
    
    // Add cuisine-specific note
    if (cuisineData.description) {
      // Extract a keyword or concept from the description
      const keywords = ['spicy', 'herbal', 'aromatic', 'fresh', 'fermented', 'tangy', 'sweet-sour', 'rich', 'warming'];
      let foundKeyword = '';
      
      for (const keyword of keywords) {
        if (cuisineData.description.toLowerCase().includes(keyword)) {
          foundKeyword = keyword;
          break;
        }
      }
      
      if (foundKeyword) {
        tipHTML += `For an authentic ${cuisine} experience, emphasize ${foundKeyword} elements.`;
      }
    }
    
    return tipHTML;
  }
}

// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background-color: var(--secondary-color);
    color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .notification.error {
    background-color: #e63946;
  }
  
  .notification.fade-out {
    opacity: 0;
  }
  
  .saved-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  
  .saved-actions .secondary-btn {
    padding: 4px 8px;
    font-size: 0.9rem;
  }
`;
document.head.appendChild(style); 