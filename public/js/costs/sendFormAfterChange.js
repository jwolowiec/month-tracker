const form = document.getElementById('filterForm');
const inputs = form.querySelectorAll('input');

inputs.forEach((input) => {
    input.addEventListener('change', () => {
        form.submit();
    });
});