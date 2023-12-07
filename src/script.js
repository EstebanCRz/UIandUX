document.addEventListener('DOMContentLoaded', function() {
    // Array of possible colors
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#d35400', '#c0392b'];

    // Get random color from the array
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Apply a new design on page load
    function applyNewDesign() {
        document.body.style.backgroundColor = getRandomColor();
        document.querySelector('.container h1').style.color = getRandomColor();
    }

    // Apply a new design on page load
    applyNewDesign();

    // Refresh the design on page refresh
    window.addEventListener('beforeunload', function() {
        applyNewDesign();
    });
});
