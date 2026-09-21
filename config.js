let apiUrl = window.NEXAPRINT_CONFIG?.apiUrl || localStorage.getItem('nexa-url') || '';
document.querySelector('#api-url').value = apiUrl;
