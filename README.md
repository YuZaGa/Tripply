

---

# AI Trip Planner

![AI Trip Planner](https://github.com/YuZaGa/Tripply/blob/master/public/landing.png)

## Overview

**AI Trip Planner** is a web-based application designed to simplify travel planning by leveraging AI to suggest travel destinations, provide relevant details, and assist users in organizing their trips. This project integrates  with Google's  GEMINI with Place API to fetch details about various locations, ensuring users have up-to-date information about their chosen destinations. The app allows users to view images, select destinations, plan trips, and share their itinerary with others via a sharable link.

## Features

### 1. **Destination Search**
   - Users can search for a destination, and the AI suggests options based on their preferences such as number of days, budget, and the number of travelers.

### 2. **Photo Integration**
   - Displays a high-quality image of the selected destination using the Google Places API.
   - The image is dynamically fetched based on the location.

### 3. **Trip Summary**
   - Provides a summary of the trip, including:
     - **Destination Name**
     - **Duration (Days)**: Displays the number of days planned.
     - **Budget**: Shows the estimated budget for the trip.
     - **Travelers**: Shows the number of travelers.

### 4. **Shareable Link**
   - Users can generate a shareable link for their trip.
   - Includes functionality to copy the link to the clipboard, making it easy to share the itinerary with others.

### 5. **Dialog Interface**
   - The app uses a dialog box to display the shareable link with options to copy and close.
   - The dialog includes a visually appealing and user-friendly interface, making it easy to share trip details.

### 6. **Responsive Design**
   - The application is designed to be fully responsive, providing a seamless experience across various devices, including mobile, tablet, and desktop.

### 7. **Icons & UI Elements**
   - Integrates icons like **send** (IoIosSend) and **copy** (FaRegCopy) to enhance user interactions.
   - The app uses modern UI components for buttons, inputs, and dialogs to provide an intuitive user experience.

## Tech Stack

- **React.js**: Frontend framework for building the user interface.
- **Shadcn**: Frontend components for building the user interface.
- **Gemini**: Google's very own LLM
- **Tailwind CSS**: For styling the application with a utility-first CSS framework.
- **Google Places API**: To fetch location details and images.
- **React Icons**: For adding icons to the UI.
- **Custom UI Components**: Includes reusable components like buttons, dialogs, and inputs for consistent design and functionality.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-trip-planner.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ai-trip-planner
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory with your Google Places API key:
   ```env
   VITE_GOOGLE_PLACE_API_KEY=your-google-places-api-key
   ```

5. Run the application:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Enter your preferred destination and trip details.
2. View relevant information about the destination, including images.
3. Share your trip via a generated link that can be copied to the clipboard.

## Future Enhancements

- **AI-Powered Recommendations**: Provide automated destination suggestions based on user preferences.
- **Itinerary Builder**: Allow users to customize their trip plans by adding activities and locations.
- **Multi-Trip Comparison**: Enable users to compare multiple destinations and itineraries side-by-side.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

This README provides an overview of the project, the features, and instructions on how to set it up and run. You can customize the content to better fit your needs or add more details specific to your project!
