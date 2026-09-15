timeElement.textContenttimeData.datecard.innerHTMLcard.classNameemptyState.style.displayclockGrid.innerHTML12timezone.nametimezone.zonedropdownMenu.style.displaysearchBox.valueitem.dataset.zoneitem.dataset.namedropdownMenu.innerHTMLtz.namelet selectedTimezones = [];
const clockGrid = document.getElementById('clockGrid');
const emptyState = document.getElementById('emptyState');
const searchBox = document.getElementById('searchBox');
const dropdownMenu = document.getElementById('dropdownMenu');
const addBtn = document.getElementById('addBtn');
const resetBtn = document.getElementById('resetBtn');

// Load saved timezones from localStorage
function loadSavedTimezones() {
    const saved = localStorage.getItem('selectedTimezones');
    if (saved) {
        selectedTimezones = JSON.parse(saved);
        renderClocks();
    } else {
        // Default timezones
        addTimezone({ name: 'New York', zone: 'America/New_York' });
        addTimezone({ name: 'London', zone: 'Europe/London' });
        addTimezone({ name: 'Tokyo', zone: 'Asia/Tokyo' });
    }
}

// Initialize dropdown with all timezones
function initializeDropdown() {
    const items = TIMEZONES.map(tz => `
        <div class="dropdown-item" data-zone="${tz.zone}" data-name="${tz.name}">
            <strong>${tz.name}</strong> <span style="color: #999; font-size: 0.9em;">${tz.zone}</span>
        </div>
    `).join('');
    dropdownMenu.innerHTML = items;
    
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const timezone = {
                name: item.dataset.name,
                zone: item.dataset.zone
            };
            addTimezone(timezone);
            searchBox.value = '';
            dropdownMenu.style.display = 'none';
        });
    });
}

// Search functionality
searchBox.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm) {
        const filtered = TIMEZONES.filter(tz => 
            tz.name.toLowerCase().includes(searchTerm) || 
            tz.zone.toLowerCase().includes(searchTerm)
        );
        
        const items = filtered.map(tz => `
            <div class="dropdown-item" data-zone="${tz.zone}" data-name="${tz.name}">
                <strong>${tz.name}</strong> <span style="color: #999; font-size: 0.9em;">${tz.zone}</span>
            </div>
        `).join('');
        
        dropdownMenu.innerHTML = items;
        dropdownMenu.style.display = 'block';
        
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                const timezone = {
                    name: item.dataset.name,
                    zone: item.dataset.zone
                };
                addTimezone(timezone);
                searchBox.value = '';
                dropdownMenu.style.display = 'none';
            });
        });
    } else {
        initializeDropdown();
        dropdownMenu.style.display = 'block';
    }
});

// Show dropdown on focus
searchBox.addEventListener('focus', () => {
    dropdownMenu.style.display = 'block';
});

// Hide dropdown on blur
document.addEventListener('click', (e) => {
    if (!e.target.closest('.timezone-selector')) {
        dropdownMenu.style.display = 'none';
    }
});

// Add timezone
function addTimezone(timezone) {
    // Check if already added
    if (selectedTimezones.some(tz => tz.zone === timezone.zone)) {
        alert(`${timezone.name} is already added!`);
        return;
    }
    
    selectedTimezones.push(timezone);
    saveTimezones();
    renderClocks();
}

// Remove timezone
function removeTimezone(zone) {
    selectedTimezones = selectedTimezones.filter(tz => tz.zone !== zone);
    saveTimezones();
    renderClocks();
}

// Save to localStorage
function saveTimezones() {
    localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
}

// Format time for a timezone
function getTimeInTimezone(zone) {
    const date = new Date();
    const utcTime = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzTime = new Date(date.toLocaleString('en-US', { timeZone: zone }));
    
    return {
        time: tzTime,
        formatted: tzTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }),
        period: tzTime.getHours() >= 12 ? 'PM' : 'AM',
        date: tzTime.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }),
        hour12: tzTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })
    };
}

// Render clock cards
function renderClocks() {
    clockGrid.innerHTML = '';
    
    if (selectedTimezones.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    selectedTimezones.forEach(tz => {
        const timeData = getTimeInTimezone(tz.zone);
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.innerHTML = `
            <div class="timezone-header">
                <div>
                    <div class="timezone-name">${tz.name}</div>
                    <div class="timezone-code">${tz.zone}</div>
                </div>
                <button class="remove-btn" onclick="removeTimezone('${tz.zone}')" title="Remove">✕</button>
            </div>
            <div class="digital-time" id="time-${tz.zone}">${timeData.hour12}</div>
            <div class="time-period">${timeData.period}</div>
            <div class="time-info">
                <div class="info-item">
                    <div class="info-label">Date</div>
                    <div class="info-value">${timeData.date}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">24-Hour</div>
                    <div class="info-value">${timeData.formatted}</div>
                </div>
            </div>
        `;
        clockGrid.appendChild(card);
    });
}

// Update all clocks
function updateAllClocks() {
    selectedTimezones.forEach(tz => {
        const timeData = getTimeInTimezone(tz.zone);
        const timeElement = document.getElementById(`time-${tz.zone}`);
        if (timeElement) {
            timeElement.textContent = timeData.hour12;
        }
    });
}

// Add timezone button click
addBtn.addEventListener('click', () => {
    searchBox.focus();
    dropdownMenu.style.display = 'block';
});

// Reset button click
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset to default timezones?')) {
        selectedTimezones = [
            { name: 'New York', zone: 'America/New_York' },
            { name: 'London', zone: 'Europe/London' },
            { name: 'Tokyo', zone: 'Asia/Tokyo' }
        ];
        saveTimezones();
        renderClocks();
    }
});

