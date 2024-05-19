document.getElementById('convert-button').addEventListener('click', function() {
    const input = document.getElementById('data-input').value;
    const convertTo = document.getElementById('convert-to').value;
    let converted;
  
    try {
      if (convertTo === 'csv-to-json') {
        converted = csvToJson(input);
      } else if (convertTo === 'json-to-csv') {
        converted = jsonToCsv(input);
      }
      document.getElementById('converted-data').textContent = converted;
    } catch (e) {
      document.getElementById('converted-data').textContent = 'Conversion error';
    }
  });
  
  function csvToJson(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
    });
    return JSON.stringify(result, null, 2);
  }
  
  function jsonToCsv(json) {
    const objArray = JSON.parse(json);
    const headers = Object.keys(objArray[0]);
    const csv = [headers.join(',')];
    objArray.forEach(obj => {
      csv.push(headers.map(header => obj[header]).join(','));
    });
    return csv.join('\n');
  }
  