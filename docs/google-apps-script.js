/**
 * CARAVON.NL — Google Apps Script для получения заявок с сайта
 *
 * Инструкция по установке:
 * 1. Откройте Google Таблицы: https://sheets.google.com
 * 2. Создайте новую таблицу с именем "CARAVON Заявки"
 * 3. В верхнем меню: Расширения → Apps Script
 * 4. Удалите весь код в редакторе и вставьте этот файл целиком
 * 5. Нажмите "Сохранить" (Ctrl+S)
 * 6. Нажмите "Развернуть" → "Новое развёртывание"
 * 7. Тип: "Веб-приложение"
 *    - Выполнять как: "Я" (ваш аккаунт)
 *    - Кто имеет доступ: "Все" (Anyone)
 * 8. Нажмите "Развернуть" → скопируйте URL вида:
 *    https://script.google.com/macros/s/AKfycb.../exec
 * 9. Вставьте этот URL в файл .env.local:
 *    GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Дата заявки',
        'Имя',
        'Телефон',
        'Email',
        'Воерхейд/Транспорт',
        'Услуга',
        'Дата приёма',
        'Время',
        'Описание',
        'Язык'
      ]);

      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#E8640A');
      headerRange.setFontColor('#FFFFFF');
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.naam || '',
      data.telefoon || '',
      data.email || '',
      data.voertuig || '',
      data.service || '',
      data.date || '',
      data.time || '',
      data.omschrijving || '',
      data.locale || 'nl'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually in Apps Script editor to verify the sheet works
function testAppend() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(), 'Test Klant', '+31612345678', 'test@example.com',
    'Camper VW California', 'Onderhoud & service',
    'maandag 1 september 2025', '10:00', 'Test aanvraag', 'nl'
  ]);
  Logger.log('Test row added successfully');
}