// Initialize
loadSavedTimezones();
initializeDropdown();

// Update clocks every second
setInterval(updateAllClocks, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        dropdownMenu.style.display = 'none';
    }
});tz.zone12:0010:00b.name06:0005:0009:0000:0004:0005:3007:0008:0001:0003:00// Comprehensive list of world timezones
const TIMEZONES = [
    // Africa
    { name: 'Cairo', zone: 'Africa/Cairo', offset: '+02:00' },
    { name: 'Johannesburg', zone: 'Africa/Johannesburg', offset: '+02:00' },
    { name: 'Lagos', zone: 'Africa/Lagos', offset: '+01:00' },
    { name: 'Nairobi', zone: 'Africa/Nairobi', offset: '+03:00' },
    
    // Asia
    { name: 'Bangkok', zone: 'Asia/Bangkok', offset: '+07:00' },
    { name: 'Beijing', zone: 'Asia/Shanghai', offset: '+08:00' },
    { name: 'Dubai', zone: 'Asia/Dubai', offset: '+04:00' },
    { name: 'Hong Kong', zone: 'Asia/Hong_Kong', offset: '+08:00' },
    { name: 'India Standard', zone: 'Asia/Kolkata', offset: '+05:30' },
    { name: 'Istanbul', zone: 'Europe/Istanbul', offset: '+03:00' },
    { name: 'Jakarta', zone: 'Asia/Jakarta', offset: '+07:00' },
    { name: 'Jerusalem', zone: 'Asia/Jerusalem', offset: '+02:00' },
    { name: 'Kuala Lumpur', zone: 'Asia/Kuala_Lumpur', offset: '+08:00' },
    { name: 'Manila', zone: 'Asia/Manila', offset: '+08:00' },
    { name: 'Moscow', zone: 'Europe/Moscow', offset: '+03:00' },
    { name: 'Seoul', zone: 'Asia/Seoul', offset: '+09:00' },
    { name: 'Singapore', zone: 'Asia/Singapore', offset: '+08:00' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', offset: '+09:00' },
    
    // Europe
    { name: 'Amsterdam', zone: 'Europe/Amsterdam', offset: '+01:00' },
    { name: 'Berlin', zone: 'Europe/Berlin', offset: '+01:00' },
    { name: 'Brussels', zone: 'Europe/Brussels', offset: '+01:00' },
    { name: 'Budapest', zone: 'Europe/Budapest', offset: '+01:00' },
    { name: 'Dublin', zone: 'Europe/Dublin', offset: '+00:00' },
    { name: 'London', zone: 'Europe/London', offset: '+00:00' },
    { name: 'Madrid', zone: 'Europe/Madrid', offset: '+01:00' },
    { name: 'Paris', zone: 'Europe/Paris', offset: '+01:00' },
    { name: 'Rome', zone: 'Europe/Rome', offset: '+01:00' },
    { name: 'Stockholm', zone: 'Europe/Stockholm', offset: '+01:00' },
    { name: 'Zurich', zone: 'Europe/Zurich', offset: '+01:00' },
    
    // North America
    { name: 'Chicago', zone: 'America/Chicago', offset: '-06:00' },
    { name: 'Denver', zone: 'America/Denver', offset: '-07:00' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles', offset: '-08:00' },
    { name: 'Mexico City', zone: 'America/Mexico_City', offset: '-06:00' },
    { name: 'New York', zone: 'America/New_York', offset: '-05:00' },
    { name: 'Toronto', zone: 'America/Toronto', offset: '-05:00' },
    { name: 'Vancouver', zone: 'America/Vancouver', offset: '-08:00' },
    
    // South America
    { name: 'Buenos Aires', zone: 'America/Argentina/Buenos_Aires', offset: '-03:00' },
    { name: 'São Paulo', zone: 'America/Sao_Paulo', offset: '-03:00' },
    { name: 'Lima', zone: 'America/Lima', offset: '-05:00' },
    
    // Australia/Pacific
    { name: 'Auckland', zone: 'Pacific/Auckland', offset: '+12:00' },
    { name: 'Sydney', zone: 'Australia/Sydney', offset: '+10:00' },
    { name: 'Melbourne', zone: 'Australia/Melbourne', offset: '+10:00' },
    { name: 'Fiji', zone: 'Pacific/Fiji', offset: '+12:00' },
    { name: 'Honolulu', zone: 'Pacific/Honolulu', offset: '-10:00' },
];

// Sort alphabetically
TIMEZONES.sort((a, b) => a.name.localeCompare(b.name));02:000* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    text-align: center;
    color: white;
    margin-bottom: 40px;
    padding: 20px 0;
}

.header h1 {
    font-size: 3em;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
    font-size: 1.2em;
    opacity: 0.9;
    font-weight: 300;
}

.controls {
    display: flex;
    gap: 15px;
    margin-bottom: 40px;
    flex-wrap: wrap;
    align-items: center;
}

.timezone-selector {
    position: relative;
    flex: 1;
    min-width: 250px;
}

.search-box {
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    font-size: 1em;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.search-box:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    margin-top: 5px;
}

.dropdown-item {
    padding: 12px 16px;
    cursor: pointer;
    transition: background 0.2s ease;
    border-bottom: 1px solid #f0f0f0;
}

.dropdown-item:hover {
    background: #f5f5f5;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.add-btn,
.reset-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-btn {
    background: white;
    color: #667eea;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.reset-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid white;
}

.reset-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.clock-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.clock-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.clock-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.clock-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
}

.timezone-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.timezone-name {
    font-size: 1.3em;
    font-weight: 700;
    color: #333;
}

.timezone-code {
    font-size: 0.85em;
    color: #999;
    font-weight: 500;
}

.remove-btn {
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #e74c3c;
    transition: all 0.2s ease;
    padding: 5px 10px;
}

.remove-btn:hover {
    transform: scale(1.2);
}

.digital-time {
    font-size: 2.8em;
    font-weight: 700;
    color: #667eea;
    font-family: 'Courier New', monospace;
    margin-bottom: 15px;
    letter-spacing: 2px;
    text-align: center;
}

.time-period {
    text-align: center;
    font-size: 1em;
    color: #764ba2;
    font-weight: 600;
    margin-bottom: 15px;
}

.time-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    font-size: 0.9em;
    color: #666;
}

