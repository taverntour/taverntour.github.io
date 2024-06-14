document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let entryId = parseInt(urlParams.get('id'), 10);

    if (!entryId) {
        console.error('No entry ID specified in the URL');
        return;
    }

    async function fetchEntryById(id) {
        try {
            const response = await fetch(`/data/entry-${id}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const entry = await response.json();
            displayEntry(entry);
        } catch (error) {
            console.error('Error fetching entry:', error);
        }
    }

    function displayEntry(entry) {
        document.getElementById('entry-title').textContent = entry.name;
        document.getElementById('entry-rating').textContent = `Rating: ${entry.rating}`;
        document.getElementById('entry-date').textContent = `Date: ${entry.date}`;
        document.getElementById('entry-text-content').textContent = entry.content;
        document.getElementById('entry-image-1').src = entry.image_1_url;
        document.getElementById('entry-image-1').alt = entry.name;

        if (entry.image_2_url) {
            document.getElementById('entry-image-2').src = entry.image_2_url;
            document.getElementById('entry-image-2').alt = entry.name;
            document.querySelector('.entry-secondary-image').style.display = 'block';
        } else {
            document.querySelector('.entry-secondary-image').style.display = 'none';
        }
    }

    function navigateToEntry(newId) {
        window.location.href = `?id=${newId}`;
    }

    document.getElementById('prev-entry').addEventListener('click', () => {
        if (entryId > 1) {  // Assuming entry IDs start from 1
            navigateToEntry(entryId - 1);
        }
    });

    document.getElementById('next-entry').addEventListener('click', () => {
        navigateToEntry(entryId + 1);  // Boundary check can be added if max ID is known
    });

    fetchEntryById(entryId);
});