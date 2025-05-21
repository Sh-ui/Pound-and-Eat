/**
 * Shui's Pounded Meal Generator
 * Core Generator Logic
 */

class MealGenerator {
  constructor() {
    this.components = mealComponents;
    this.templates = workflowTemplates;
    this.compatibility = compatibilitySuggestions;
    this.currentIdea = null;
  }

  /**
   * Generate a random meal idea
   * @param {Object} filters - Optional filters for components
   * @param {Object} preservedComponents - Components to preserve from previous generation
   * @returns {Object} Complete meal idea object
   */
  generateMeal(filters = {}, preservedComponents = {}) {
    // Select a random template or use preserved one
    const template = preservedComponents.template ? 
      this.templates.find(t => t.name === preservedComponents.template) : 
      this.getRandomItem(this.templates);
    
    // Get cuisine first (it influences other selections)
    const cuisine = preservedComponents.cuisine || 
                    filters.cuisine || 
                    this.getRandomItem(this.components.cuisines);
    
    // Get other components with compatibility in mind
    const technique = preservedComponents.technique || 
                      this.getRandomItem(this.components.techniques);
    
    const protein = preservedComponents.protein || 
                    filters.protein || 
                    this.getRandomItem(this.components.proteins);
    
    const vegetable = preservedComponents.vegetable || 
                      filters.vegetable || 
                      this.getRandomItem(this.components.vegetables);
    
    // Use cuisine compatibility if available
    let aromatics, finishers, flavorProfile;
    
    if (this.compatibility.cuisines[cuisine]) {
      const compatData = this.compatibility.cuisines[cuisine];
      
      // Get recommended aromatics or fallback to random or preserved
      if (preservedComponents.aromatics) {
        aromatics = preservedComponents.aromatics;
      } else if (compatData.recommendedAromatics && compatData.recommendedAromatics.length > 0) {
        aromatics = this.getRandomItem(compatData.recommendedAromatics);
      } else {
        aromatics = this.getRandomItem(this.components.aromatics);
      }
      
      // Get recommended finishers or fallback to random or preserved
      if (preservedComponents.finishers) {
        finishers = preservedComponents.finishers;
      } else if (compatData.recommendedFinishers && compatData.recommendedFinishers.length > 0) {
        finishers = this.getRandomItem(compatData.recommendedFinishers);
      } else {
        finishers = this.getRandomItem(this.components.finishers);
      }
      
      // Use cuisine's flavor profile or preserved one
      flavorProfile = preservedComponents.flavorProfile || 
                      compatData.flavorProfile || 
                      filters.flavorProfile || 
                      this.getRandomItem(this.components.flavorProfiles);
    } else {
      // Fallback to random selections or preserved values
      aromatics = preservedComponents.aromatics || 
                  this.getRandomItem(this.components.aromatics);
      
      finishers = preservedComponents.finishers || 
                  this.getRandomItem(this.components.finishers);
      
      flavorProfile = preservedComponents.flavorProfile || 
                      filters.flavorProfile || 
                      this.getRandomItem(this.components.flavorProfiles);
    }
    
    // Get random vessel or use preserved one
    const vessel = preservedComponents.vessel || 
                   this.getRandomItem(this.components.vessels);
    
    // Generate instruction steps
    const steps = this.generateInstructions(template, {
      cuisine,
      technique,
      protein,
      vegetables: vegetable,
      aromatics,
      finishers,
      flavorProfiles: flavorProfile,
      vessels: vessel
    });
    
    // Assemble complete meal idea
    this.currentIdea = {
      title: `${cuisine} ${technique.toUpperCase()}ED ${protein.toUpperCase()} WITH ${vegetable.toUpperCase()}`,
      cuisine,
      technique,
      protein,
      vegetable,
      aromatics,
      finishers,
      vessel,
      flavorProfile,
      steps,
      template: template.name
    };
    
    return this.currentIdea;
  }
  
  /**
   * Generate instruction steps for a meal
   * @param {Object} template - Workflow template
   * @param {Object} components - Selected components
   * @returns {Array} Array of instruction steps
   */
  generateInstructions(template, components) {
    const steps = [...template.steps];
    
    // Replace placeholders with actual components
    return steps.map(step => {
      let processedStep = step;
      
      // Process each component type
      for (const [key, value] of Object.entries(components)) {
        const placeholder = new RegExp(`{${key}}`, 'g');
        processedStep = processedStep.replace(placeholder, value);
      }
      
      return processedStep;
    });
  }
  
  /**
   * Get a random item from an array
   * @param {Array} array - Array to select from
   * @returns {*} Random item from array
   */
  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  /**
   * Save current meal idea to localStorage
   * @returns {boolean} Success status
   */
  saveCurrentIdea() {
    if (!this.currentIdea) return false;
    
    try {
      // Get existing saved ideas
      const savedIdeas = this.getSavedIdeas();
      
      // Add timestamp and ID to current idea
      const ideaToSave = {
        ...this.currentIdea,
        id: Date.now(),
        savedAt: new Date().toISOString()
      };
      
      // Add to saved ideas
      savedIdeas.push(ideaToSave);
      
      // Save back to localStorage
      localStorage.setItem('shuiMealIdeas', JSON.stringify(savedIdeas));
      
      return true;
    } catch (error) {
      console.error('Failed to save meal idea:', error);
      return false;
    }
  }
  
  /**
   * Get all saved meal ideas from localStorage
   * @returns {Array} Array of saved meal ideas
   */
  getSavedIdeas() {
    try {
      const savedIdeasJson = localStorage.getItem('shuiMealIdeas');
      return savedIdeasJson ? JSON.parse(savedIdeasJson) : [];
    } catch (error) {
      console.error('Failed to get saved meal ideas:', error);
      return [];
    }
  }
  
  /**
   * Delete a saved meal idea
   * @param {number} id - ID of meal idea to delete
   * @returns {boolean} Success status
   */
  deleteSavedIdea(id) {
    try {
      const savedIdeas = this.getSavedIdeas();
      const updatedIdeas = savedIdeas.filter(idea => idea.id !== id);
      
      localStorage.setItem('shuiMealIdeas', JSON.stringify(updatedIdeas));
      
      return true;
    } catch (error) {
      console.error('Failed to delete meal idea:', error);
      return false;
    }
  }
  
  /**
   * Get all available filters for UI
   * @returns {Object} Object with all filter options
   */
  getFilterOptions() {
    return {
      cuisines: this.components.cuisines,
      proteins: this.components.proteins,
      vegetables: this.components.vegetables,
      flavorProfiles: this.components.flavorProfiles
    };
  }
} 