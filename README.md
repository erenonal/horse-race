# Horse Racing Case

## Project Overview

This project is a horse racing simulation built with **Vue.js** and **Vuex**. It includes features such as generating horses, scheduling races, and displaying race results. The project uses **SCSS** for styling. I initially added test configurations but couldn't find the time to implement them fully.

---

## Prerequisites

- **Node.js**: Version 14.x or 16.x (recommended)
- **npm**: Version 6.x or 7.x (recommended)

---

## Project Setup

### Install Dependencies

```bash
npm install
```

### Compiles and Hot-Reloads for Development

```bash
npm run serve
```

### Compiles and Minifies for Production

```bash
npm run build
```

## Project Structure

```plaintext
/project-root
  /node_modules
  /public
    favicon.ico
    index.html
  /src
    /assets
      /img
        horse.png
      /styles
        main.scss
    /components
      HorseList.vue
      RaceControls.vue
      RaceResults.vue
      RaceTrack.vue
    /store
      index.js
    /utils
      utils.js
    App.vue
    main.js
  /tests
    /unit
      HorseList.spec.js
      store.spec.js
  babel.config.js
  jest.config.js
  package.json
  README.md
```

### Styling with SCSS

The project uses SCSS for styling. The main SCSS file is located at main.scss. You can import this file into your Vue components to use shared styles.

Example SCSS Import

```scss
@import '@/assets/styles/main.scss';
```

## Vuex Store

The Vuex store is configured in `index.js`. It manages the state for horses, race schedules, and race results.

### Actions

- `generateHorses`: Generates a list of horses.
- `generateSchedule`: Generates the race schedule.
- `startRace`: Starts the race simulation.
- `pauseRace`: Pauses the race simulation.
- `continueRace`: Continues the race simulation.

### Mutations

- **`SET_HORSES`**: Sets the list of horses.
- **`SET_SCHEDULE`**: Sets the race schedule.
- **`ADD_RESULT`**: Adds a race result.
- **`INCREMENT_ROUND`**: Increments the current round.
- **`SET_RACE_PROGRESS`**: Sets the race progress status.
- **`SET_RACE_PAUSED`**: Sets the race paused status.
- **`SET_ALL_RACES_FINISHED`**: Sets the all races finished status.
- **`SET_ROUND_IN_PROGRESS`**: Sets the round in progress status.
- **`UPDATE_HORSE_POSITION`**: Updates the position of a horse.
- **`RESET_HORSE_POSITIONS`**: Resets the positions of all horses in a round.
