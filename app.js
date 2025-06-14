// Application data
const weatherData = {
  currentWeather: {
    location: "Rajarhat, WB",
    date: "Saturday, June 14, 2025 • 5:21 AM",
    temperature: 29,
    condition: "Haze",
    feelsLike: 32
  },
  hourlyForecast: [
    {"time": "6 AM", "temp": 27, "condition": "partly-cloudy"},
    {"time": "7 AM", "temp": 28, "condition": "sunny"},
    {"time": "8 AM", "temp": 30, "condition": "sunny"},
    {"time": "9 AM", "temp": 32, "condition": "sunny"},
    {"time": "10 AM", "temp": 34, "condition": "sunny"},
    {"time": "11 AM", "temp": 36, "condition": "hot"},
    {"time": "12 PM", "temp": 38, "condition": "hot"},
    {"time": "1 PM", "temp": 39, "condition": "hot"},
    {"time": "2 PM", "temp": 38, "condition": "hot"}
  ],
  suggestions: [
    {
      title: "Stay Hydrated",
      description: "High temperatures expected. Keep water bottles handy.",
      icon: "💧"
    },
    {
      title: "Air Conditioning", 
      description: "Beat the heat with cooling solutions for your home.",
      icon: "❄️"
    },
    {
      title: "Umbrella Essentials",
      description: "Rain expected later. Don't forget your umbrella.",
      icon: "☂️"
    },
    {
      title: "Sun Protection",
      description: "UV index is high. Use sunscreen and wear protective clothing.",
      icon: "☀️"
    },
    {
      title: "Indoor Activities",
      description: "Perfect weather for shopping or visiting indoor attractions.",
      icon: "🏠"
    },
    {
      title: "Light Clothing",
      description: "Comfortable breathable fabrics recommended for hot weather.",
      icon: "👕"
    }
  ]
};

// Weather condition icons mapping
const conditionIcons = {
  'partly-cloudy': '⛅',
  'sunny': '☀️',
  'hot': '🌡️',
  'cloudy': '☁️',
  'rainy': '🌧️'
};

// DOM elements
let tabButtons, tabPanels, hourlyTimeline, suggestionsList;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  setupTabSwitching();
  populateHourlyForecast();
  populateSuggestions();
  setupMapControls();
  setupSearchFunctionality();
  
  // API integration placeholders
  setupAPIIntegration();
});

// Initialize DOM elements
function initializeElements() {
  tabButtons = document.querySelectorAll('.tab-btn');
  tabPanels = document.querySelectorAll('.tab-panel');
  hourlyTimeline = document.getElementById('hourly-timeline');
  suggestionsList = document.getElementById('suggestions-list');
}

