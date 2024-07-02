document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/data/data.json')
        const data = await response.json();
        const taskList = document.getElementById('task-list');

        const priorityCounts = { alta: 0, media: 0, baja: 0 };
        const statusCounts = { completado: 0, pendiente: 0 };

        data.results.forEach(task => {
            const taskRow = document.createElement('tr');
            taskRow.className = task.isDone ? 'completed' : '';
            taskRow.innerHTML = `
                <td>${task.title}</td>
                <td>${task.priority}</td>
                <td>${task.isDone ? 'Completado' : 'Pendiente'}</td>
            `;
            taskList.appendChild(taskRow);

            // Count priorities and statuses
            priorityCounts[task.priority]++;
            statusCounts[task.isDone ? 'completado' : 'pendiente']++;
        });

        // Create chart
        const ctx = document.getElementById('taskChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Alta', 'Media', 'Baja', 'Completado', 'Pendiente'],
                datasets: [{
                    label: 'Número de Tareas',
                    data: [
                        priorityCounts.alta,
                        priorityCounts.media,
                        priorityCounts.baja,
                        statusCounts.completado,
                        statusCounts.pendiente
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
});

