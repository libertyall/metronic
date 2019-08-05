<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";

require_once "../utils.global.php"; # by emre isik

$project = new sfwApp();

$time_start = microtime(true);

echo $project->generateHeader();
echo "<h1>Importiere den Spielplan von fussball.de</h1>";


try {

  // set batch
  $batch = $project->db->batch();

  $seasonStart = isset($_GET['jahr']) ? DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $_GET['jahr'] . '-07-01 00:00:00') : new DateTimeImmutable();

  // falls ein Jahr übergeben wurde wird die komplette Saison als Start- und Ende gesetzt,
  // ansonsten die nächsten 4 Monate ab heute
  if (isset($_GET['jahr'])) {
    $loadingLimit = $seasonStart->add(new DateInterval('P1Y'))->sub(new DateInterval('P1D'));
    echo "<h3>Lade Daten vom " . $seasonStart->format('d.m.Y') . " bis " . $loadingLimit->format('d.m.Y') . " </h3>";
  } else {
    $ending = $seasonStart->add(new DateInterval('P4M'));
    if($ending->format('m') < 7) {
      $loadingLimit = $ending;
    } else {
      $currentDate = new DateTimeImmutable();
      $loadingLimit = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentDate->add(new DateInterval('P1Y'))->format('Y') . '-06-30 23:59:59');
    }
    echo "<h3>Lade Daten vom " . $seasonStart->format('d.m.Y') . " bis " . $loadingLimit->format('d.m.Y') . " </h3>";
  }

  $currentYear = new DateTimeImmutable();
  if ($seasonStart->format('m') < 7) {
    $seasonEndDate = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->format('Y') . '-06-30 23:59:59');
    $seasonStartDate = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->sub(new DateInterval('P1Y'))->format('Y') . '-07-01 00:00:00');
  } else {
    $seasonStartDate = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->format('Y') . '-07-01 00:00:00');
    $seasonEndDate = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->sub(new DateInterval('P1Y'))->format('Y') . '-06-30 00:00:00');
  }

  // set club
  $club = $project->getClubByTitle($project->defaultClub, $batch);

  // Laden der aktuellen Saison
  $assignedSeason = $project->getSeasonByDate($seasonStartDate, $seasonEndDate, $batch);

  // die Spielplan-URL anhand des Saison-Startes und -Endes ODER des aktuellen Datums und des Limits laden
  $matchPlanUrl = $project->generateMatchPlanUrl($club["fussballde"]["clubId"], $seasonStart, $loadingLimit);
  $doc = $project->loadRemoteHTML($matchPlanUrl);

  if (TK_PRINT_ENABLED) echo '<br><br>' . $matchPlanUrl . '<br><br>';

  $matchPlan = $project->scrapeMatchPlan($doc, $club["title"]);
  echo $project->generateMatchPlanTable($matchPlan);

  $locationCategoryType = $project->getCategoryTypeByLink('location.types', $batch);
  $teamCategoryType = $project->getCategoryTypeByLink('team.types', $batch);

  $categories = $project->getCategoryList();
  $locationList = $project->getLocationList();
  $teamList = $project->getTeamsByClubAndSeason($club, $assignedSeason);
  $matchList = $project->getMatchesBetweenStartAndEndDate($seasonStart, $loadingLimit);

  $i = 0;
  foreach ($matchPlan as $match) {

    if (!key_exists('dontShowThis', $match)) {

      $location = null;

      if (key_exists('assignedLocation', $match)) {
        $locationCategoryName = $match["assignedLocation"]["assignedLocationCategory"];
        if (!key_exists($locationCategoryName, $categories) && $locationCategoryName !== '') {
          $categories[$locationCategoryName] = $project->getCategoryByTitleAndCategoryType($locationCategoryName, $locationCategoryType, $batch);
        }

        $locationCategory = $categories[$match["assignedLocation"]["assignedLocationCategory"]];

        $locationTitle = $match["assignedLocation"]["type"] . " " . $match["assignedLocation"]["address"]["streetName"] . ", " . $match["assignedLocation"]["address"]["city"];
        if (!key_exists($locationTitle, $locationList) && $locationTitle !== ' ,') {
          $locationList[$locationTitle] = $project->getLocationByLocationDataAndCategory($match["assignedLocation"], $locationCategory, $batch);
        }
        $location = $locationList[$locationTitle];
      }

      // Mannschaftskategorien
      $teamCategoryName = $match["assignedCategories"]["assignedCategory"];
      if (!key_exists($teamCategoryName, $categories)) {
        $categories[$teamCategoryName] = $project->getCategoryByTitleAndCategoryType($match["assignedCategories"]["assignedCategory"], $teamCategoryType, $batch);
      }
      $teamCategory = $categories[$teamCategoryName];

      $teamMainCategoryName = $match["assignedCategories"]["assignedMainCategory"];
      if (!key_exists($teamMainCategoryName, $categories)) {
        $categories[$teamMainCategoryName] = $project->getCategoryByTitleAndCategoryType($match["assignedCategories"]["assignedMainCategory"], $teamCategoryType, $batch);
      }
      $teamMainCategory = $categories[$teamMainCategoryName];

      // Dazugehörige Mannschaft
      $assignedTeam = $match["isHomeTeam"] ? $match["homeTeam"] : $match["guestTeam"];
      $teamName = $teamCategory["title"] . "-" . $assignedTeam["title"];
      if (!key_exists($teamName, $teamList)) {
        $teamList[$teamName] = $project->getTeamByTeamData($assignedTeam, $assignedSeason, $club, $teamCategory, $teamMainCategory, $batch);
      }
      $team = $teamList[$teamName];

      // save Match
      $matchName = $match['assignedCategories']["assignedCategory"] . ': ' . $match['homeTeam']['title'] . ' – ' . $match['guestTeam']['title'] . "-" . $match["matchLink"];
      if (!key_exists($matchName, $matchList) && array_key_exists("assignedLocation", $match)) {
        $matchList[$matchName] = $project->saveMatch($match, $team, $location, $teamCategory, $teamMainCategory, $batch);
      } // else {
      // no assignedLocation => matchDate has changed or is canceled => so check if match exists in db and delete it
      // toDo: Delete canceled matches
      // }

      $i++;
    }
  }

  tk_print_counts();
  $batch->commit();

  echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
  echo $project->generateFooter();

} catch (Exception $e) {
  echo($e->getMessage());
}
