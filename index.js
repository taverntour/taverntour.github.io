document.addEventListener('DOMContentLoaded', () => {
    const pubSlider = document.getElementById('pub-slider');
    const sortSelect = document.getElementById('sort-select');

    // Fetch entries on page load
    fetchEntries();

    // Add event listener for sorting
    sortSelect.addEventListener('change', () => {
        fetchEntries(sortSelect.value);
    });

    // Function to fetch entries from the server
    async function fetchEntries(sortOption = 'rating-high-to-low') {
        try {
            const response = await fetch('/entries');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const entries = await response.json();
            const sortedEntries = sortEntries(entries, sortOption);
            displayEntries(sortedEntries);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    }

    // Function to sort entries based on the selected option
    function sortEntries(entries, sortOption) {
        switch (sortOption) {
            case 'rating-high-to-low':
                return entries.sort((a, b) => b.rating - a.rating);
            case 'rating-low-to-high':
                return entries.sort((a, b) => a.rating - b.rating);
            case 'date-added-newest':
                return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'date-added-oldest':
                return entries.sort((a, b) => new Date(a.date) - new Date(b.date));
            default:
                return entries;
        }
    }

    // Function to display entries on the page
    function displayEntries(entries) {
        pubSlider.innerHTML = ''; // Clear any existing content

        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.classList.add('entry');
            entryElement.dataset.entryId = entry.id;

            // Create entry HTML
            entryElement.innerHTML = `
                <div class="entry-title">${entry.name}</div>
                <div class="entry-rating">Rating: ${entry.rating}</div>
                <div class="entry-date">Date: ${entry.date}</div>
                <div class="entry-description">${entry.description}</div>
                <div class="entry-image">
                    <img src="${entry.image_1_url}" alt="${entry.name}">
                </div>
            `;

            entryElement.addEventListener('click', () => {
                window.location.href = `template.html?id=${entry.id}`;
            });

            pubSlider.appendChild(entryElement);
        });
    }
});