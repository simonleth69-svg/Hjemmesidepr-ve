const form = document.getElementById('routeForm');

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    setupForm();
    setDefaultDate();
});

// Set today's date as default
function setDefaultDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
}

// Setup form events
function setupForm() {
    if (!form) return;
    form.addEventListener('submit', submitForm);
}

// Submit form
function submitForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('routeName');
    const location = document.getElementById('location');
    const desc = document.getElementById('description');
    const dist = document.getElementById('distance');
    const dur = document.getElementById('duration');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const diff = document.getElementById('difficulty');
    
    if (!name || !location || !desc || !dist || !dur || !dateInput || !timeInput || !diff) {
        alert('Missing form elements');
        return;
    }
    
    const nameVal = name.value.trim();
    const locVal = location.value.trim();
    const descVal = desc.value.trim();
    const distVal = dist.value.trim();
    const durVal = dur.value.trim();
    const dateVal = dateInput.value;
    const timeVal = timeInput.value;
    const diffVal = diff.value;
    
    if (!nameVal || !locVal || !descVal || !distVal || !durVal || !dateVal || !timeVal || !diffVal) {
        alert('Please fill in all fields');
        return;
    }
    
    // Convert date format
    const dateObj = new Date(dateVal);
    const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Keep time in 24-hour format (HH:MM)
    const formattedTime = timeVal;
    
    const newRoute = {
        title: nameVal,
        date: formattedDate,
        time: formattedTime,
        location: locVal,
        distance: distVal,
        difficulty: diffVal,
        description: descVal
    };
    
    try {
        saveRouteToLocalStorage(newRoute);
        alert('Route created! Redirecting to home...');
        
        form.reset();
        setDefaultDate();
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving route. Please try again.');
    }
}

console.log('Create Route loaded!');