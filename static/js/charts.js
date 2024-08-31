$(document).ready(function() {
    // Define a consistent color palette
    const colors = {
        blue: 'rgba(54, 162, 235, 0.7)',
        red: 'rgba(255, 99, 132, 0.7)',
        yellow: 'rgba(255, 206, 86, 0.7)',
        green: 'rgba(75, 192, 192, 0.7)',
        purple: 'rgba(153, 102, 255, 0.7)',
        borderBlue: 'rgba(54, 162, 235, 1)',
        borderRed: 'rgba(255, 99, 132, 1)',
        borderYellow: 'rgba(255, 206, 86, 1)',
        borderGreen: 'rgba(75, 192, 192, 1)',
        borderPurple: 'rgba(153, 102, 255, 1)',
    };

    // Chart 1: Influence Chart (Bar Chart)
    var ctx1 = document.getElementById('influenceChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Responses',
                data: [0, 0, 1, 1, 8],
                backgroundColor: colors.blue,
                borderColor: colors.borderBlue,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Hide legend for a cleaner look
                }
            }
        }
    });

    // Chart 2: Resume Mention Chart (Pie Chart)
    var ctx2 = document.getElementById('resumeChart').getContext('2d');
    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Yes', 'No'],
            datasets: [{
                data: [10, 90],
                backgroundColor: [colors.green, colors.yellow],
                borderColor: [colors.borderGreen, colors.borderYellow],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Chart 3: IT-Related Work Chart (Pie Chart)
    var ctx3 = document.getElementById('itRelatedChart').getContext('2d');
    new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Yes', 'No'],
            datasets: [{
                data: [80, 20],
                backgroundColor: [colors.blue, colors.red],
                borderColor: [colors.borderBlue, colors.borderRed],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Chart 4: Fields of Study or Work Chart (Horizontal Bar Chart)
    var ctx4 = document.getElementById('fieldsChart').getContext('2d');
    new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ['Computer Science', 'Data Science', 'Education', 'Healthcare & Medicine', 'Information Technology', 'Mathematics & Statistics', 'Product / Project Management'],
            datasets: [{
                label: 'Participants',
                data: [2, 1, 2, 1, 1, 1, 0],
                backgroundColor: colors.purple,
                borderColor: colors.borderPurple,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Hide legend for a cleaner look
                }
            }
        }
    });
});
