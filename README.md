# Horse Racing App

This project is a horse racing simulation app built with Vue.js. The application allows you to create, start races. Each race features horses moving at different speeds, with the first one to cross the finish line being the winner.

## Features

- Generate race program
- Start races
- Random colors and speeds for each horse
- Finish line crossing animation

## Requirements

- Node.js (v14 or above)
- Vue.js (v3)
- Vite (development server and build tool)

## Installation

Follow these steps to run the project:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/furkanurhan/horse-racing-game.git
    cd horse-racing-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Open your browser and view the app:**

    ```plaintext
    http://localhost:5173
    ```

## Usage

- **Generate Race Program:**

    Click the `GENERATE PROGRAM` button to create a new race program.

- **Start Races:**

    Click the `START` button to start the race.

- **Horse Movement:**

    Each horse moves towards the finish line at different speeds. The first horse to reach the finish line wins the race.

## Project Structure

- **src/components:** Contains Vue components of the application.
- **src/views:** Contains main and other views of the application.
- **src/assets:** Contains static files and styles.
- **src/App.vue:** The main component of the application.
- **src/main.js:** The entry point of the application.

## Contributing

1. Fork the project
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
