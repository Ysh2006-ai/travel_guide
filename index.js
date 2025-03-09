document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    const searchInput = document.getElementById('destinationSearch');
    const noResults = document.getElementById('noResults');

    // Add animation keyframes to your CSS
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `);

    // Combined filter and search function
    function filterDestinations() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        let hasResults = false;

        destinationCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const tags = card.getAttribute('data-tags').toLowerCase();
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            const matchesSearch = searchTerm === '' || 
                tags.includes(searchTerm) || 
                title.includes(searchTerm) || 
                description.includes(searchTerm);

            const matchesCategory = activeCategory === 'all' || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        noResults.style.display = hasResults ? 'none' : 'block';
    }

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterDestinations();
        });
    });

    // Search input handler with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterDestinations, 300);
    });

    // Initial filter to show all destinations
    filterDestinations();

    // footer
     // Add smooth scrolling to all footer links
     document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          if (href !== '#') {
            // Smooth scroll to section or navigate to page
            document.querySelector(href)?.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
  
      // Add hover animation to social media icons
      document.querySelectorAll('.social-links a').forEach(icon => {
        icon.addEventListener('mouseover', () => {
          icon.style.color = '#4CAF50';
        });
        icon.addEventListener('mouseout', () => {
          icon.style.color = '#ffffff';
        });
      });
});