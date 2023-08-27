// Fetch park data from the API
async function fetchParkData() {
    const apiKey = 'sbZY3d7bHTLinkX87aCUk7b5rTkUKClJ8a4ohHzw';
    const stateCode = 'CA';
    const limit = 12;
    const apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&limit=${limit}&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Create a park card element
function createParkCard(park) {
    const card = document.createElement('div');
    card.classList.add('park-card');

    const imageUrl = park.images[0]?.url || 'assets/placeholder-image.png'; // Use placeholder if no image available

    const activitiesText = park.activities.length > 0 ? `<strong>Activities: </strong>${park.activities.slice(0, 3).map(activity => activity.name).join(', ')}` : ''; // Hide activities title if no activities availible


    card.innerHTML = `
        <h2>${park.fullName}</h2>
        <img src="${imageUrl}" alt="${park.fullName} Image">
        <p>${park.description.slice(0, 300)}...</p>
        <p><strong>GPS coordinates: </strong>${park.latitude} N ${park.longitude} W</p>
        <p>${activitiesText}</p>
        <a href="${park.url}" target="_blank">Learn More</a>
    `;

    return card;
}

// Populate the park grid
async function populateParkGrid() {
    const parkGrid = document.querySelector('.park-grid');
    const parkData = await fetchParkData();

    parkData.forEach(park => {
        const parkCard = createParkCard(park);
        parkGrid.appendChild(parkCard);
    });
}

// Populate the park grid when the page loads
window.addEventListener('load', populateParkGrid);

