/**
 * Shui's Pounded Meal Generator
 * Data Components File
 * 
 * This file contains all the component data for the meal generator
 * extracted from Shui's cooking concepts.
 */

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
    "rough chop",
    "char",
    "blanch",
    "flash-sear"
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
    "Mexican",
    "Somali",
    "Korean",
    "Moroccan",
    "Israeli",
    "North African"
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
    "shredded rotisserie chicken",
    "shrimp",
    "squid",
    "paneer",
    "poached eggs",
    "canned fish"
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
    "cucumber",
    "celery",
    "beet greens",
    "chard",
    "bean sprouts",
    "perilla leaves",
    "red peppers",
    "green pepper",
    "onion"
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
    "coriander",
    "lime leaf",
    "green chili",
    "chili flakes",
    "walnuts",
    "sesame oil",
    "gochujang"
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
    "earthy",
    "nutty",
    "gritty",
    "silky",
    "pungent"
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
    "olive oil",
    "palm sugar",
    "dill",
    "lemon juice",
    "tomato paste",
    "sesame seeds",
    "scallions"
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
    "torn bread",
    "perilla leaves"
  ]
};

// Workflow templates extracted from the texts
const workflowTemplates = [
  {
    name: "Standard Shui",
    template: "Pound [aromatics] into paste → Sear [protein] → Pound [protein] into chunks → Add pounded [vegetables] → Finish with [finishers], served in [vessels]",
    steps: [
      "Pound {aromatics} into a coarse paste.",
      "Heat oil in a pan and sear your {protein} until browned on the outside.",
      "Remove {protein}, pound into rustic chunks.",
      "Tear {vegetables} into pieces and pound until they have irregular texture.",
      "Cook the aromatic paste in hot oil until fragrant.",
      "Add {vegetables} and a splash of liquid. Cook until tender but textured.",
      "Return {protein} to the pan to finish cooking.",
      "Finish with {finishers} for brightness.",
      "Serve in {vessels} or over {vessels}."
    ]
  },
  {
    name: "Reverse Sear Pound",
    template: "Sear [protein] → While cooking, pound [aromatics] → Remove [protein] and pound into chunks → Add [aromatics] to pan → Return [protein] → Tear [vegetables] and pound until irregular → Add to pan → Serve in [vessels]",
    steps: [
      "Start by searing your {protein} in hot oil.",
      "While it cooks, pound {aromatics} into a rough paste.",
      "Remove {protein} once browned, pound into rustic chunks.",
      "Add the {aromatics} paste to the hot pan and cook until fragrant.",
      "Return {protein} to the pan.",
      "Tear {vegetables} by hand and pound until they're irregularly textured.",
      "Add {vegetables} to the pan and cook until just tender.",
      "Finish with {finishers} and serve in {vessels}."
    ]
  },
  {
    name: "Aromatic-Forward",
    template: "Pound [aromatics] with [flavorProfiles] spices → Bloom in hot oil → Tear [vegetables] and pound until some bits are crushed and some intact → Add to pan → Add [protein] → Simmer until thickest bits are tender → Serve with [finishers] in [vessels]",
    steps: [
      "Pound {aromatics} together with spices for a {flavorProfiles} flavor profile.",
      "Heat oil in your pan and add the aromatic paste. Cook until fragrant and starting to caramelize.",
      "Tear {vegetables} by hand, then pound until some parts are crushed and others stay intact.",
      "Add {vegetables} to the pan and stir to coat with the fragrant oil.",
      "Add {protein} and a splash of liquid if needed.",
      "Simmer until the thickest bits of {vegetables} are tender.",
      "Finish with {finishers} and serve in/with {vessels}."
    ]
  },
  {
    name: "Veg-First Pound",
    template: "Tear [vegetables] and pound until bruised → Pound [aromatics] into paste → Heat oil, add paste and cook until fragrant → Add [protein] → Cook until done → Finish with [finishers] → Serve in [vessels]",
    steps: [
      "Tear {vegetables} into pieces and pound until bruised but not mushy.",
      "In the same molcajete, pound {aromatics} into a coarse paste.",
      "Heat oil in a pan, add the aromatic paste and cook until fragrant.",
      "Add {protein} and cook until almost done.",
      "Add the pounded {vegetables} and continue cooking until everything is tender but still has texture.",
      "Finish with {finishers} for brightness and depth.",
      "Serve in {vessels} for a complete meal."
    ]
  },
  {
    name: "Hot Stir-Pound",
    template: "Pound [aromatics], chilies, and spices together → Bloom in hot oil → Add [protein] and cook until almost done → Pound [vegetables] until irregular texture → Toss in → Quick high-heat finish → Serve with [finishers] in [vessels]",
    steps: [
      "Pound {aromatics} with chilies and spices into a fragrant paste.",
      "Heat oil in a pan or wok until very hot, then add the paste and cook until aromatic.",
      "Add {protein} and cook until almost done.",
      "While that cooks, pound {vegetables} until they have irregular texture.",
      "Toss the pounded {vegetables} into the hot pan.",
      "Stir-fry everything together over high heat for a quick finish.",
      "Add {finishers} right at the end.",
      "Serve immediately in {vessels}."
    ]
  },
  {
    name: "Thai Hot Salad",
    template: "Pound [aromatics] into chunky paste → Flash-sear [protein] until barely cooked → Remove [protein] → Cook pounded [vegetables] in leftover fat → Off heat, combine everything with [finishers] → Serve in [vessels]",
    steps: [
      "Pound {aromatics} into a chunky paste.",
      "Flash-sear {protein} with oil until barely cooked, remove from pan.",
      "Toss pounded {vegetables} into the pan to sizzle in the leftover fat.",
      "Off heat, stir everything together with {finishers}.",
      "Scatter with herbs and serve in {vessels}."
    ]
  },
  {
    name: "Char and Pound",
    template: "Char [vegetables] whole → Pound into a silky, smoky mixture → Saute [aromatics] in oil → Add pounded [vegetables] → Simmer until thick → Optional [protein] → Serve on [vessels]",
    steps: [
      "Char {vegetables} whole, then pound into a silky, smoky mixture.",
      "In a pan, sauté {aromatics} in oil until fragrant.",
      "Add the pounded {vegetables} and simmer until thick and saucy.",
      "Optional: add {protein} right before serving.",
      "Eat warm, room temp, or cold, spooned onto {vessels}."
    ]
  },
  {
    name: "Blanch and Pound",
    template: "Lightly blanch [vegetables] → Pound separately with [aromatics] to bruise and season → Sear [protein] → Combine for serving → Garnish with [finishers] → Serve with [vessels]",
    steps: [
      "Lightly blanch {vegetables}.",
      "Pound each vegetable separately with {aromatics} to bruise and season.",
      "In a pan, sear {protein}, then toss in the pounded vegetables just to warm.",
      "Serve as a textured plate, topped with {finishers}.",
      "Wrap bites in {vessels}."
    ]
  }
];