// Setup tab switching functionality - Critical: All tabs must remain visible
function setupTabSwitching() {
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = button.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

// Switch tabs - ensures all tabs remain visible and suggestions panel stays
function switchTab(targetTab) {
  // Remove active class from all tab buttons
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  // Remove active class from all tab panels
  tabPanels.forEach(panel => panel.classList.remove('active'));
  
  // Add active class to clicked tab button
  const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  // Show corresponding tab panel
  const activePanel = document.getElementById(`${targetTab}-panel`);
  if (activePanel) {
    activePanel.classList.add('active');
  }
  
  // Log tab switch for debugging
  console.log(`Switched to ${targetTab} tab`);
  
  // Ensure suggestions panel remains visible (critical requirement)
  const suggestionsPanel = document.querySelector('.suggestions-panel');
  if (suggestionsPanel) {
    suggestionsPanel.style.display = 'block';
  }
  
  // Update URL without page reload
  history.pushState({tab: targetTab}, '', `#${targetTab}`);
}

// Populate hourly forecast timeline
function populateHourlyForecast() {
  if (!hourlyTimeline) return;
  
  hourlyTimeline.innerHTML = '';
  
  weatherData.hourlyForecast.forEach(hour => {
    const hourlyItem = document.createElement('div');
    hourlyItem.className = 'hourly-item';
    
    const icon = conditionIcons[hour.condition] || '☀️';
    
    hourlyItem.innerHTML = `
      <div class="hourly-time">${hour.time}</div>
      <div class="hourly-icon">${icon}</div>
      <div class="hourly-temp">${hour.temp}°</div>
    `;
    
    hourlyTimeline.appendChild(hourlyItem);
  });
  
  console.log('Hourly forecast populated');
}

// Populate weather-based suggestions - Critical: Must remain visible
function populateSuggestions() {
  if (!suggestionsList) return;
  
  suggestionsList.innerHTML = '';
  
  weatherData.suggestions.forEach(suggestion => {
    const suggestionCard = document.createElement('div');
    suggestionCard.className = 'suggestion-card';
    
    suggestionCard.innerHTML = `
      <div class="suggestion-icon">${suggestion.icon}</div>
      <div class="suggestion-content">
        <div class="suggestion-title">${suggestion.title}</div>
        <div class="suggestion-desc">${suggestion.description}</div>
      </div>
    `;
    
    // Add click handler for suggestions
    suggestionCard.addEventListener('click', () => {
      console.log(`Clicked suggestion: ${suggestion.title}`);
      // In a real app, this would trigger relevant actions
    });
    
    suggestionsList.appendChild(suggestionCard);
  });
  
  console.log('Weather suggestions populated');
}

// Setup map controls functionality
function setupMapControls() {
  const mapControlButtons = document.querySelectorAll('.map-control-btn');
  
  mapControlButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all map control buttons
      mapControlButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      console.log(`Map layer changed to: ${button.textContent}`);
      // In a real app, this would change the map overlay
    });
  });
}

// Setup search functionality
function setupSearchFunctionality() {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-btn');
  
  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      handleSearch();
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    });
  }
}

// Handle search functionality
function handleSearch() {
  const searchInput = document.querySelector('.search-input');
  const query = searchInput.value.trim();
  
  if (query) {
    console.log(`Searching for location: ${query}`);
    // In a real app, this would trigger location search API
    alert(`Search functionality would look up weather for: ${query}`);
  }
}

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.tab) {
    switchTab(event.state.tab);
  }
});

// Handle initial URL hash
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash && ['hourly', 'overview', 'maps'].includes(hash)) {
    switchTab(hash);
  }
});

// Refresh current weather data
function refreshWeatherData() {
  console.log('Refreshing weather data...');
  // In a real app, this would call the weather API
  
  // Simulate API call with setTimeout
  setTimeout(() => {
    console.log('Weather data refreshed');
    // Update UI with new data
  }, 1000);
}

// Setup API integration placeholders
function setupAPIIntegration() {
  // 1. Current weather API integration placeholder
  console.log('API Integration Point 1: Current Weather API');
  // Example: fetchCurrentWeather(latitude, longitude)
  
  // 2. Hourly forecast API integration placeholder
  console.log('API Integration Point 2: Hourly Forecast API');
  // Example: fetchHourlyForecast(latitude, longitude)
  
  // 3. Weather-based suggestions API integration placeholder
  console.log('API Integration Point 3: Weather Suggestions API');
  // Example: fetchWeatherSuggestions(currentConditions, temperature)
}

// Utility function to ensure suggestions panel visibility
function ensureSuggestionsVisible() {
  const suggestionsPanel = document.querySelector('.suggestions-panel');
  if (suggestionsPanel && suggestionsPanel.style.display === 'none') {
    suggestionsPanel.style.display = 'block';
    console.log('Suggestions panel visibility restored');
  }
}

// Monitor for layout changes and ensure critical elements remain visible
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      ensureSuggestionsVisible();
    }
  });
});

// Start observing the suggestions panel for style changes
document.addEventListener('DOMContentLoaded', () => {
  const suggestionsPanel = document.querySelector('.suggestions-panel');
  if (suggestionsPanel) {
    observer.observe(suggestionsPanel, { 
      attributes: true, 
      attributeFilter: ['style'] 
    });
  }
});

// Auto-refresh weather data every 5 minutes
setInterval(refreshWeatherData, 5 * 60 * 1000);

// Export for potential external use
window.WeatherApp = {
  switchTab,
  refreshWeatherData,
  weatherData
};