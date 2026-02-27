// Analytics Dashboard Charts
document.addEventListener('DOMContentLoaded', function() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Portfolio',
                    data: [100, 102, 105, 108, 107, 112, 115, 118, 117, 120, 122, 118],
                    borderColor: '#4A90E2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'S&P 500',
                    data: [100, 101, 102, 104, 103, 105, 106, 108, 107, 108, 109, 108],
                    borderColor: '#B8B8B8',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Attribution Chart
    const attributionCtx = document.getElementById('attributionChart');
    if (attributionCtx) {
        new Chart(attributionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'Others'],
                datasets: [{
                    label: 'Contribution to Return',
                    data: [5.88, 2.73, 2.05, 1.82, 1.45, 0.95, 0.82, 2.50],
                    backgroundColor: function(context) {
                        const value = context.parsed.y;
                        return value >= 0 ? 'rgba(40, 167, 69, 0.8)' : 'rgba(220, 53, 69, 0.8)';
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Risk/Return Scatter
    const riskReturnCtx = document.getElementById('riskReturnChart');
    if (riskReturnCtx) {
        new Chart(riskReturnCtx.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Your Portfolio',
                    data: [{x: 16.5, y: 28.4}],
                    backgroundColor: '#4A90E2',
                    pointRadius: 10
                }, {
                    label: 'S&P 500',
                    data: [{x: 14.2, y: 18.5}],
                    backgroundColor: '#B8B8B8',
                    pointRadius: 8
                }, {
                    label: 'Peer Average',
                    data: [{x: 15.8, y: 22.1}],
                    backgroundColor: '#F5A623',
                    pointRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Risk (Volatility %)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Return %'
                        }
                    }
                }
            }
        });
    }

    // Rolling Statistics Chart
    const rollingCtx = document.getElementById('rollingChart');
    if (rollingCtx) {
        const labels = [];
        const data = [];
        for (let i = 0; i < 90; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (90 - i));
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            data.push(Math.random() * 5 + 15);
        }

        new Chart(rollingCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '30-Day Rolling Returns',
                    data: data,
                    borderColor: '#4A90E2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Correlation Matrix
    const correlationCtx = document.getElementById('correlationChart');
    if (correlationCtx) {
        // Create a heatmap-style visualization
        const symbols = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'AMZN'];
        const correlationData = [];

        for (let i = 0; i < symbols.length; i++) {
            for (let j = 0; j < symbols.length; j++) {
                const correlation = i === j ? 1 : (Math.random() * 0.6 + 0.2);
                correlationData.push({
                    x: symbols[i],
                    y: symbols[j],
                    v: correlation
                });
            }
        }

        new Chart(correlationCtx.getContext('2d'), {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Correlation',
                    data: correlationData.map(item => ({
                        x: symbols.indexOf(item.x),
                        y: symbols.indexOf(item.y),
                        r: Math.abs(item.v) * 20
                    })),
                    backgroundColor: correlationData.map(item => {
                        const v = item.v;
                        if (v > 0.7) return 'rgba(220, 53, 69, 0.8)';
                        if (v > 0.4) return 'rgba(255, 193, 7, 0.8)';
                        return 'rgba(40, 167, 69, 0.8)';
                    })
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const i = context.parsed.x;
                                const j = context.parsed.y;
                                return symbols[i] + ' vs ' + symbols[j] + ': ' + correlationData[i * symbols.length + j].v.toFixed(2);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            callback: function(value) {
                                return symbols[value];
                            }
                        }
                    },
                    y: {
                        ticks: {
                            callback: function(value) {
                                return symbols[value];
                            }
                        }
                    }
                }
            }
        });
    }

    // Factor Chart
    const factorCtx = document.getElementById('factorChart');
    if (factorCtx) {
        new Chart(factorCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Market', 'Size', 'Value', 'Momentum', 'Quality', 'Low Vol'],
                datasets: [{
                    label: 'Portfolio',
                    data: [1.12, 0.23, -0.15, 0.45, 0.38, 0.12],
                    borderColor: '#4A90E2',
                    backgroundColor: 'rgba(74, 144, 226, 0.2)'
                }, {
                    label: 'Benchmark',
                    data: [1.0, 0, 0, 0, 0, 0],
                    borderColor: '#B8B8B8',
                    backgroundColor: 'rgba(184, 184, 184, 0.1)',
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 1.5,
                        min: -0.5
                    }
                }
            }
        });
    }

    // Sparklines
    const sparklineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };

    // Return Sparkline
    const returnSparkline = document.getElementById('returnSparkline');
    if (returnSparkline) {
        new Chart(returnSparkline.getContext('2d'), {
            type: 'line',
            data: {
                labels: Array(30).fill(''),
                datasets: [{
                    data: Array(30).fill(0).map(() => Math.random() * 10 + 10),
                    borderColor: '#28A745',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: sparklineOptions
        });
    }

    // Sharpe Sparkline
    const sharpeSparkline = document.getElementById('sharpeSparkline');
    if (sharpeSparkline) {
        new Chart(sharpeSparkline.getContext('2d'), {
            type: 'line',
            data: {
                labels: Array(30).fill(''),
                datasets: [{
                    data: Array(30).fill(0).map(() => Math.random() * 0.5 + 1.2),
                    borderColor: '#4A90E2',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: sparklineOptions
        });
    }

    // Alpha Sparkline
    const alphaSparkline = document.getElementById('alphaSparkline');
    if (alphaSparkline) {
        new Chart(alphaSparkline.getContext('2d'), {
            type: 'line',
            data: {
                labels: Array(30).fill(''),
                datasets: [{
                    data: Array(30).fill(0).map(() => Math.random() * 5 + 5),
                    borderColor: '#28A745',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: sparklineOptions
        });
    }

    // Drawdown Sparkline
    const drawdownSparkline = document.getElementById('drawdownSparkline');
    if (drawdownSparkline) {
        new Chart(drawdownSparkline.getContext('2d'), {
            type: 'line',
            data: {
                labels: Array(30).fill(''),
                datasets: [{
                    data: Array(30).fill(0).map(() => -Math.random() * 5 - 5),
                    borderColor: '#DC3545',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: sparklineOptions
        });
    }
});