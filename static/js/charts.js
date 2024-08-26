// Example of using Chart.js to create charts
$(document).ready(function() {
    // Chart 1: Influence Chart
    var ctx1 = document.getElementById('influenceChart').getContext('2d');
    var influenceChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Responses',
                data: [0, 0, 1, 1, 8],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });

    // Chart 2: Resume Chart
    var ctx2 = document.getElementById('resumeChart').getContext('2d');
    var resumeChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Yes', 'No'],
            datasets: [{
                data: [10, 90],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        }
    });

    // Additional charts can be added similarly
    var ctx3 = document.getElementById('itRelatedChart').getContext('2d');
    var itRelatedChart = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Yes', 'No'],
            datasets: [{
                data: [10, 90],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        }
    });

    // Additional charts can be added similarly
    var ctx4 = document.getElementById('fieldsChart').getContext('2d');
    var fieldsChart = new Chart(ctx4, {
        type: 'pie',
        data: {
            labels: ['Yes', 'No'],
            datasets: [{
                data: [10, 90],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        }
    });

});
