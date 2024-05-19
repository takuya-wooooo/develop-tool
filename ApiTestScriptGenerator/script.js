document.getElementById('api-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const endpoint = document.getElementById('endpoint').value;
    const method = document.getElementById('method').value;
  
    const script = `
      const request = require('supertest');
      const baseUrl = '${endpoint}';
  
      describe('API Test', () => {
        it('should ${method} endpoint', async () => {
          const response = await request(baseUrl).${method.toLowerCase()}('/');
          expect(response.status).toBe(200);
        });
      });
    `;
  
    document.getElementById('generated-script').textContent = script;
  });
  