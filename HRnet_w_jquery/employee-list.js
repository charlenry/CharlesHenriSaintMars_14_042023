import employees from './employees.js'

$(function() {
    const store = JSON.parse(localStorage.getItem('employees'));
    let staff = [];
    if (store) {
        staff = employees.concat(store);
    } else {
        staff = employees;
    }

    $('#employee-table').DataTable({
        data: staff,
        columns: [
            { title: 'First Name', data: 'firstName' },
            { title: 'Last Name', data: 'lastName' },
            { title: 'Start Date', data: 'startDate' },
            { title: 'Department', data: 'department' },
            { title: 'Date of Birth', data: 'dateOfBirth' },
            { title: 'Street', data: 'street' },
            { title: 'City', data: 'city' },
            { title: 'State', data: 'state' },
            { title: 'Zip Code', data: 'zipCode' },
        ]
    });
});