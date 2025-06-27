<?php
$team = "Zdena";
$targetDir = "fotky/" . $team . "/";

if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (!empty($_FILES["file"])) {
    $file = $_FILES["file"];
    $targetFile = $targetDir . basename($file["name"]);

    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        echo "OK";
    } else {
        http_response_code(500);
        echo "Chyba při nahrávání.";
    }
} else {
    http_response_code(400);
    echo "Žádný soubor nepřijat.";
}
?>
