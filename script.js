// Підключаємося до Google Таблиці за допомогою Tabletop.js
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1HqlJuNMoytkSh9tJjdSu1_Qg7laXC5gh';

function init() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true
    });
}

function showInfo(data, tabletop) {
    // Отримуємо елемент div для вставки даних
    var productsDiv = document.getElementById('products');

    // Рендеримо дані у форматі магазину
    for (var i = 0; i < data.length; i++) {
        var product = data[i];
        var productHtml = `
            <div class="product">
                <h2>${product['назва моделі']}</h2>
                <p>Ціна: ${product['ціна'] * product['курс']} грн</p>
                <p>Наявність: ${product['наявність'] === '✅' ? 'Є в наявності' : 'Немає в наявності'}</p>
            </div>
        `;

        productsDiv.innerHTML += productHtml;
    }
}

// Запускаємо ініціалізацію після завантаження сторінки
window.addEventListener('DOMContentLoaded', init);
