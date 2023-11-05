let currentMonth: number = new Date().getMonth();
let currentYear: number = new Date().getFullYear();

document.getElementById('current-month-year')!.innerText = new Date(currentYear, currentMonth).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

document.getElementById('prev-month')!.addEventListener('click', function() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    updateCalendar();
});

document.getElementById('next-month')!.addEventListener('click', function() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    updateCalendar();
});

function updateCalendar() {
    document.getElementById('current-month-year')!.innerText = new Date(currentYear, currentMonth).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    const daysContainer = document.getElementById('days-of-month')!;
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
        day.innerText = i.toString();
        day.addEventListener('click', function() {
            document.getElementById('selected-date')!.value = new Date(currentYear, currentMonth, i).toLocaleDateString();
        });
        daysContainer.appendChild(day);
    }
}

updateCalendar();

document.getElementById('form')!.addEventListener('submit', function(event) {
    event.preventDefault();

    const projectName = (document.getElementById('create-name-input') as HTMLInputElement).value;
    const projectDescription = (document.getElementById('desc-input') as HTMLInputElement).value;
    const dueDate = (document.getElementById('selected-date') as HTMLInputElement).value;
    const buttonClicked = (event.submitter as HTMLButtonElement).innerText.toLowerCase();

    if (buttonClicked === 'create') {
        if (projectName !== '') {
            const projectDiv = document.getElementById('created')!;
            const projectElement = document.createElement('div');
            projectElement.innerText = projectName;
            projectDiv.appendChild(projectElement);
        }
    } else if (buttonClicked === 'cancel') {
        (document.getElementById('create-name-input') as HTMLInputElement).value = '';
        (document.getElementById('desc-input') as HTMLInputElement).value = '';
        (document.getElementById('selected-date') as HTMLInputElement).value = '';
    }
});
