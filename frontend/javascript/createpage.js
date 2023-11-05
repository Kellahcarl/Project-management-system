let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.getElementById('current-month-year').innerText = new Date(currentYear, currentMonth).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

document.getElementById('prev-month').addEventListener('click', function() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    updateCalendar();
});

document.getElementById('next-month').addEventListener('click', function() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    updateCalendar();
});

function updateCalendar() {
    document.getElementById('current-month-year').innerText = new Date(currentYear, currentMonth).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    const daysContainer = document.getElementById('days-of-month');
    daysContainer.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const day = document.createElement('span');
        day.innerText = '';
        daysContainer.appendChild(day);
    }

    for (let i = 1; i <= lastDay; i++) {
        const day = document.createElement('span');
        day.innerText = i;
        day.addEventListener('click', function() {
            document.getElementById('selected-date').value = new Date(currentYear, currentMonth, i).toLocaleDateString();
        });
        daysContainer.appendChild(day);
    }
}

updateCalendar();

document.getElementById('create-btn').addEventListener('click', function(event) {
    const projectName = document.getElementById('create-name-input').value;
    const projectDescription = document.getElementById('desc-input').value;
    const dueDate = document.getElementById('selected-date').value;

    if (event.target.innerText === 'create') {
        if (projectName !== '') {
            document.getElementById('projects').innerText = projectName;
        }
    } else if (event.target.innerText === 'cancel') {
        document.getElementById('create-name-input').value = '';
        document.getElementById('desc-input').value = '';
        document.getElementById('selected-date').value = '';
    }
});
