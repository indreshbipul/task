
🚀 Architecture & State Management
Routing Strategy
The application utilizes a custom routing wrapper to enforce authentication boundaries:

ProtectedRoutes.tsx: Wraps internal pages (/list, /details/:id, /analytics). If a user attempts to access these without a valid session, they are intercepted and redirected to the login screen.

PublicOnlyRoutes.tsx: Wraps the / (Login) route. If an already-authenticated user tries to visit the login page, they are smoothly redirected to their dashboard.

Authentication & Persistence
Auth state is managed globally via the Context API (userContext.tsx & useUserContext.tsx).

Upon successful login, the application saves the username and password separately into localStorage. (Note: While storing raw credentials in localStorage is not standard production practice, it is implemented here to strictly adhere to the assignment's state-persistence and API replay constraints).

Session Hydration: On a hard page refresh, the app intercepts the initial render, reads the credentials from localStorage, and automatically calls ApiServices.login() to re-fetch the necessary data, pushing it back into the Context without requiring the user to log in again.

🛠 Features & Technical Implementation
1. The High-Performance Grid (List.tsx & ListCard.tsx)
Once authenticated, the Context data is mapped to ListCard components in a tabular view. Clicking on any employee row triggers a dynamic route push to /details/:userid.

Custom Virtualization Math (No External Libraries):
To handle large datasets efficiently, the DOM only renders the rows currently visible in the user's viewport, plus a small buffer.

Total Height: Calculated by multiplying the total number of items by a fixed rowHeight (e.g., totalItems * 50px). This creates a dummy scroll container.

Absolute Positioning: Each rendered ListCard is positioned absolutely at index * rowHeight from the top of the container, creating the illusion of a massive scrolling list while only keeping ~15-20 DOM nodes active.

2. Identity Verification (Details.tsx)
Native Camera API: Uses navigator.mediaDevices.getUserMedia to access the device's camera stream directly within a <video> element.

Canvas Signature: An HTML5 <canvas> overlays the UI, tracking mouse/touch coordinates to draw a signature path.

Image Merging Logic: When "Capture" is pressed, the current video frame is drawn onto a hidden canvas using context.drawImage(). The signature vector coordinates are then drawn directly onto that exact same canvas context. Finally, canvas.toDataURL('image/png') is called to merge both layers into a single, flattened Base64 string for storage and display.

3. Data Visualization (Analytics.tsx & MapView.tsx)
Custom SVG Chart: Salary distribution is mapped mathematically using raw <svg>, <rect>, and <text> elements. Heights are calculated using a ratio: (salary / maxSalary) * maxSvgHeight to ensure the chart scales dynamically without libraries like Chart.js.

Geospatial Mapping: Utilizes react-leaflet. Mapping Handling: City names from the API are mapped to specific geographic coordinates (Latitude/Longitude arrays) prior to rendering the <Marker> components onto the tile layer.

⚠️ Intentional Vulnerability Document
As per the assignment requirements, this application contains exactly one intentional bug.

Vulnerability Type: Routing Logic Flaw / Unhandled Fallback (Blank Screen of Death)

Location: Router.tsx (Route Configuration)

Description: The application's routing architecture lacks a catch-all wildcard route (e.g., <Route path="*" element={<NotFound />} />) and strict index handling for the root (/) path under certain auth states. If a user manually types in an undefined URL, or hits the root URL without hitting a strict redirect condition, React Router fails to match any component. This results in the app rendering a completely blank, empty DOM without throwing a visible error or providing a 404 UI.

Why I chose it: I chose this to demonstrate the importance of exhaustive route handling and fallback UI in client-side routing. In traditional multi-page applications, the server automatically handles bad URLs by returning a standard 404 page. In a React SPA, unhandled routes fail silently in the DOM. This creates a "soft lock" where the user is trapped on a white screen with no navigation layout to escape, forcing them to manually alter the URL or use browser controls. It highlights that routing security isn't just about protecting private routes, but also about gracefully handling invalid user inputs.

💻 Local Setup
Clone the repository.

Run npm install to install dependencies (React, Leaflet, Tailwind).

Run npm run dev to start the Vite server.

Login using testuser / Test123.