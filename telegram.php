<?php
/*
NMNH Telegram Lead Sender
*/

// Вставьте токен вашего бота
$token = "8875182859:AAFhbDvmJjuiv4eyUezzuytK45iWV742zkE";

// Вставьте ваш Chat ID (получите его у @userinfobot или @GetMyChatID_Bot)
$chat_id = "511442168";

// Получаем данные из формы
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$telegram = isset($_POST['telegram']) ? trim($_POST['telegram']) : '';
$vertical = isset($_POST['vertical']) ? trim($_POST['vertical']) : '';

$utm_source = isset($_POST['utm_source']) ? trim($_POST['utm_source']) : '';
$utm_medium = isset($_POST['utm_medium']) ? trim($_POST['utm_medium']) : '';
$utm_campaign = isset($_POST['utm_campaign']) ? trim($_POST['utm_campaign']) : '';
$utm_content = isset($_POST['utm_content']) ? trim($_POST['utm_content']) : '';

// Форматируем сообщение
$arr = array(
    '🔥 Новая заявка NMNH!' => '',
    '👤 Имя:' => $name,
    '💬 Telegram:' => $telegram,
    '🎯 Направление:' => $vertical,
);

if (!empty($utm_source)) $arr['📢 Источник (utm_source):'] = $utm_source;
if (!empty($utm_medium)) $arr['✉️ Тип трафика (utm_medium):'] = $utm_medium;
if (!empty($utm_campaign)) $arr['🎁 Кампания (utm_campaign):'] = $utm_campaign;
if (!empty($utm_content)) $arr['📝 Контент (utm_content):'] = $utm_content;

$txt = "";
foreach($arr as $key => $value) {
    if (empty($value)) {
        $txt .= "<b>" . $key . "</b>\n\n";
    } else {
        $txt .= "<b>" . $key . "</b> " . htmlspecialchars($value) . "\n";
    }
}

// Отправляем запрос к Telegram API
$url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text=" . urlencode($txt);
$sendToTelegram = @file_get_contents($url);

header('Content-Type: application/json');
if ($sendToTelegram !== false) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send to Telegram']);
}
?>
