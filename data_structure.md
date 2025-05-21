# Data Structure for Shui's Pounded Meal Generator

## Core Data Components (components.js)

```javascript
const mealComponents = {
  // Techniques to apply to ingredients
  techniques: [
    "pound", 
    "tear", 
    "smash", 
    "bruise",
    "crack",
    "shred",
    "mash",
    "crush",
    "rough chop"
  ],
  
  // Global cuisines/regional influences
  cuisines: [
    "Thai", 
    "Ethiopian", 
    "Georgian", 
    "Eritrean",
    "Lao",
    "Chinese (Sichuan)",
    "Persian", 
    "Japanese",
    "Mediterranean",
    "Vietnamese",
    "Indonesian",
    "Ghanaian",
    "Filipino",
    "Turkish",
    "Bengali",
    "Kenyan",
    "Greek",
    "Mexican"
  ],
  
  // Protein options
  proteins: [
    "chicken thigh",
    "ground chicken", 
    "ground pork",
    "tofu",
    "beef chunks",
    "sardines",
    "mackerel",
    "tempeh",
    "white beans",
    "lentils",
    "eggs",
    "ground beef",
    "chickpeas",
    "shredded rotisserie chicken"
  ],
  
  // Base vegetables
  vegetables: [
    "eggplant",
    "green beans",
    "cabbage",
    "bell peppers",
    "cauliflower",
    "potatoes",
    "tomatoes",
    "kale",
    "spinach", 
    "mushrooms",
    "zucchini",
    "carrots",
    "collard greens",
    "bitter melon",
    "cucumber"
  ],
  
  // Aromatics base
  aromatics: [
    "garlic",
    "ginger", 
    "onion",
    "shallot",
    "lemongrass",
    "chili",
    "green onion",
    "tomato paste",
    "cumin",
    "berbere spice",
    "paprika",
    "turmeric",
    "coriander"
  ],
  
  // Flavor profiles
  flavorProfiles: [
    "spicy",
    "tangy",
    "bright",
    "smoky",
    "umami-rich",
    "funky",
    "herbal",
    "bitter",
    "sweet-sour",
    "numbing", 
    "earthy"
  ],
  
  // Finishing herbs and toppings
  finishers: [
    "cilantro",
    "mint",
    "parsley",
    "yogurt",
    "lime juice",
    "fish sauce",
    "soy sauce",
    "peanuts",
    "sesame",
    "chili oil",
    "lemon zest",
    "vinegar",
    "olive oil"
  ],
  
  // Eating vessels
  vessels: [
    "lettuce cups",
    "kale leaves",
    "collard wraps", 
    "cabbage leaves",
    "flatbread",
    "rice",
    "noodles",
    "bare hands/fork",
    "torn bread"
  ]
};

// Workflow templates extracted from description patterns
const workflowTemplates = [
  "Pound [aromatics] into paste → Sear [protein] → Pound [protein] into chunks → Add pounded [vegetables] → Finish with [finishers], served in [vessels]",
  
  "Sear [protein] → While cooking, pound [aromatics] → Remove [protein] and pound into chunks → Add [aromatics] to pan → Return [protein] → Tear [vegetables] and pound until irregular → Add to pan → Serve in [vessels]",
  
  "Pound [aromatics] with [flavorProfiles] spices → Bloom in hot oil → Tear [vegetables] and pound until some bits are crushed and some intact → Add to pan → Add [protein] → Simmer until thickest bits are tender → Serve with [finishers] in [vessels]",
  
  "Tear [vegetables] and pound until bruised → Pound [aromatics] into paste → Heat oil, add paste and cook until fragrant → Add [protein] → Cook until done → Finish with [finishers] → Serve in [vessels]",
  
  "Pound [aromatics], chilies, and spices together → Bloom in hot oil → Add [protein] and cook until almost done → Pound [vegetables] until irregular texture → Toss in → Quick high-heat finish → Serve with [finishers] in [vessels]"
];

// Common combinations that work well together (optional - for improved coherence)
const compatibilitySuggestions = {
  cuisines: {
    "Thai": {
      recommendedAromatics: ["lemongrass", "galangal", "chili", "garlic"],
      recommendedFinishers: ["fish sauce", "lime juice", "cilantro"]
    },
    "Ethiopian": {
      recommendedAromatics: ["berbere spice", "garlic", "ginger"],
      recommendedFinishers: ["yogurt", "lemon"]
    }
    // More cuisine-specific recommendations
  }
};
```

## UI Text Templates (ui.js)

```javascript
const uiTemplates = {
  resultHeader: "Tonight's Meal Idea:",
  generatedTitle: "{cuisine} {technique} {protein}",
  instructions: [
    "Start by {technique}ing {aromatics} into a coarse paste.",
    "Heat oil in a pan and {cooking_method} your {protein}.",
    "Add your {technique}ed {vegetables} and cook until tender.",
    "Finish with {finishers} and serve in {vessels}."
  ],
  flavorNotes: "This dish has a {flavorProfile} profile with {cuisine} influences."
};
```

## Sample Output Format

```
Tonight's Meal Idea:
GEORGIAN POUNDED CHICKEN THIGH WITH EGGPLANT

1. Pound garlic, walnuts, and a splash of vinegar into a coarse paste.
2. Sear chicken thighs until browned on outside.
3. Remove chicken, pound into rustic chunks.
4. Tear eggplant into chunks, pound until they crack open.
5. Cook walnut paste in hot oil until fragrant.
6. Add eggplant and a bit of water. Let steam-sauté until soft.
7. Return chicken to pan and finish cooking.
8. Finish with fresh herbs and a dollop of yogurt.
9. Serve in lettuce cups or over rice.

Flavor profile: Tangy, nutty, herbaceous 