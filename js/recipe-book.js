// Recipe book data structure
const recipeBook = {
    stews: [
        {
            title: "Shui's Molcajete Tortilla Stew",
            description: "A fusion of tortilla soup and curry, built through a pounding assembly line.",
            workflow: [
                "Heat Dutch oven with oil",
                "First pound: garlic, onion, tomato, chili → rustic paste → sizzle in oil",
                "Second pound: seared chicken thighs → rustic chunks → return to pot",
                "Third pound: greens, zucchini/pepper, hominy/beans, corn tortillas → dump in pot",
                "Add stock, tomato, lime → simmer 15-20 min",
                "Finish with cilantro, optional toppings"
            ]
        },
        {
            title: "Primal Beef (Pounded Weeknight Stew)",
            description: "A shortcut to deep beef stew flavors without hours of braising.",
            workflow: [
                "Sear beef chunks in hot pot",
                "Pound base: garlic, onion, peppercorns, herbs → coarse paste",
                "Deglaze with wine, bloom paste",
                "Pound veggies: carrots, potatoes, celery/mushrooms → irregular chunks",
                "Simmer until largest potato piece is tender",
                "Finish with pounded parsley, garlic, lemon zest"
            ]
        },
        {
            title: "Shui-Style Zigni Wraps",
            description: "Eritrean-inspired stew with a Shui twist.",
            workflow: [
                "Heat oil with fenugreek/cumin/paprika",
                "Pound base: garlic, onion, ginger, tomato, chili",
                "Pound protein: seared beef/tofu → shred-chunks",
                "Pound veg: carrots, mushrooms, cabbage/cauliflower",
                "Add berbere spice, salt, water, tomato",
                "Simmer until thick",
                "Serve in kale/collard leaves"
            ]
        }
    ],
    stirfries: [
        {
            title: "Shui-Style Sambal Sauté",
            description: "Indonesian-inspired stir-fry with pounded textures.",
            workflow: [
                "Pound sambal base: garlic, shallots, chilies, tomato",
                "Fry until sticky",
                "Add pounded long beans/cabbage/eggplant",
                "Optional: crumbled tempeh or smashed eggs",
                "Finish with lime, kecap manis, peanuts",
                "Serve in greens or over rice"
            ]
        },
        {
            title: "Larb Goes Molcajete",
            description: "Lao-style meat salad with Shui's pounding technique.",
            workflow: [
                "Sear ground meat in wide pan",
                "Pound: lemongrass, shallots, chili, lime zest",
                "Add to hot meat, sizzle",
                "Toss in herbs, fish sauce, lime juice",
                "Optional: pounded cucumber/green beans",
                "Serve in lettuce or with sticky rice"
            ]
        },
        {
            title: "Berbere Veggie Hash",
            description: "Ethiopian-spiced skillet dish.",
            workflow: [
                "Pound: onion, garlic, ginger, berbere spice",
                "Sauté in butter/oil",
                "Add torn collards, pounded carrots, smashed potatoes",
                "Cook hot and fast for char",
                "Finish with vinegar and yogurt",
                "Serve in flatbread or kale leaves"
            ]
        }
    ],
    wraps: [
        {
            title: "Shui-Style Badrijani Bowl",
            description: "Georgian-inspired eggplant-walnut wraps.",
            workflow: [
                "Pound: garlic, onion, walnuts, vinegar, coriander, herbs",
                "Tear and pound eggplant → salt briefly",
                "Fry walnut paste until toasty",
                "Add eggplant, splash of water → steam-sauté",
                "Finish with herbs, optional yogurt/pomegranate",
                "Serve in lettuce/radicchio leaves"
            ]
        },
        {
            title: "Shui-Style Sabzi Polo Wraps",
            description: "Persian herb rice made rustic and leafy.",
            workflow: [
                "Pound: green onion, parsley, dill, mint, garlic",
                "Pound canned/pre-cooked fish into flakes",
                "Crisp herb paste in oil",
                "Add rice, fish, lemon juice, salt",
                "Optional: pounded baby greens",
                "Serve in chard with yogurt"
            ]
        },
        {
            title: "Yam Talay-ish Hot Salad",
            description: "Thai seafood salad reimagined.",
            workflow: [
                "Pound: garlic, chili, lime leaf",
                "Flash-sear seafood, remove",
                "Sizzle pounded celery, tomato, onion",
                "Combine with lime, fish sauce, palm sugar",
                "Add herbs",
                "Serve warm in lettuce/cabbage leaves"
            ]
        }
    ]
};

// Function to create recipe cards
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    const title = document.createElement('h4');
    title.textContent = recipe.title;
    
    const description = document.createElement('p');
    description.textContent = recipe.description;
    
    const workflow = document.createElement('ol');
    recipe.workflow.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        workflow.appendChild(li);
    });
    
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(workflow);
    
    // Add FABs
    card.appendChild(createRecipeFABs(recipe));
    
    return card;
}

// Function to populate recipe sections
function populateRecipeBook() {
    // Populate stews
    const stewContainer = document.getElementById('stew-recipes');
    recipeBook.stews.forEach(recipe => {
        stewContainer.appendChild(createRecipeCard(recipe));
    });
    
    // Populate stir-fries
    const stirfryContainer = document.getElementById('stirfry-recipes');
    recipeBook.stirfries.forEach(recipe => {
        stirfryContainer.appendChild(createRecipeCard(recipe));
    });
    
    // Populate wraps
    const wrapContainer = document.getElementById('wrap-recipes');
    recipeBook.wraps.forEach(recipe => {
        wrapContainer.appendChild(createRecipeCard(recipe));
    });
}

