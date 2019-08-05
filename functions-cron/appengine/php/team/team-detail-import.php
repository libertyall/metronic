<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";

require_once "../utils.global.php";

$project = new sfwApp();

$time_start = microtime(true);

echo $project->generateHeader();
echo "<h1>Importiere Mannschaftsdetails von fussball.de</h1>";


try {
  $batch = $project->db->batch();

  $seasonStart = isset($_GET['jahr']) ? DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $_GET['jahr'] . '-07-01 00:00:00') : new DateTimeImmutable();

  $currentYear = new DateTimeImmutable();
  if ($seasonStart->format('m') < 7) {
    $seasonEndDate = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->format('Y') . '-06-30 23:59:59');
    $seasonStartDate = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->sub(new DateInterval('P1Y'))->format('Y') . '-07-01 00:00:00');
  } else {
    $seasonStartDate = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->format('Y') . '-07-01 00:00:00');
    $seasonEndDate = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->sub(new DateInterval('P1Y'))->format('Y') . '-06-30 00:00:00');
  }

  $assignedSeason = $project->getSeasonByDate($seasonStartDate, $seasonEndDate, $batch);
  $assignedTeams = $project->getTeamsBySeason($assignedSeason);

  foreach ($assignedTeams as $team) {
    echo $team["externalTeamLink"] . "<br />";
    $doc = $project->loadRemoteHTML($team["externalTeamLink"]);
    # $teamPageData = $project->scrapeTeamDetailPage($doc);
    # $project->updateTeam($team["id"], $teamPageData, $batch);
    $i++;
  }

  tk_print_counts();
  $batch->commit();

  echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
  echo $project->generateFooter();

} catch (Exception $e) {
  echo($e->getMessage());
}
