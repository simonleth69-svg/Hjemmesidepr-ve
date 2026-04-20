const monthlyWalksData = [
    {
        id: 1,
        title: 'Brabrand Sø Vandrings Tur',
        date: 'April 18, 2026',
        time: '08:00',
        location: 'Brabrand Sø',
        distance: '7.2 km',
        difficulty: 'Let'
    },
    {
        id: 2,
        title: 'Skov og Sø Rundtur',
        date: 'April 22, 2026',
        time: '10:00',
        location: 'Skovvej',
        distance: '5.5 km',
        difficulty: 'Let'
    },
    {
        id: 3,
        title: 'Aften tur ved søen',
        date: 'April 25, 2026',
        time: '18:30',
        location: 'City Park',
        distance: '3.8 km',
        difficulty: 'Let'
    },
    {
        id: 4,
        title: 'Natur og Kultur Vandrings Tur',
        date: 'April 28, 2026',
        time: '09:00',
        location: 'Natur og Kultur',
        distance: '9.1 km',
        difficulty: 'Moderat'
    }
];

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    loadSavedRoutes();
    displayWalks();
    setupMobileMenu();
    setupNavigation();
});

// Load routes saved by user
function loadSavedRoutes() {
    const saved = localStorage.getItem('brabrandWalks_userRoutes');
    if (saved) {
        try {
            const userRoutes = JSON.parse(saved);
            monthlyWalksData.push(...userRoutes);
        } catch (error) {
            console.error('Error loading routes:', error);
        }
    }
}

// Save a new route
function saveRouteToLocalStorage(routeData) {
    let userRoutes = [];
    const saved = localStorage.getItem('brabrandWalks_userRoutes');
    
    if (saved) {
        try {
            userRoutes = JSON.parse(saved);
        } catch (error) {
            console.error('Error parsing saved routes:', error);
            userRoutes = [];
        }
    }
    
    const newRoute = {
        id: Date.now(),
        ...routeData
    };
    
    userRoutes.push(newRoute);
    localStorage.setItem('brabrandWalks_userRoutes', JSON.stringify(userRoutes));
    monthlyWalksData.push(newRoute);
}

// Convert difficulty level to Danish and get CSS class
function getDifficultyInfo(difficulty) {
    const difficultyMap = {
        'Let': { danish: 'Let', cssClass: 'easy' },
        'Moderat': { danish: 'Moderat', cssClass: 'moderate' },
        'Udfordrende': { danish: 'Udfordrende', cssClass: 'challenging' },
        'Easy': { danish: 'Let', cssClass: 'easy' },
        'Moderate': { danish: 'Moderat', cssClass: 'moderate' },
        'Challenging': { danish: 'Udfordrende', cssClass: 'challenging' }
    };
    return difficultyMap[difficulty] || { danish: difficulty, cssClass: 'easy' };
}

// Display all walks on home page
function displayWalks() {
    const walksList = document.getElementById('walksList');
    if (!walksList) return;
    
    walksList.innerHTML = monthlyWalksData.map(walk => {
        const diffInfo = getDifficultyInfo(walk.difficulty);
        return `
        <div class="walk-card">
            <div class="walk-card-header">
                <h3 class="walk-card-title">${walk.title}</h3>
                <span class="difficulty-badge difficulty-${diffInfo.cssClass}">
                    ${diffInfo.danish}
                </span>
            </div>
            <div class="walk-card-details">
                <div class="walk-detail">
                    <span class="walk-detail-icon"></span>
                    <div class="walk-detail-text">
                        <span class="walk-detail-label">Dato</span>
                        <span class="walk-detail-value">${walk.date}</span>
                    </div>
                </div>
                <div class="walk-detail">
                    <span class="walk-detail-icon"></span>
                    <div class="walk-detail-text">
                        <span class="walk-detail-label">Tid</span>
                        <span class="walk-detail-value">${walk.time}</span>
                    </div>
                </div>
                <div class="walk-detail">
                    <span class="walk-detail-icon"></span>
                    <div class="walk-detail-text">
                        <span class="walk-detail-label">Lokation</span>
                        <span class="walk-detail-value">${walk.location}</span>
                    </div>
                </div>
                <div class="walk-detail">
                    <span class="walk-detail-icon"></span>
                    <div class="walk-detail-text">
                        <span class="walk-detail-label">Distance</span>
                        <span class="walk-detail-value">${walk.distance}</span>
                    </div>
                </div>
            </div>
            ${walk.description ? `
                <div class="walk-card-description">
                    ${walk.description}
                </div>
            ` : ''}
        </div>
    `;
    }).join('');
}

// Mobile menu toggle
function setupMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.navigation');
    
    if (btn && nav) {
        btn.addEventListener('click', function() {
            btn.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
}

// Navigation setup
function setupNavigation() {
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active from all links
            links.forEach(l => l.classList.remove('active'));
            // Add active to clicked link
            this.classList.add('active');
            
            // Close mobile menu on small screens
            if (window.innerWidth <= 768) {
                const btn = document.getElementById('mobileMenuBtn');
                const nav = document.querySelector('.navigation');
                btn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
}

console.log('Brabrand Walks loaded!');