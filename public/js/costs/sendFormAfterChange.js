const form = document.getElementById('filterForm');
const inputs = form.querySelectorAll('input');
const reset = document.getElementById('reset');

reset.addEventListener('click', () => {
    inputs.forEach((input) => {
        input.checked = false;
    });
    form.submit();
});

inputs.forEach((input) => {
    input.addEventListener('change', () => {
        form.submit();
    });
});