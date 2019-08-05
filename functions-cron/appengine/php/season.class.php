<?php

trait sfwSeason
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $seasonCollection = null;
    private $seasons = array();

    /**
     * @param $seasonStartYear DateTimeImmutable
     * @param $seasonEndYear DateTimeImmutable
     * @param $batch \Google\Cloud\Firestore\WriteBatch
     * @return array
     */
    public function getSeasonByDate($seasonStartYear, $seasonEndYear, $batch)
    {
        $title = 'Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y');
        $query = $this->seasonCollection->where('title', '=', $title);
        $snapshot = $query->documents();

        if ($snapshot->isEmpty()) {
            return $this->saveFireStoreObject(
                $this->seasonCollection,
                array(
                    'title' => $title,
                    'description' => 'Alle Informationen zur ' . $title
                ),
                $batch);
        }

        if ($snapshot->size() === 1) {
            foreach ($snapshot as $doc) {
                return array(
                    'id' => $doc["id"],
                    'title' => $doc["title"]
                );
            }
        }
    }

    /**
     * @param $season
     * @return string
     */
    public function generateSeasonHeading($season)
    {
        /**
         * @var $startDate DateTime
         * @var $endDate DateTime
         */
        $startDate = $this->getSeasonStartDate($season);
        $endDate = $this->getSeasonEndDate($season);
        return "<h4>Spielplan&nbsp; <small>" . $startDate->format('d.m.Y') . " &ndash; " . $endDate->format('d.m.Y') . "</small></h4>";
    }

    /**
     * @param $season DateTime
     * @return DateTimeImmutable
     */
    public function getSeasonStartDate($season)
    {
        return DateTimeImmutable::createFromFormat('Y-m-d H:i:s', '01.07.' . $season->format('Y') . ' 00:00:00');
    }

    /**
     * @param $season DateTime
     * @return DateTimeImmutable
     */
    public function getSeasonEndDate($season)
    {
        return DateTimeImmutable::createFromFormat('d.m.Y H:i:s', '30.06.' . $season->format('Y') . ' 23:59:59')->modify('+1 year');
    }

    /**
     * @param $dateString
     * @return array
     */
    public function getSeasonNameFromShortDate($dateString)
    {
        $parts = explode('/', $dateString);
        return array(
            'startDate' => DateTime::createFromFormat('d.m.y H:i:s', '01.07.' . $parts[0] . ' 00:00:00'),
            'endDate' => DateTime::createFromFormat('d.m.y H:i:s', '30.06.' . $parts[1] . ' 23:59:59')
        );
    }

}
