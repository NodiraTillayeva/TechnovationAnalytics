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

    // Define the Google Sheets JSON URL
    const jsonUrl = "https://docs.google.com/spreadsheets/d/1Zq6m433XYNb4PLtf-QytM4p90p2iou8ybVe2fWJcetg/gviz/tq?tqx=out:json";

    // Fetch data from Google Sheets
    fetch(jsonUrl)
        .then(response => response.text())
        .then(data => {
            const jsonData = JSON.parse(data.substring(47).slice(0, -2)); // Parse Google Sheets JSON
            const rows = jsonData.table.rows; // Extract rows
            
            const influenceData = []; 
            const resumeMentionData = { yes: 0, no: 0 }; 
            const itRelatedData = { yes: 0, no: 0 };
            const fieldsData = {};
            const chartInfluence = [0, 0, 0, 0, 0];

            // Process rows for influence data
            rows.forEach(row => {
                if (row.c[5] && row.c[5].v) {
                    const influence = parseInt(row.c[5].v, 10); // Parse the number from the cell
                    if (!isNaN(influence)) {
                        influenceData.push(influence); // Push to the data array
                    }
                }

                // Extract resume mention data from a specific column (update the index if needed)
                if (row.c[6] && row.c[6].v) { // Assuming column 6 has resume mention data
                    const resumeMention = row.c[6].v;
                    if (resumeMention === "Да / Ha") {
                        resumeMentionData.yes++;
                    } else {
                        resumeMentionData.no++;
                    }
                }

                

                // Extract IT-related work/study data from a specific column (update the index if needed)
                if (row.c[7] && row.c[7].v) { // Assuming column 7 has IT-related data
                    const itRelated = row.c[7].v;
                    if (itRelated === "Да / Ha") {
                        itRelatedData.yes++;
                    } else {
                        itRelatedData.no++;
                    }
                }


                if (row.c[8] && row.c[8].v) {  // Adjust column 8 for field of study/work
                    const fields = row.c[8].v.split(',');  // Split by commas
                    fields.forEach(field => {
                        field = field.trim();  // Trim whitespace from field names
                        if (fieldsData[field]) {
                            fieldsData[field]++;  // Increment count if field already exists
                        } else {
                            fieldsData[field] = 1;  // Initialize count for new field
                        }
                    });
                }
            });
            
            // Count occurrences of each value in influenceData
            influenceData.forEach(value => {
                if (value >= 1 && value <= 5) {
                    chartInfluence[value - 1] += 1;  // Increment the count for the corresponding value
                }
            });



            // Output the result
            console.log('Influence data:', influenceData);
            console.log('Chart influence counts:', chartInfluence);

            // Now, update the charts with the parsed data

            // Chart 1: Influence Chart (Bar Chart)
            new Chart(document.getElementById('influenceChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['1', '2', '3', '4', '5'],
                    datasets: [{
                        label: 'Responses',
                        data: chartInfluence,
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
                            display: false
                        }
                    }
                }
            });

            // Chart 2: Resume Mention Chart (Pie Chart)
            new Chart(document.getElementById('resumeChart').getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Yes', 'No'],
                    datasets: [{
                        data: [resumeMentionData.yes, resumeMentionData.no],
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
            new Chart(document.getElementById('itRelatedChart').getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Yes', 'No'],
                    datasets: [{
                        data: [itRelatedData.yes, itRelatedData.no],
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
            const fieldLabels = Object.keys(fieldsData);
            const fieldCounts = Object.values(fieldsData);

            new Chart(document.getElementById('fieldsChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: fieldLabels,
                    datasets: [{
                        label: 'Participants',
                        data: fieldCounts,
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
                            display: false
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
