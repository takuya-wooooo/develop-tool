document.getElementById('format-button').addEventListener('click', function() {
    const input = document.getElementById('json-input').value;
    try {
      const formatted = JSON.stringify(JSON.parse(input), null, 2);
      document.getElementById('formatted-json').textContent = formatted;
    } catch (e) {
      document.getElementById('formatted-json').textContent = 'Invalid JSON';
    }
  });
  