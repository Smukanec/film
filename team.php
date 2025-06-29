<?php
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}
$dataFile = $dataDir . '/teams.json';
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, '{}');
}
$teams = json_decode(file_get_contents($dataFile), true);
$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'create':
        $team = trim($_POST['team'] ?? '');
        $leader = trim($_POST['leader'] ?? '');
        if (!$team || !$leader) {
            http_response_code(400);
            echo 'Missing team or leader';
            exit;
        }
        if (isset($teams[$team])) {
            http_response_code(400);
            echo 'Team already exists';
            exit;
        }
        $teams[$team] = [
            'leader' => $leader,
            'members' => []
        ];
        file_put_contents($dataFile, json_encode($teams, JSON_PRETTY_PRINT));
        echo 'created';
        break;
    case 'add':
        $team = trim($_POST['team'] ?? '');
        $member = trim($_POST['member'] ?? '');
        $license = trim($_POST['license'] ?? '');
        if (!$team || !$member || !$license) {
            http_response_code(400);
            echo 'Missing parameters';
            exit;
        }
        if (!isset($teams[$team])) {
            http_response_code(404);
            echo 'Team not found';
            exit;
        }
        if ($teams[$team]['leader'] !== $license) {
            http_response_code(403);
            echo 'Forbidden';
            exit;
        }
        if (!in_array($member, $teams[$team]['members'])) {
            $teams[$team]['members'][] = $member;
            file_put_contents($dataFile, json_encode($teams, JSON_PRETTY_PRINT));
        }
        echo 'added';
        break;
    case 'remove':
        $team = trim($_POST['team'] ?? '');
        $member = trim($_POST['member'] ?? '');
        $license = trim($_POST['license'] ?? '');
        if (!$team || !$member || !$license) {
            http_response_code(400);
            echo 'Missing parameters';
            exit;
        }
        if (!isset($teams[$team])) {
            http_response_code(404);
            echo 'Team not found';
            exit;
        }
        if ($teams[$team]['leader'] !== $license) {
            http_response_code(403);
            echo 'Forbidden';
            exit;
        }
        $teams[$team]['members'] = array_values(array_diff($teams[$team]['members'], [$member]));
        file_put_contents($dataFile, json_encode($teams, JSON_PRETTY_PRINT));
        echo 'removed';
        break;
    case 'get':
        $team = trim($_GET['team'] ?? '');
        if (!$team || !isset($teams[$team])) {
            http_response_code(404);
            echo 'Team not found';
            exit;
        }
        header('Content-Type: application/json');
        echo json_encode($teams[$team]);
        break;
    default:
        echo 'Invalid action';
}
?>
