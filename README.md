# Maps App

**Maps App** is an application that enables users to view and manage an interactive map using the Mapbox API. It includes real-time marker features that can be moved on the map, along with a socket system to synchronize marker locations across different user sessions.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Main Components](#main-components)
- [CSS Styles](#css-styles)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/maps-app.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd maps-app
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up environment variables:**  
   Create a `.env` file in the project root and define the following variables:
    ```plaintext
    VITE_MAP_API_KEY=<your-mapbox-api-key>
    VITE_SERVER_PATH=<socket-server-url>
    ```
5. **Start the development server:**
    ```bash
    npm run dev
    ```

## Usage

The application allows users to view a map with markers that can be added by clicking on the map. These markers can be dragged to adjust their location. Thanks to the socket implementation, marker positions synchronize in real-time across connected users, enabling interactive collaboration.

To start the application, run the development server and open the URL in your browser. Users can view marker locations and movements in real-time.

## Project Structure

The project structure is as follows:

```plaintext
project-root
│
├── components
│   ├── MapsApp.jsx          # Main application component
│   ├── MapPage.jsx          # Page containing the map and its event management
│   ├── SocketContext.jsx    # Socket context for real-time connection
│
├── hooks
│   ├── useMapbox.js         # Custom hook for managing the map and markers
│   ├── useSocket.js         # Custom hook for connecting to the socket server
│
├── styles
│   ├── index.css            # Global styles for the application
│
├── main.jsx                 # Application entry point
└── README.md                # Project documentation
```

## Environment Variables
The application requires the following environment variables:

- VITE_MAP_API_KEY: Mapbox API key for map visualization.
- VITE_SERVER_PATH: Socket server URL for real-time marker synchronization.

## Main components

### useMapbox

The useMapbox hook manages operations related to the map and markers. Its functionalities include:

- addMarker: Adds a new marker at the clicked position on the map.
- updatePosition: Updates the position of an existing marker.
- movementMarker$ and newMarker$: Observables for synchronizing movements and new markers with other users in real-time.
- setRef: Assigns the map container to the hook to render the Mapbox map.
### useSocket

The useSocket hook establishes and manages the WebSocket server connection, facilitating real-time communication. It provides:

- socket: The socket connection instance.
- online: Connection status, indicating whether the client is connected or not.

## CSS Styles
The application uses a minimalist, responsive design defined in index.css:

- Typography and color scheme: The application features a modern font and a dark color scheme, with alternatives for light themes on compatible systems.
- Map and marker container: The map container takes up the full screen, and the markers are styled to be customizable.
- Info Panel: A fixed information panel displays important data, with a semi-transparent background and rounded border for readability.

## License
This project is licensed under the MIT License.