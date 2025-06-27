<?php
$team = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['team'] ?? 'Zdena');
$targetDir = __DIR__ . "/fotky/" . $team . "/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (!empty($_FILES['file'])) {
    $file = $_FILES['file'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    $allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($mime, $allowed)) {
        http_response_code(400);
        echo 'Nepodporovaný typ souboru';
        exit;
    }
    $name = basename($file['name']);
    $name = preg_replace('/[^a-zA-Z0-9_.-]/', '_', $name);
    $targetFile = $targetDir . $name;
    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        echo 'OK';
    } else {
        http_response_code(500);
        echo 'Chyba při nahrávání.';
    }
} else {
    http_response_code(400);
    echo 'Žádný soubor nepřijat.';
}
?>
