# Graphics Assignment

## Overview

This project is a graphical application that simulates a balloon being inflated and flying across the screen. The user can interact with the application by clicking on the blower to inflate the balloon and clicking on the balloon to pop it.

## Features

- **Balloon Inflation**: Click on the blower to inflate the balloon.
- **Balloon Flight**: Once inflated, the balloon flies across the screen, bouncing off the edges.
- **Balloon Popping**: Click on the balloon to pop it, displaying a "Pop!" message at the balloon's last position.

## Code Explanation

The application is built using React and Next.js. It utilizes state management to control the balloon's size, position, and state (idle, blowing, flying, done).

### Key Components

- **Blower**: Initiates the balloon inflation process.
- **Balloon**: Changes size and position based on user interaction and state changes.
- **Pop Message**: Displays when the balloon is popped.

### State Management

- `state`: Manages the current state of the balloon (idle, blowing, flying, done).
- `position`: Tracks the balloon's position on the screen.
- `isPopping`: Controls the visibility of the "Pop!" message.

## Visuals

### Images

![Blower and Balloon](/images/blower.png)

### Video

[![Watch the video](/images/blower.png)](/images/recording.mp4)

## Usage

1. Click on the blower to start inflating the balloon.
2. Once the balloon is inflated, it will start flying across the screen.
3. Click on the balloon to pop it and see the "Pop!" message.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/graphics-assignment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd /Users/parthpsg/Documents/Code/Web Development/Professional Projects/IDZ Digital
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Conclusion

This project demonstrates basic interactive graphics using React and Next.js. It provides a simple yet engaging user experience with visual feedback through animations and state changes.
