var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1HqlJuNMoytkSh9tJjdSu1_Qg7laXC5gh';

function init() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true,
        wanted: ['Worksheet'] // Замініть 'YourSheetName' на назву вашого листка
    });
}

function showInfo(data, tabletop) {
    var productsDiv = document.getElementById('products');
    var errorDiv = document.getElementById('error');

    if (data.length === 0) {
        errorDiv.innerText = 'Помилка: Дані не були знайдені в таблиці.';
        return;
    }

    productsDiv.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        var product = data[i];
        var productHtml = `
            <div class="product">
                <h2>${product['Назва моделі']}</h2>
                <p>Ціна: ${product['Ціна']} грн</p>
                <p>Наявність: ${product['Наявність'] === '✅' ? 'Є в наявності' : 'Немає в наявності'}</p>
            </div>
        `;

        productsDiv.innerHTML += productHtml;
    }
}

function showError(error) {
    var errorDiv = document.getElementById('error');
    errorDiv.innerText = 'Помилка отримання даних з таблиці: ' + error.message;
}

window.addEventListener('DOMContentLoaded', init);

// Обробка помилок під час завантаження таблиці
window.addEventListener('TabletopLoadError', function (e) {
    showError(e.detail);
});
