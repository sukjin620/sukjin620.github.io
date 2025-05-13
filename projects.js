/*Project page filter menu*/
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selected = button.getAttribute('data-category');

        // Update button active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show/hide cards
        cards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (selected === 'all' || categories.includes(selected)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
        });
    });
});
