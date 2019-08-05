<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');
header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";
require_once "../utils.global.php"; # by emre isik

if (!strpos(gethostname(), 'appspot.com')) {
    putenv('GOOGLE_APPLICATION_CREDENTIALS=../../client_secret.json');
}

$project = new sfwApp('sportfreunde-winterbach', array('calendarService'));
$time_start = microtime(true);

echo $project->generateHeader();

echo "<h1>Exportiere den Spielplan in den Google-Kalender</h1>";

try {

    // set batch
    $firestoreBatch = $project->db->batch();
    // $batch = $project->db->batch();

    // set application
    $app = $project->getCurrentApplication($firestoreBatch);

    // set club
    $project->getClubByTitle($project->defaultClub, $firestoreBatch);

    $seasonStart = isset($_GET['jahr']) ? DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $_GET['jahr'] . '-07-01 00:00:00') : new DateTimeImmutable();

    // falls ein Jahr übergeben wurde wird die komplette Saison als Start- und Ende gesetzt,
    // ansonsten die nächsten 4 Monate ab heute
    $loadingLimit = null;
    if (isset($_GET['jahr'])) {
        // $seasonStart = $project->getSeasonStartDate($jahr);
        // $seasonStartClone = clone($seasonStart);
        // $loadingLimit = $seasonStartClone->modify('+1 year')->modify('-1 day');
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

    $savedMatches = array();
    $calendarEvents = array();
    $locations = $project->getLocationList();

    foreach ($app["assignedCalendars"] as $calendar) {
        if ($calendar["title"] === 'Spielplan') {

            if (!isset($_GET['delete'])) {
                $matches = $project->getMatchesBetweenStartAndEndDate($seasonStart, $loadingLimit);
                foreach ($matches as $match) {
                    $matchStartDate = $match["matchStartDate"];
                    /**
                     * @var $matchStartDate Google\Cloud\Core\Timestamp
                     */
                    if ($match["assignedLocation"] !== '' && $match["assignedLocation"] !== 0) {
                        $title = $match['title'] . '-' . $project->getLocationById($match["assignedLocation"])["title"] . '-' . $matchStartDate->get()->format('d.m.Y H:i:s');
                        $matchEvent = $project->generateEventItem($match, $project->getLocationById($match["assignedLocation"])["title"]);
                        $savedMatches[$title] = $matchEvent;
                    }
                }
            }

            $googleCalendarEvents = $project->getEvents($calendar["link"], $seasonStart, $loadingLimit);
            if (isset($_GET['delete'])) {
                foreach ($googleCalendarEvents as $key => $event) {
                    $project->calendarService->events->delete($calendar["link"], $event->getId());
                }
                // $result = $batch->execute();
            } else {

                foreach ($googleCalendarEvents as $key => $event) {
                    $startDate = new DateTime($event->getStart()->dateTime);
                    $title = $event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s');
                    if (!array_key_exists($title, $savedMatches)) {
                        echo $title . " gelöscht<br />";
                        $project->calendarService->events->delete($calendar["link"], $event->getId());
                        // $batch->add($request);
                    } else {
                        $calendarEvents[$event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s')] = true;
                        echo $event["summary"] . "<br />";
                    }
                }

                // create event, if it not exists in the gcalEventList
                foreach ($savedMatches as $key => $matchEvent) {
                    if (!array_key_exists($key, $calendarEvents)) {
                        $request = $project->calendarService->events->insert($calendar["link"], $project->setCalendarEvent($matchEvent));
                        // $batch->add($request);
                    }
                }

                // $result = $batch->execute();
            }
        }

    }

    echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
    echo $project->generateFooter();

} catch (Exception $e) {
    echo($e->getMessage());
}