// Common combinations that work well together
const compatibilitySuggestions = {
  cuisines: {
    "Thai": {
      recommendedAromatics: ["lemongrass", "galangal", "chili", "garlic", "lime leaf"],
      recommendedFinishers: ["fish sauce", "lime juice", "cilantro", "palm sugar"],
      flavorProfile: "bright, spicy, funky",
      description: "Thai cuisine balances sweet, sour, salty, spicy, and bitter flavors. Aromatic herbs, coconut, lime, and fish sauce create vibrant dishes with contrasting textures."
    },
    "Ethiopian": {
      recommendedAromatics: ["berbere spice", "garlic", "ginger"],
      recommendedFinishers: ["yogurt", "lemon"],
      flavorProfile: "earthy, warming, complex",
      description: "Ethiopian cuisine centers around berbere spice blends and injera flatbread. Rich, slow-cooked stews (wats) combine meats and legumes with warm spices and clarified butter."
    },
    "Georgian": {
      recommendedAromatics: ["walnuts", "garlic", "coriander", "red peppers"],
      recommendedFinishers: ["vinegar", "parsley", "yogurt"],
      flavorProfile: "nutty, herbal, tangy",
      description: "Georgian cuisine (from the Caucasus) is known for walnut-thickened sauces, herb-forward dishes, and distinctive spice blends. Khachapuri (cheese bread) and kharcho (walnut-enriched stews) are emblematic."
    },
    "Chinese (Sichuan)": {
      recommendedAromatics: ["Sichuan peppercorns", "garlic", "ginger"],
      recommendedFinishers: ["chili oil", "soy sauce", "vinegar"],
      flavorProfile: "numbing, spicy, complex",
      description: "Sichuan cuisine from southwestern China is famous for its bold flavors, especially the numbing-spicy combination (málà) from Sichuan peppercorns. Dishes balance heat with sour, sweet, and savory elements."
    },
    "Vietnamese": {
      recommendedAromatics: ["lemongrass", "garlic", "chili"],
      recommendedFinishers: ["fish sauce", "lime juice", "herbs"],
      flavorProfile: "bright, fresh, balanced",
      description: "Vietnamese cuisine emphasizes fresh herbs, bright acids, and balanced flavors. Dishes often combine fresh and cooked elements, with fish sauce providing savory depth and numerous herbs adding complexity."
    },
    "Mediterranean": {
      recommendedAromatics: ["garlic", "oregano", "lemon zest"],
      recommendedFinishers: ["olive oil", "lemon juice", "parsley"],
      flavorProfile: "bright, herbal, olive-y",
      description: "Mediterranean cuisine spans several countries around the Mediterranean Sea, featuring olive oil, fresh vegetables, herbs, fish, and grains. Flavors tend to be fresh and vibrant rather than heavily spiced."
    },
    "Korean": {
      recommendedAromatics: ["garlic", "sesame oil", "gochujang"],
      recommendedFinishers: ["sesame seeds", "scallions", "soy sauce"],
      flavorProfile: "umami-rich, balanced, slightly spicy",
      description: "Korean cuisine is known for fermented foods (kimchi, gochujang), banchan (small side dishes), and the balance of spice, sweet, and umami. Sesame, garlic, and ginger form flavor foundations."
    },
    "Somali": {
      recommendedAromatics: ["garlic", "onion", "cumin", "green pepper"],
      recommendedFinishers: ["lemon juice", "tomato paste", "yogurt"],
      flavorProfile: "earthy, tangy, warming",
      description: "Somali cuisine reflects East African, Middle Eastern, and South Asian influences. Aromatic spices (cumin, cardamom, cloves) combine with meats, rice, and flatbreads. Xawaash spice blend adds distinctive flavor."
    },
    "Moroccan": {
      recommendedAromatics: ["garlic", "cumin", "paprika", "chili"],
      recommendedFinishers: ["olive oil", "lemon", "parsley"],
      flavorProfile: "smoky, earthy, slightly spicy",
      description: "Moroccan cuisine combines aromatic spices, preserved ingredients, and slow-cooking techniques. Tagines, couscous, and preserved lemons are staples. Ras el hanout spice blend adds complexity to many dishes."
    },
    "Persian": {
      recommendedAromatics: ["saffron", "dried lime", "cinnamon", "rose water"],
      recommendedFinishers: ["pomegranate molasses", "sumac", "fresh herbs"],
      flavorProfile: "fragrant, subtly sweet, tart",
      description: "Persian cuisine features delicate aromas, balanced sweet-sour flavors, and abundant fresh herbs. Rice dishes, slow-cooked stews (khoresh), and grilled meats showcase complex, refined flavors without overwhelming heat."
    },
    "Japanese": {
      recommendedAromatics: ["dashi", "miso", "sake", "mirin"],
      recommendedFinishers: ["green onion", "ginger", "shiso", "sesame"],
      flavorProfile: "umami-forward, clean, delicate",
      description: "Japanese cuisine emphasizes seasonal ingredients, umami flavors, and precise preparation techniques. Dashi broth, fermented ingredients, and minimalist seasonings enhance natural flavors rather than masking them."
    },
    "Indonesian": {
      recommendedAromatics: ["galangal", "lemongrass", "kaffir lime", "candlenuts"],
      recommendedFinishers: ["kecap manis", "sambal", "lime", "fried shallots"],
      flavorProfile: "aromatic, spicy, sweet-savory",
      description: "Indonesian cuisine varies across its many islands but generally features aromatic spice pastes, coconut, chilies, and sweet-savory balance. Sambal (chili paste) and kecap manis (sweet soy sauce) are signature condiments."
    },
    "Ghanaian": {
      recommendedAromatics: ["ginger", "garlic", "chili", "grains of paradise"],
      recommendedFinishers: ["peanuts", "tomato", "palm oil"],
      flavorProfile: "earthy, spicy, nutty",
      description: "Ghanaian cuisine features staple starches like fufu and kenkey served with hearty soups and stews. Groundnuts (peanuts), palm oil, and fermented corn meal create distinctive flavors and textures."
    },
    "Filipino": {
      recommendedAromatics: ["garlic", "bay leaf", "black pepper", "annatto"],
      recommendedFinishers: ["calamansi", "vinegar", "soy sauce"],
      flavorProfile: "sour, savory, slightly sweet",
      description: "Filipino cuisine balances sour, salty, and sweet flavors. Adobo (vinegar-soy braising), sinigang (sour soup), and pancit (noodles) showcase Spanish, indigenous, and Chinese influences."
    },
    "Turkish": {
      recommendedAromatics: ["sumac", "Aleppo pepper", "mint", "cumin"],
      recommendedFinishers: ["yogurt", "lemon", "olive oil", "fresh herbs"],
      flavorProfile: "bright, herbal, slightly smoky",
      description: "Turkish cuisine bridges Mediterranean and Middle Eastern traditions. Mezes (small plates), kebabs, and vegetable-forward dishes use abundant herbs, yogurt, olive oil, and subtle spicing."
    },
    "Bengali": {
      recommendedAromatics: ["mustard seeds", "nigella seeds", "green chilies", "turmeric"],
      recommendedFinishers: ["mustard oil", "panch phoron", "jaggery"],
      flavorProfile: "pungent, complex, bitter-sweet",
      description: "Bengali cuisine features five-spice blend (panch phoron), mustard, and distinctive bitter-sweet balance. Fish, rice, and vegetable dishes often start with aromatic spice tempering in oil or ghee."
    },
    "Kenyan": {
      recommendedAromatics: ["onion", "garlic", "curry powder", "coriander"],
      recommendedFinishers: ["lime", "cilantro", "chili"],
      flavorProfile: "earthy, comforting, aromatic",
      description: "Kenyan cuisine varies by region but centers around stews, grilled meats, and staples like ugali (corn porridge). Influences from Indian, Arabic, and European traditions blend with indigenous cooking methods."
    },
    "Greek": {
      recommendedAromatics: ["oregano", "garlic", "lemon", "cinnamon"],
      recommendedFinishers: ["feta", "olive oil", "yogurt", "honey"],
      flavorProfile: "bright, herbal, tangy",
      description: "Greek cuisine emphasizes olive oil, fresh vegetables, seafood, and herbs. Mezze (small plates), simple grilled meats, and seasonal vegetables showcase Mediterranean flavors and straightforward cooking techniques."
    },
    "Mexican": {
      recommendedAromatics: ["cumin", "oregano", "garlic", "dried chilies"],
      recommendedFinishers: ["lime", "cilantro", "crema", "cotija cheese"],
      flavorProfile: "earthy, spicy, bright",
      description: "Mexican cuisine varies regionally but features corn, chilies, beans, and complex sauces. Pre-Hispanic techniques like nixtamalization (corn treatment) combine with Spanish influences for distinctive flavors and textures."
    },
    "Eritrean": {
      recommendedAromatics: ["berbere", "garlic", "ginger", "fenugreek"],
      recommendedFinishers: ["yogurt", "lemon", "awaze"],
      flavorProfile: "warm, spicy, complex",
      description: "Eritrean cuisine shares similarities with Ethiopian food but has unique coastal influences. Injera (sourdough flatbread) serves as both staple and eating utensil, paired with spiced stews and legumes."
    },
    "Lao": {
      recommendedAromatics: ["lemongrass", "galangal", "kaffir lime", "padek"],
      recommendedFinishers: ["lime juice", "fish sauce", "fresh herbs"],
      flavorProfile: "bright, funky, herbal",
      description: "Lao cuisine emphasizes sticky rice, fresh herbs, and fermented flavors. Less sweet than Thai food, with more raw ingredients and bitter elements. Larb (meat salad) and tam mak hoong (papaya salad) are iconic dishes."
    },
    "Israeli": {
      recommendedAromatics: ["za'atar", "sumac", "garlic", "mint"],
      recommendedFinishers: ["tahini", "lemon", "olive oil", "yogurt"],
      flavorProfile: "herbal, nutty, bright",
      description: "Israeli cuisine blends Jewish traditions from around the world with Middle Eastern ingredients. Fresh vegetables, tahini, olive oil, and herbs feature prominently in this vibrant, fusion-oriented cooking style."
    },
    "North African": {
      recommendedAromatics: ["harissa", "preserved lemon", "cumin", "cinnamon"],
      recommendedFinishers: ["olive oil", "mint", "cilantro", "yogurt"],
      flavorProfile: "warm, spicy, tangy",
      description: "North African cuisines (Moroccan, Tunisian, Algerian) feature aromatic spice blends, preserved ingredients, and slow cooking. Tagines, couscous, and harissa chili paste create distinctive flavor profiles."
    }
  }
}; 