.info-item {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
}

.info-label {
    font-size: 0.75em;
    color: #999;
    margin-bottom: 3px;
}

.info-value {
    font-weight: 600;
    color: #333;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: white;
    font-size: 1.5em;
}

/* Scrollbar styling */
.dropdown-menu::-webkit-scrollbar {
    width: 8px;
}

.dropdown-menu::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: #764ba2;
}

/* Responsive design */
@media (max-width: 768px) {
    .header h1 {
        font-size: 2em;
    }

    .controls {
        flex-direction: column;
    }

    .timezone-selector {
        min-width: 100%;
    }

    .add-btn,
    .reset-btn {
        width: 100%;
    }

    .clock-grid {
        grid-template-columns: 1fr;
    }

    .digital-time {
        font-size: 2em;
    }
}

@media (max-width: 480px) {
    .header h1 {
        font-size: 1.5em;
    }

    .clock-card {
        padding: 15px;
    }

    .digital-time {
        font-size: 1.8em;
    }
}<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Timezone Clock</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌍 Global Time</h1>
            <p class="subtitle">Track time across multiple time zones</p>
        </div>

        <div class="controls">
            <div class="timezone-selector">
                <input type="text" id="searchBox" class="search-box" placeholder="Search timezone...">
                <div class="dropdown-menu" id="dropdownMenu" style="display: none;">
                    <!-- Timezones will be populated here -->
                </div>
            </div>
            <button id="addBtn" class="add-btn">+ Add Timezone</button>
            <button id="resetBtn" class="reset-btn">Reset</button>
        </div>

        <div class="clock-grid" id="clockGrid">
            <!-- Clock cards will be added here dynamically -->
        </div>

        <div class="empty-state" id="emptyState" style="display: none;">
            <p>📍 No timezones selected. Add one to get started!</p>
        </div>
    </div>

    <script src="timezones.js"></script>
    <script src="script.js"></script>
</body>
</html>---
id: the-basics
title: The Basics
sidebar_label: The Basics
slug: /
---

## Put a locally running HTTP, HTTPS or TLS app on the internet

localhost.run is a client-less tool to instantly make a locally running application available on an internet accessible URL.

All major operating systems already have SSH installed, and localhost.run uses SSH as a client, so no download is necessary to use the service and no account setup is needed for free domains.

To connect an internet domain to an application running locally on port 8080 open a command terminal and run:

```bash
ssh -R 80:localhost:8080 localhost.run
```

import { useState } from 'react'

export const PortChooser = () => {
  const [port, setPort] = useState(3000);
  return (
    <>
      running on&nbsp;
      <label for="port">local port</label>
      &nbsp;
      <input style={{width: "5em"}} type="number" id="port" name="port" min="1" max="65535" value={port} onChange={(event) => setPort(event.target.value)} />
      ?
      use this command:
      <pre><code parentName="pre" {...{
              "className": "bash"
            }}>{`ssh -R 80:localhost:${port} localhost.run
`}</code></pre>
    </>
  )
};

<PortChooser />