// Helper: Flatten all recipes into a single array with category
function getAllRecipesWithCategory() {
    const all = [];
    Object.entries(recipeBook).forEach(([category, recipes]) => {
        recipes.forEach(recipe => {
            all.push({ ...recipe, category });
        });
    });
    return all;
}

// Helper: Pick a random recipe
function getRandomRecipe() {
    const all = getAllRecipesWithCategory();
    return all[Math.floor(Math.random() * all.length)];
}

// Create FAB buttons for recipe cards
function createRecipeFABs(recipe) {
    const fabContainer = document.createElement('div');
    fabContainer.className = 'recipe-actions-fab';
    
    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'fab-btn';
    saveBtn.title = 'Save Recipe';
    saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
        </svg>
    `;
    saveBtn.addEventListener('click', () => saveRecipe(recipe));
    
    // Reroll button (only for recipe of the day)
    if (recipe === currentRecipeOfTheDay) {
        const rerollBtn = document.createElement('button');
        rerollBtn.className = 'fab-btn';
        rerollBtn.title = 'New Recipe';
        rerollBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
            </svg>
        `;
        rerollBtn.addEventListener('click', rerollRecipeOfTheDay);
        fabContainer.appendChild(rerollBtn);
    }
    
    fabContainer.appendChild(saveBtn);
    return fabContainer;
}

// Save recipe to saved ideas
function saveRecipe(recipe) {
    const savedList = document.getElementById('saved-list');
    const emptyState = savedList.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const savedItem = document.createElement('div');
    savedItem.className = 'saved-item';
    savedItem.appendChild(renderRecipeOfTheDayCard(recipe));
    
    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'fab-btn';
    removeBtn.style.position = 'absolute';
    removeBtn.style.top = '0.5rem';
    removeBtn.style.right = '0.5rem';
    removeBtn.title = 'Remove Recipe';
    removeBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    `;
    removeBtn.addEventListener('click', () => savedItem.remove());
    savedItem.appendChild(removeBtn);
    
    savedList.appendChild(savedItem);
}

// Render a single recipe card (with category)
function renderRecipeOfTheDayCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    const title = document.createElement('h4');
    title.textContent = recipe.title;
    
    const category = document.createElement('div');
    category.className = 'recipe-category-label';
    category.textContent =
        recipe.category === 'stews' ? 'Stews & Hearty Dishes' :
        recipe.category === 'stirfries' ? 'Stir-Fries & Sautéed Dishes' :
        recipe.category === 'wraps' ? 'Leaf-Wrapped & Hand-Eaten Dishes' :
        '';
    category.style.fontWeight = 'bold';
    category.style.color = '#e76f51';
    category.style.marginBottom = '0.5rem';
    
    const description = document.createElement('p');
    description.textContent = recipe.description;
    
    const workflow = document.createElement('ol');
    recipe.workflow.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        workflow.appendChild(li);
    });
    
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(description);
    card.appendChild(workflow);
    
    // Add FABs
    card.appendChild(createRecipeFABs(recipe));
    
    return card;
}

// Show Recipe of the Day
function showRecipeOfTheDay(recipe) {
    const container = document.getElementById('recipe-of-the-day-card');
    container.innerHTML = '';
    container.appendChild(renderRecipeOfTheDayCard(recipe));
}

// State
let currentRecipeOfTheDay = null;
let recipeBookVisible = false;

// Reroll handler
function rerollRecipeOfTheDay() {
    let newRecipe;
    do {
        newRecipe = getRandomRecipe();
    } while (currentRecipeOfTheDay && newRecipe.title === currentRecipeOfTheDay.title);
    currentRecipeOfTheDay = newRecipe;
    showRecipeOfTheDay(currentRecipeOfTheDay);
}

// Toggle full recipe book
function toggleRecipeBook() {
    recipeBookVisible = !recipeBookVisible;
    const section = document.getElementById('recipe-book-section');
    const btn = document.getElementById('toggle-recipe-book-btn');
    if (recipeBookVisible) {
        section.style.display = '';
        btn.textContent = 'Hide Recipe Book';
    } else {
        section.style.display = 'none';
        btn.textContent = 'Show Full Recipe Book';
    }
}

// On DOMContentLoaded, show recipe of the day and set up buttons
function initializeRecipeOfTheDay() {
    rerollRecipeOfTheDay();
    document.getElementById('reroll-recipe-btn').addEventListener('click', rerollRecipeOfTheDay);
    document.getElementById('toggle-recipe-book-btn').addEventListener('click', toggleRecipeBook);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeRecipeOfTheDay();
    if (recipeBookVisible) populateRecipeBook(); // Only populate if visible
});

// Populate full book if/when shown
const observer = new MutationObserver(() => {
    if (recipeBookVisible && document.getElementById('stew-recipes').children.length === 0) {
        populateRecipeBook();
    }
});
observer.observe(document.getElementById('recipe-book-section'), { attributes: true, attributeFilter: ['style'] }); 