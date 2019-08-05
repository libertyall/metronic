<?php

trait sfwCategory
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $categoryCollection = null;
  private $categories = array();

    /**
     * @param $title string
     * @param $categoryType array
     * @param $batch \Google\Cloud\Firestore\WriteBatch
     * @return array
     */
  public function getCategoryByTitleAndCategoryType($title, $categoryType, $batch)
  {

    if($title === 'Ü32 Senioren'){
      $title = 'Altherren-A Ü32';
    }

    var_dump($categoryType);

    $query = $this->categoryCollection
      ->where('title', '=', $title)
      ->where('assignedCategoryType', '=', $categoryType);
    $snapshot = $query->documents();

    if ($snapshot->isEmpty()) {
      return $this->saveFireStoreObject(
        $this->categoryCollection,
        array(
          'title' => $title,
          'assignedCategoryType' => $categoryType ? $categoryType : ''
        ),
        $batch);
    }

    // return first category with that title
    if ($snapshot->size() === 1) {
      foreach ($snapshot as $doc) {
        return array(
          'id' => $doc["id"],
          'title' => $doc["title"],
          'assignedCategoryType' => $doc["assignedCategoryType"],
          'alreadySaved'=> true
        );
      }
    }
  }

  public function getCategoryList()
  {
    $categoryList = [];
    foreach ($this->categoryCollection->documents() as $doc) {
      $categoryList[$doc["title"]] =
        array(
          'id' => $doc['id'],
          'assignedCategoryType' => $doc["assignedCategoryType"],
          'title' => $doc['title']
        );
    }
    return $categoryList;
  }

}
