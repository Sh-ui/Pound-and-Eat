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

// Initialize recipe book when DOM is loaded
document.addEventListener('DOMContentLoaded', populateRecipeBook); 