# NAVIX Campus Navigator 🏫🧭

> **Find your way around campus, effortlessly.**  
> A modern, responsive web application designed for freshers, juniors, and visitors at **Sreenidhi Institute of Science and Technology (SNIST)** to easily find classrooms, labs, canteens, and sports facilities across the 33-acre campus without feeling hesitant or having to ask seniors.

---

## 🌟 Key Features

1. **Clean & Modern Landing Page:**
   - Academic blue/navy college aesthetic with high contrast and responsive design.
   - Welcoming banner for first-year engineering students.

2. **Smart Campus Search Bar:**
   - Prominent *"Where do you want to go?"* search bar.
   - Real-time autocomplete suggestions matching building names, departments, and tags.
   - Quick-access search chips for top destinations (Titanic Block, Central Library, Main Canteen, 1st Year Block, Sports Complex, Bus Bay).

3. **8 Quick Category Cards:**
   - **Academic Blocks** (Titanic Block, Visvesvaraya, Ramanujan, etc.)
   - **Labs** (Advanced AI & Robotics Hub, Mech Workshop, Physics & Chemistry Labs)
   - **Classrooms** (Saraswathi 1st Year Block, Aryabhata Smart Classrooms)
   - **Library** (Central Library & Digital Knowledge Hub)
   - **Canteens** (Main Canteen & Student Food Court, Maggi Point Kiosk)
   - **Hostels** (Boys & Girls Residencies)
   - **Sports** (Indoor Stadium, Badminton, Cricket/Football Ground, Basketball)
   - **Other Facilities** (Admin Block, Health Center / Dispensary, Bus Bay, Xerox)
   - *Clicking any card dynamically filters the map markers and destination lists!*

4. **Interactive 2D Schematic Campus Map:**
   - Custom SVG map featuring key SNIST architectural landmarks (including the famous ship-shaped **Titanic Block**).
   - Interactive building pins that pulse, hover tooltips, and click-to-view modal.
   - Zoom In, Zoom Out, and Viewport Reset controls.
   - Dynamic animated walking route polyline that highlights the shortest route on the map between selected points.
   - Map legend.

5. **Turn-by-Turn Route Navigation:**
   - Select Starting Point & Destination from categorized dropdowns.
   - Reverse route button (Swap start & destination).
   - "Get Directions" calculation with:
     - Estimated walking time (in minutes).
     - Distance in meters.
     - Step-by-step navigation instructions with milestones.
     - **Senior's Pro-Tip for Juniors** (e.g., elevator access, lab dress code, token queues).
     - Wheelchair / ramp accessibility indicator.
     - Share route & Focus on Map buttons.

6. **Popular Destinations Section:**
   - Showcase cards with ratings, floor counts, operating hours, and tags.
   - Direct "Navigate Here" and "View Details" actions.

7. **Building Details Modal:**
   - In-depth building overview, departments housed, floor breakdown, and timings.

8. **Junior Guide, FAQs & Emergency Directory:**
   - Essential survival advice for 1st-year students.
   - Frequently asked questions accordion.
   - Emergency contact numbers (Dispensary, Security Gate, Anti-Ragging Cell).

9. **Fully Mobile Responsive:**
   - Optimized for smartphone viewports (375px - 430px) as juniors will primarily use phones on campus.
   - Touch-friendly tap targets and mobile navigation drawer.

---

## 📁 File Structure

```
hackathon/
├── index.html                  # Main web entry point (Tailwind CSS, fonts, React root)
├── start.sh                    # 1-click startup script (starts local server & opens browser)
├── server.py                   # Lightweight Python dev server with correct MIME types
├── package.json                # Standard React package manifest (Vite ready)
├── README.md                   # Project documentation
└── src/
    ├── app-browser.js          # Browser-ready React 18 application bundle
    ├── App.jsx                 # Main React application component
    ├── main.jsx                # React root mount entry point
    ├── styles.css              # Custom animations, SVG dash, and neat scrollbars
    ├── data/
    │   └── campusData.js       # SNIST campus locations, coordinates & routing logic
    └── components/
        ├── Icons.jsx           # SVG icon component library (100% offline available)
        ├── Navbar.jsx          # Top navigation bar with mobile drawer
        ├── HeroSearch.jsx      # Hero banner, search bar & autocomplete
        ├── CategoryCards.jsx   # 8 category filter cards
        ├── CampusMap.jsx       # Interactive SVG campus blueprint map
        ├── NavigationSection.jsx # Start & destination dropdowns with swap button
        ├── DirectionsCard.jsx  # Turn-by-turn route guidance & metrics
        ├── PopularDestinations.jsx # Top campus hotspots grid
        ├── LocationModal.jsx   # Full building overview popup
        ├── AboutSection.jsx    # Junior advice, FAQs & emergency helplines
        └── Footer.jsx          # College address, links & credits
```

---

## 🚀 How to Run the Website Locally

You can run the application locally on macOS, Linux, or Windows with zero dependencies or package installations.

### Option 1: Using the 1-Click Launch Script (Recommended)

Open your terminal in this folder and run:

```bash
./start.sh
```

This will automatically start the local server and open `http://localhost:5173` in your default browser.

---

### Option 2: Using Python Directly

If you prefer to start the server manually:

```bash
python3 server.py
```

Or using standard Python HTTP module:

```bash
python3 -m http.server 5173
```

Then open your browser and navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

### Option 3: Double-Click `index.html`

You can also simply double-click `index.html` or open it with Google Chrome or Safari.

---

## 🛠️ How to Customize Campus Locations

All campus locations, coordinates, departments, and fresher tips are centralized in:
`src/data/campusData.js`

To add a new building or update an existing one:
```javascript
{
  id: 'new-building-id',
  name: 'New Building Name',
  shortName: 'Display Name',
  category: 'academic', // academic | labs | classrooms | library | canteens | hostels | sports | facilities
  floors: '4 Floors',
  departments: ['Department 1', 'Department 2'],
  openHours: '8:30 AM - 5:30 PM',
  popular: true,
  rating: 4.8,
  mapCoords: { x: 500, y: 500 }, // SVG coordinate on the 1000x950 map
  desc: 'Description of the building...',
  juniorTip: 'Senior tip for first year students...',
  tags: ['keyword1', 'keyword2']
}
```
