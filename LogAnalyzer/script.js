document.getElementById('analyzeButton').addEventListener('click', function() {
    const fileInput = document.getElementById('logFileInput');
    const logOutput = document.getElementById('logOutput');
    const errorChart = document.getElementById('errorChart').getContext('2d');
  
    if (fileInput.files.length === 0) {
      alert('ログファイルを選択してください。');
      return;
    }
  
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const logContent = e.target.result;
      logOutput.textContent = logContent;
  
      const errorCounts = parseLogContent(logContent);
      displayChart(errorChart, errorCounts);
    };
  
    reader.readAsText(file);
  });
  
  function parseLogContent(logContent) {
    const lines = logContent.split('\n');
    const errorCounts = {
      error: 0,
      warning: 0,
      info: 0,
    };
  
    lines.forEach(line => {
      if (line.includes('ERROR')) {
        errorCounts.error++;
      } else if (line.includes('WARNING')) {
        errorCounts.warning++;
      } else if (line.includes('INFO')) {
        errorCounts.info++;
      }
    });
  
    return errorCounts;
  }
  
  function displayChart(ctx, errorCounts) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Error', 'Warning', 'Info'],
        datasets: [{
          label: 'ログレベル別カウント',
          data: [errorCounts.error, errorCounts.warning, errorCounts.info],
          backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb'],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  