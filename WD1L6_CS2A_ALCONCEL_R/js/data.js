/* ==========================================================
   data.js - ALL editable content lives here.
   main.js reads these arrays and builds the page, so you
   never repeat HTML for each card. Add an item = add a card.
   ========================================================== */

// Rotating mottos shown in the hero section
const MOTTOS = [
  "Make it work, make it right, make it clear.",
  "Good design is as little design as possible.",
  "Code is read far more often than it is written."
];

// Design philosophy principles (icon = Bootstrap Icons class name)
const PRINCIPLES = [
  { icon: "bi-grid-3x3-gap", title: "Structure first",  text: "A clear grid and hierarchy come before any color or effect." },
  { icon: "bi-type",         title: "Type carries voice", text: "Typography is my main tool for personality and readability." },
  { icon: "bi-universal-access", title: "Accessible by default", text: "Contrast, focus states, and responsive layouts are part of the baseline." },
  { icon: "bi-scissors",     title: "Remove, then ship", text: "If an element does not help the visitor, it does not stay." }
];

// Projects from Midterms to Finals. term must be "Midterm" or "Finals".
const PROJECTS = [
  { term: "Midterm", title: "My Birth Calendar",
    tech: ["HTML5", , "CSS"], image: "images/midp1.png",
     },
  { term: "Midterm", title: "APA",
    tech: ["HTML5", "CSS"], image: "images/midp2.png",
    },
  { term: "Finals", title: "Grocery List",
    
    tech: ["JavaScript", "CSS", "HTNL5"], image: "images/finp1.png",
     },
  { term: "Finals", title: "Registration",
    
    tech: ["HTML5", "CSS", "JavaScript", ], image: "images/finp2.png",
    }
];

// Contact details
const CONTACTS = [
  { icon: "bi-envelope",  label: "alconcelap@gmail.com", href: "mailto:your.email@example.com" },
  { icon: "bi-github",    label: "github.com/alconcelaironpaul", href: "https://github.com/your-username" },
  { icon: "bi-geo-alt",   label: "Ilocos Sur, Philippines", href: "" }
];
