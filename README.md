# Remote Tech Job Board

Hey there! Welcome to the **Remote Tech Job Board**, I built to make hunting for remote tech jobs actually enjoyable instead of searching heree there

It pulls live job postings from the [Remotive API](https://remotive.com/api/remote-jobs),it is a publix api, i wrapped them in ui, and it gives you real tools to search in on what you actually want, i implemented , filter, sort, favorite, and scroll through job posting.

---

## What It Does

### Live Search 
i also implenented **DEBOUNCING** so just
type a role or company name and the results updates dhynamically. and this is the important part — it doesnt reloac on **every single keystroke**. i used a **debounce function**  in search handler with a300ms delay, so it waits until you stop typing before searching to enhance experience

### Category Filtering
Use the dropdown to narrow results by category like Software Development, desgin , marketing and all. i just used `.filter()` for this one.

### Date Sorting
Toggle between newest first and oldest first. the `.sort()` method compares publication dates , and the list re renders instantly.

### Favorites section
hit the heart. it will turn red, and that job gets saved to your browsers `localStorage`.come back later, next week , whenever your favorites are still there. There's a dedicated **"Favorites" toggle** in the header to view only your saved jobs.

### Dark Mode (Persisted)
One click switches to dark mode. Your preference is saved in `localStorage` too, for a better user experience just used add remove class from classname for the css to apply on whether dark or light

### Loading Indicators
While the API is doing its thing you will see a nice animated spinner with "Fetching the latest remote jobs…" message. when loading more jobs or when opeing page

### Progressive Web App (PWA)
This thing is installable! There's a `manifest.json` and a service worker (`sw.js`) that caches static assets and API responses. If you lose internet, the last-fetched jobs are still there. You can even add it to your phone's home screen and it'll open like a native app. i used help of ai for this 

###  Back to Top
Scroll down a bit and a floating button appears in the corner click it smooth-scroll back up simple

## How It's Built

| File | What It Does |
|------|-------------|
| `index.html` | The structure HTML skeleton with tags, PWA links, and a clean layout |
| `style.css` | All the styling font,header, gradient accents used (https://cssgradient.io) for colors,animations, full dark mode, responsive breakpoints |
| `script.js` | The main logic of fetching,filtering, sorting, debouncing, throttling,favorites, theme |
| `manifest.json` | PWA metadata app name,theme color |
| `sw.js` | Service worker cache-first for static files, network first for API data |

### JavaScript Concepts Used

- **`async/await`** for clean, readable API calls
- **`fetch()`** to grab job data from Remotive
- **`.filter()`** for search and category filtering (Higher-Order Function)
- **`.sort()`** for date ordering (Higher-Order Function)
- **`.forEach()`** and **`.map()`** for rendering job cards (Higher-Order Function)
- **`.includes()`** for substring matching in search
- **`debounce()`** — custom HOF that delays execution until input settles
- **`throttle()`** — custom HOF that limits how often a function can run
- **`localStorage`** for persisting favorites and theme across sessions
- **DOM manipulation** — all elements created with `document.createElement()`, no innerHTML for job cards
- **Service Worker API** for offline caching and PWA functionality

---

## Getting Started

```bash
git clone https://github.com/AYUSH-KAVYA/Remote-Tech-Job-Board.git
cd Remote-Tech-Job-Board
```

## Key Features Added 

| Feature | Implementation |
|---------|---------------|
| Debouncing | `debounce()` HOF on search input (300ms) |
| Throttling | `throttle()` HOF on scroll events (200ms) |
| Infinite Scroll | Loads 20 jobs per batch as you scroll |
| Loading Indicators | Spinner + dot-pulse animation during fetches |
| Local Storage | Favorites + dark mode preference saved to browser |
| Pagination | Handled seamlessly via infinite scroll + Load More |
| PWA | Service worker + manifest for offline support & installability |

---
