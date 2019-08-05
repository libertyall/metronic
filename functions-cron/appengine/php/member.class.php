<?php

trait sfwMember
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $memberCollection = null;

  public function getMemberById($memberId)
  {
    return $this->memberCollection->document($memberId);
  }

  public function getMembers($club)
  {
    $memberList = array();
    if ($club) {
      foreach ($this->memberCollection->where('assignedClub', '=', $club["id"])->documents() as $doc) {
        $memberList[$doc["mainData"]["lastName"] . '-' . $doc["mainData"]["firstName"] . '-' . $doc["mainData"]['birthday']['year'] . '-' . $doc["mainData"]['birthday']['month'] . '-' . $doc["mainData"]['birthday']['day']] = array(
          'id' => $doc["id"],
          'firstName' => $doc["mainData"]["firstName"],
          'lastName' => $doc["mainData"]["lastName"],
          'birthday' => array(
            'year' => $doc["mainData"]['birthday']["year"],
            'month' => $doc["mainData"]['birthday']["month"],
            'day' => $doc["mainData"]['birthday']["day"],
          ),
          'doc' => $doc
        );
      }
    } else {
      foreach ($this->memberCollection->documents() as $doc) {
        $memberList[$doc["mainData"]["lastName"] . '-' . $doc["mainData"]["firstName"] . '-' . $doc["mainData"]['birthday']['year'] . '-' . $doc["mainData"]['birthday']['month'] . '-' . $doc["mainData"]['birthday']['day']] = $doc["id"];
      }
    }
    return $memberList;
  }

  public function generateDriveMemberTableHeader()
  {
    $returnString = '';
    $returnString .= '<table class="table table-striped table-bordered table-hover table-sm">';
    $returnString .= '<thead class="thead-light">';
    $returnString .= '<tr>';
    $returnString .= '<th>Anrede</th>';
    $returnString .= '<th>Name</th>';
    $returnString .= '<th>Vorname</th>';
    $returnString .= '<th>Straße</th>';
    $returnString .= '<th>Haus-Nr.</th>';
    $returnString .= '<th>PLZ</th>';
    $returnString .= '<th>Ort</th>';
    $returnString .= '<th>Titel</th>';
    $returnString .= '<th>Verein-Status</th>';
    $returnString .= '<th>Verein-Eintritt</th>';
    $returnString .= '<th>Verein-Austritt</th>';
    $returnString .= '<th>Verein-Beitrag</th>';
    $returnString .= '<th>AH-Status</th>';
    $returnString .= '<th>AH-Eintritt</th>';
    $returnString .= '<th>AH-Austritt</th>';
    $returnString .= '<th>AH-Beitrag</th>';
    $returnString .= '<th>Festnetz</th>';
    $returnString .= '<th>Handy</th>';
    $returnString .= '<th>E-Mail</th>';
    $returnString .= '<th>Geburtsdatum</th>';
    $returnString .= '<th>Funktionär</th>';
    $returnString .= '<th>Bemerkung</th>';
    $returnString .= '<th>bereits <br />vorhanden?</th>';
    $returnString .= '<th>Aktualisiert?</th>';
    $returnString .= '</tr>';
    $returnString .= '</thead>';
    $returnString .= '<tbody>';
    return $returnString;
  }

  public function generateDFBMemberTableHeader()
  {
    $returnString = '';
    $returnString .= '<table class="table table-striped table-bordered table-hover table-sm">';
    $returnString .= '<thead class="thead-light">';
    $returnString .= '<tr>';
    $returnString .= '<th>Passnr.</th>';
    $returnString .= '<th>Name</th>';
    $returnString .= '<th>Vorname</th>';
    $returnString .= '<th>Altersklasse</th>';
    $returnString .= '<th>Geburtsdatum</th>';
    $returnString .= '<th>Spielrecht Pflicht / Verband</th>';
    $returnString .= '<th>Spielrecht Freundschaft / Privat</th>';
    $returnString .= '<th>Abmeldung</th>';
    $returnString .= '<th>Spielerstatus</th>';
    $returnString .= '<th>Gast/Zweitspielrecht</th>';
    $returnString .= '<th>Spielzeit</th>';
    $returnString .= '<th>Spielart</th>';
    $returnString .= '<th>Passdruck</th>';
    $returnString .= '<th>Einsetzbar</th>';
    $returnString .= '<th>Stammverein</th>';
    $returnString .= '<th>bereits <br />vorhanden?</th>';
    $returnString .= '<th>Aktualisiert?</th>';
    $returnString .= '</tr>';
    $returnString .= '</thead>';
    $returnString .= '<tbody>';
    return $returnString;
  }

  public function generateDFBMemberRow($member, $club, $saveStatus)
  {
    $returnString = '';
    $returnString .= '<tr>';
    $returnString .= '<td>' . $member[0] . '</td>';
    $returnString .= '<td>' . $member[1] . '</td>';
    $returnString .= '<td>' . $member[2] . '</td>';
    $returnString .= '<td>' . $member[3] . '</td>';
    $returnString .= '<td>' . $this->getGermanDate($member[4]) . '</td>';
    $returnString .= '<td>' . $this->getGermanDate($member[5]) . '</td>';
    $returnString .= '<td>' . $this->getGermanDate($member[6]) . '</td>';
    $returnString .= '<td>' . $member[7] . '</td>';
    $returnString .= '<td>' . $member[8] . '</td>';
    $returnString .= '<td>' . $this->getGermanDate($member[9]) . '</td>';
    $returnString .= '<td>' . $member[10] . '</td>';
    $returnString .= '<td>' . $member[11] . '</td>';
    $returnString .= '<td>' . $this->getGermanDate($member[12]) . '</td>';
    $returnString .= '<td>' . $member[13] . '</td>';
    if (isset($member[14])) {
      $returnString .= '<td>' . $member[14] . '</td>';
    } else {
      $returnString .= '<td>' . $club["title"] . '</td>';
    }
    $returnString .= '<td>';
    $returnString .= $this->generateExistingFlag($saveStatus["newEntry"]);
    $returnString .= '</td>';
    $returnString .= '<td>';
    $returnString .= $this->generateUpdateFlag($saveStatus["updateStatus"]);
    $returnString .= '</td>';
    $returnString .= '</tr>';
    return $returnString;
  }

  public function generateDriveMemberRow($member, $saveStatus)
  {
    $returnString = '';
    $returnString .= '<tr>';
    $returnString .= '<td>' . $member[0] . '</td>';
    $returnString .= '<td>' . $member[1] . '</td>';
    $returnString .= '<td>' . $member[2] . '</td>';
    $returnString .= '<td>' . $member[3] . '</td>';
    $returnString .= '<td>' . $member[4] . '</td>';
    $returnString .= '<td>' . $member[5] . '</td>';
    $returnString .= '<td>' . $member[6] . '</td>';
    $returnString .= '<td>' . $member[7] . '</td>';
    $returnString .= '<td>' . $member[8] . '</td>';
    $returnString .= '<td>' . $member[9] . '</td>';
    $returnString .= '<td>' . $member[10] . '</td>';
    $returnString .= '<td>' . $member[11] . '</td>';
    $returnString .= '<td>' . $member[12] . '</td>';
    if (isset($member[13])) {
      $returnString .= '<td>' . $member[13] . '</td>';
    } else {
      $returnString .= '<td>&nbsp;</td>';
    }
    if (isset($member[14])) {
      $returnString .= '<td>' . $member[14] . '</td>';
    } else {
      $returnString .= '<td>&nbsp;</td>';
    }
    if (isset($member[15])) {
      $returnString .= '<td>' . $member[15] . '</td>';
    } else {
      $returnString .= '<td>&nbsp;</td>';
    }
    if (isset($member[16])) {
      $returnString .= '<td>' . $member[16] . '</td>';
    } else {
      $returnString .= '<td>&nbsp;</td>';
    }
    if (isset($member[17])) {
      $returnString .= '<td>' . $member[17] . '</td>';
    } else {
      $returnString .= '<td>&nbsp;</td>';
    }
    if (isset($member[18])) {
      $returnString .= '<td>' . $member[18] . '</td>';
    } else {
      $returnString .= '<td>&nbsp;</td>';
    }
    if (isset($member[19])) {
      $returnString .= '<td>' . $member[19] . '</td>';
    } else {
      $returnString .= '<td><span style="color: red">KEIN GEBURTSTAG</span></td>';
    }
    if (isset($member[20])) {
      $returnString .= '<td>' . $member[20] . '</td>';
    } else {
      $returnString .= '<td>-</td>';
    }
    if (isset($member[21])) {
      $returnString .= '<td>' . $member[21] . '</td>';
    } else {
      $returnString .= '<td>-</td>';
    }
    $returnString .= '<td>';
    $returnString .= $this->generateExistingFlag($saveStatus["newEntry"]);
    $returnString .= '</td>';

    $returnString .= '<td>';
    $returnString .= $this->generateUpdateFlag($saveStatus["updateStatus"]);
    $returnString .= '</td>';

    $returnString .= '</tr>';
    return $returnString;
  }

  public function generateUpdateFlag($update)
  {
    if ($update) {
      return '<span style="color: green">&#10004;</span>';
    }
    return '<span style="color: red">-</span>';
  }

  public function generateExistingFlag($existing)
  {
    if (!$existing) {
      return '<span style="color: green">&#10004;</span>';
    }
    return '<span style="color: red">-</span>';
  }

  public function getGermanDate($date)
  {
    $date = DateTime::createFromFormat('d.m.Y', $date);
    if ($date)
      return $date->format('d.m.Y');
    return false;
  }

  public function generateMemberTableFooter()
  {
    $returnString = '';
    $returnString .= '</tbody>';
    $returnString .= '</table>';
    return $returnString;
  }


  public function saveDriveMember($member, $club, $memberList, $batch)
  {
    $birthday = false;
    if (isset($member[19])) {
      $birthday = DateTime::createFromFormat('d.m.Y', $member[19]);
    }

    if ($birthday) {
      $id = $member[1] . "-" . $member[2] . "-" . $birthday->format('Y-m-d');
    } else {
      $id = $member[1] . "-" . $member[2];
    }

    $clubJoined = '';
    if (isset($member[9])) {
      $clubJoinedDateTime = DateTime::createFromFormat('d.m.Y', $member[9]);
      $clubJoined = $clubJoinedDateTime ? $clubJoinedDateTime->format('Y-m-d') : '';
    }

    $ahJoined = '';
    if (isset($member[13])) {
      $ahJoinedDateTime = DateTime::createFromFormat('d.m.Y', $member[13]);
      $ahJoined = $ahJoinedDateTime ? $ahJoinedDateTime->format('Y-m-d') : '';
    }

    $data = array(
      "driveImport" => true,
      "assignedClub" => $club["id"],
      "ahStatus" => (int)$member[12],
      "clubStatus" => (int)$member[8],
      "clubData" => array(
        "joined" => $clubJoined,
        "left" => $member[10],
        "payment" => $member[11],
        "positionsInClub" => isset($member[20]) && $member[20] && count($member) > 19 ? $member[20] : '',
      ),
      "mainData" => array(
        "gender" => $member[0] === 'Frau' ? 'female' : 'male',
        "firstName" => $member[2],
        "lastName" => $member[1],
        "title" => $member[7],
        "birthday" => array(
          "year" => $birthday->format('Y'),
          "month" => $birthday->format('m'),
          "day" => $birthday->format('d'),
          "monthDay" => $birthday->format('m-d'),
          "full" => $birthday->format('Y-m-d')
        )
      ),
      "address" => array(
        "streetName" => $member[3],
        "houseNumber" => $member[4],
        "zip" => $member[5],
        "city" => $member[6],
      ),
      "ahData" => array(
        "joined" => $ahJoined,
        "left" => $member[14],
        "payment" => $member[15],
      ),
      "contact" => array(
        "phoneHome" => $member[16],
        "phoneMobile" => $member[17],
        "email" => $member[18]
      ),

    );

    if (!key_exists($id, $memberList)) {
        return array(
        'data' => $this->saveFireStoreObject($this->memberCollection, $data, $batch),
        'newEntry' => true,
        'updateStatus' => false
      );
    } else {

      if (!isset($memberList[$id]['doc']['driveImport']) && isset($data['driveImport'])
        || isset($memberList[$id]['doc']['driveImport']) && !isset($data['driveImport'])
        || $memberList[$id]['doc']['driveImport'] !== $data['driveImport']

        || !isset($memberList[$id]['doc']['clubStatus']) && isset($data['clubStatus'])
        || isset($memberList[$id]['doc']['clubStatus']) && !isset($data['clubStatus'])

        || !isset($memberList[$id]['doc']['ahStatus']) && isset($data['ahStatus'])
        || isset($memberList[$id]['doc']['ahStatus']) && !isset($data['ahStatus'])

        || !isset($memberList[$id]['doc']['clubData']) && isset($data['clubData'])
        || isset($memberList[$id]['doc']['clubData']) && !isset($data['clubData'])

        || !isset($memberList[$id]['doc']['assignedClub']) && isset($data['assignedClub'])
        || isset($memberList[$id]['doc']['assignedClub']) && !isset($data['assignedClub'])

        || $memberList[$id]['doc']['clubData']['joined'] !== $data['clubData']['joined']
        || $memberList[$id]['doc']['clubData']['left'] !== $data['clubData']['left']
        || $memberList[$id]['doc']['clubData']['payment'] !== $data['clubData']['payment']
        || $memberList[$id]['doc']['clubData']['positionsInClub'] !== $data['clubData']['positionsInClub']

        || $memberList[$id]['doc']['mainData']['gender'] !== $data['mainData']['gender']
        || $memberList[$id]['doc']['mainData']['firstName'] !== $data['mainData']['firstName']
        || $memberList[$id]['doc']['mainData']['lastName'] !== $data['mainData']['lastName']
        || $memberList[$id]['doc']['mainData']['birthday']['year'] !== $data['mainData']['birthday']['year']
        || $memberList[$id]['doc']['mainData']['birthday']['month'] !== $data['mainData']['birthday']['month']
        || $memberList[$id]['doc']['mainData']['birthday']['day'] !== $data['mainData']['birthday']['day']
        || $memberList[$id]['doc']['mainData']['birthday']['monthDay'] !== $data['mainData']['birthday']['monthDay']
        || $memberList[$id]['doc']['mainData']['birthday']['full'] !== $data['mainData']['birthday']['full']
        || $memberList[$id]['doc']['mainData']['title'] !== $data['mainData']['title']

        || !isset($memberList[$id]['doc']['address']) && isset($data['address'])
        || isset($memberList[$id]['doc']['address']) && !isset($data['address'])

        || $memberList[$id]['doc']['address']['streetName'] !== $data['address']['streetName']
        || $memberList[$id]['doc']['address']['houseNumber'] !== $data['address']['houseNumber']
        || $memberList[$id]['doc']['address']['zip'] !== $data['address']['zip']
        || $memberList[$id]['doc']['address']['city'] !== $data['address']['city']

        || !isset($memberList[$id]['doc']['ahData']) && isset($data['ahData'])
        || isset($memberList[$id]['doc']['ahData']) && !isset($data['ahData'])

        || $memberList[$id]['doc']['ahData']['joined'] !== $data['ahData']['joined']
        || $memberList[$id]['doc']['ahData']['left'] !== $data['ahData']['left']
        || $memberList[$id]['doc']['ahData']['payment'] !== $data['ahData']['payment']

        || !isset($memberList[$id]['doc']['contact']) && isset($data['contact'])
        || isset($memberList[$id]['doc']['contact']) && !isset($data['contact'])

        || $memberList[$id]['doc']['contact']['phoneHome'] !== $data['contact']['phoneHome']
        || $memberList[$id]['doc']['contact']['phoneMobile'] !== $data['contact']['phoneMobile']
        || $memberList[$id]['doc']['contact']['email'] !== $data['contact']['email']
      ) {
        return array(
          'data' => $this->updateFireStoreDriveMember('members', $memberList[$id]["id"], $data, $batch),
          'newEntry' => false,
          'updateStatus' => true
        );
      } else {
        return array(
          'data' => $data,
          'newEntry' => false,
          'updateStatus' => false
        );
      }

    }
  }

  public function saveDFBMember($member, $club, $memberList, $batch)
  {
    $birthday = DateTime::createFromFormat('d.m.Y', $member[4]);
    $official = DateTime::createFromFormat('d.m.Y', $member[5]) ? DateTime::createFromFormat('d.m.Y', $member[5])->format('Y-m-d') : '';
    $friendly = DateTime::createFromFormat('d.m.Y', $member[6]) ? DateTime::createFromFormat('d.m.Y', $member[6])->format('Y-m-d') : '';
    $guestRight = DateTime::createFromFormat('d.m.Y', $member[9]) ? DateTime::createFromFormat('d.m.Y', $member[9])->format('Y-m-d') : '';
    $passPrint = DateTime::createFromFormat('d.m.Y', $member[12]) ? DateTime::createFromFormat('d.m.Y', $member[12])->format('Y-m-d') : '';
    $signOut = DateTime::createFromFormat('d.m.Y', $member[7]) ? DateTime::createFromFormat('d.m.Y', $member[7])->format('Y-m-d') : '';

    if($birthday){
    $id = $member[1] . "-" . $member[2] . "-" . $birthday->format('Y-m-d');

    $data = array(
      "dfbImport" => true,
      "assignedClub" => $club["id"],
      "mainData" => array(
        "gender" => strpos($member[3], 'innen') > -1 ? 'female' : 'male',
        "firstName" => $member[2],
        "lastName" => $member[1],
        "birthday" => array(
          "year" => $birthday->format('Y'),
          "month" => $birthday->format('m'),
          "day" => $birthday->format('d'),
          "monthDay" => $birthday->format('m-d'),
          "full" => $birthday->format('Y-m-d')
        )
      ),
      "dfbData" => array(
        "passNumber" => $member[0],
        "ageGroup" => $member[3],
        "eligibleForOfficialMatches" => $official,
        "eligibleForFriendlyMatches" => $friendly,
        "signOut" => $signOut,
        "playerStatus" => $member[8],
        "guestPlayer" => array(
          "guestRight" => $guestRight,
          "season" => $member[10],
          "type" => $member[11],
        ),
        "passPrint" => $passPrint,
        "allowedToPlay" => $member[13]
      )

    );

    if (!key_exists($id, $memberList)) {
      return array(
        'data' => $this->saveFireStoreObject($this->memberCollection, $data, $batch),
        'newEntry' => true,
        'updateStatus' => false
      );
    } else {

      if (!isset($memberList[$id]['doc']['dfbImport']) && isset($data['dfbImport'])
        || isset($memberList[$id]['doc']['dfbImport']) && !isset($data['dfbImport'])

        || $memberList[$id]['doc']['dfbImport'] !== $data['dfbImport']

        || !isset($memberList[$id]['doc']['clubData']) && isset($data['clubData'])
        || isset($memberList[$id]['doc']['clubData']) && !isset($data['clubData'])

        || !isset($memberList[$id]['doc']['assignedClub']) && isset($data['assignedClub'])
        || isset($memberList[$id]['doc']['assignedClub']) && !isset($data['assignedClub'])

        || $memberList[$id]['doc']['mainData']['gender'] !== $data['mainData']['gender']
        || $memberList[$id]['doc']['mainData']['firstName'] !== $data['mainData']['firstName']
        || $memberList[$id]['doc']['mainData']['lastName'] !== $data['mainData']['lastName']
        || $memberList[$id]['doc']['mainData']['birthday']['year'] !== $data['mainData']['birthday']['year']
        || $memberList[$id]['doc']['mainData']['birthday']['month'] !== $data['mainData']['birthday']['month']
        || $memberList[$id]['doc']['mainData']['birthday']['day'] !== $data['mainData']['birthday']['day']
        || $memberList[$id]['doc']['mainData']['birthday']['monthDay'] !== $data['mainData']['birthday']['monthDay']
        || $memberList[$id]['doc']['mainData']['birthday']['full'] !== $data['mainData']['birthday']['full']

        || !isset($memberList[$id]['doc']['dfbData']) && isset($data['dfbData'])
        || isset($memberList[$id]['doc']['dfbData']) && !isset($data['dfbData'])

        || $memberList[$id]['doc']['dfbData']['passNumber'] !== $data['dfbData']['passNumber']
        || $memberList[$id]['doc']['dfbData']['ageGroup'] !== $data['dfbData']['ageGroup']
        || $memberList[$id]['doc']['dfbData']['eligibleForOfficialMatches'] !== $data['dfbData']['eligibleForOfficialMatches']
        || $memberList[$id]['doc']['dfbData']['eligibleForFriendlyMatches'] !== $data['dfbData']['eligibleForFriendlyMatches']
        || $memberList[$id]['doc']['dfbData']['signOut'] !== $data['dfbData']['signOut']
        || $memberList[$id]['doc']['dfbData']['playerStatus'] !== $data['dfbData']['playerStatus']
        || $memberList[$id]['doc']['dfbData']['passPrint'] !== $data['dfbData']['passPrint']
        || $memberList[$id]['doc']['dfbData']['allowedToPlay'] !== $data['dfbData']['allowedToPlay']

        || !isset($memberList[$id]['doc']['dfbData']['guestPlayer']) && isset($data['dfbData']['guestPlayer'])
        || isset($memberList[$id]['doc']['dfbData']['guestPlayer']) && !isset($data['dfbData']['guestPlayer'])

        || $memberList[$id]['doc']['dfbData']['guestPlayer']['guestRight'] !== $data['dfbData']['guestPlayer']['guestRight']
        || $memberList[$id]['doc']['dfbData']['guestPlayer']['season'] !== $data['dfbData']['guestPlayer']['season']
        || $memberList[$id]['doc']['dfbData']['guestPlayer']['type'] !== $data['dfbData']['guestPlayer']['type']
      ) {
        return array(
          'data' => $this->updateFireStoreDFBMember('members', $memberList[$id]["id"], $data, $batch),
          'newEntry' => false,
          'updateStatus' => true
        );
      } else {
        return array(
          'data' => $data,
          'newEntry' => false,
          'updateStatus' => false
        );
      }
    }
    }
  }

  /**
   * @param $collectionName string
   * @param $memberId string
   * @param $member array
   * @param $batch Google\Cloud\Firestore\WriteBatch
   * @return mixed
   */
  public function updateFireStoreDriveMember($collectionName, $memberId, $member, $batch)
  {

    $toUpdate = [
      ['path' => 'mainData.gender', 'value' => $member['mainData']['gender']],
      ['path' => 'mainData.firstName', 'value' => $member['mainData']['firstName']],
      ['path' => 'mainData.lastName', 'value' => $member['mainData']['lastName']],
      ['path' => 'mainData.birthday.year', 'value' => $member['mainData']['birthday']['year']],
      ['path' => 'mainData.birthday.month', 'value' => $member['mainData']['birthday']['month']],
      ['path' => 'mainData.birthday.day', 'value' => $member['mainData']['birthday']['day']],
      ['path' => 'mainData.birthday.monthDay', 'value' => $member['mainData']['birthday']['monthDay']],
      ['path' => 'mainData.birthday.full', 'value' => $member['mainData']['birthday']['full']],
      ['path' => 'mainData.title', 'value' => $member['mainData']['title']],

      ['path' => 'driveImport', 'value' => true],

      ['path' => 'assignedClub', 'value' => $member['assignedClub']],
      ['path' => 'ahStatus', 'value' => $member['ahStatus']],
      ['path' => 'clubStatus', 'value' => $member['clubStatus']],

      ['path' => 'clubData.joined', 'value' => $member['clubData']['joined']],
      ['path' => 'clubData.left', 'value' => $member['clubData']['left']],
      ['path' => 'clubData.payment', 'value' => $member['clubData']['payment']],
      ['path' => 'clubData.positionsInClub', 'value' => $member['clubData']['positionsInClub']],

      ['path' => 'ahData.joined', 'value' => $member['ahData']['joined']],
      ['path' => 'ahData.left', 'value' => $member['ahData']['left']],
      ['path' => 'ahData.payment', 'value' => $member['ahData']['payment']],

      ['path' => 'address.streetName', 'value' => $member['address']['streetName']],
      ['path' => 'address.houseNumber', 'value' => $member['address']['houseNumber']],
      ['path' => 'address.zip', 'value' => $member['address']['zip']],
      ['path' => 'address.city', 'value' => $member['address']['city']],

      ['path' => 'contact.phoneHome', 'value' => $member['contact']['phoneHome']],
      ['path' => 'contact.phoneMobile', 'value' => $member['contact']['phoneMobile']],
      ['path' => 'contact.email', 'value' => $member['contact']['email']],
    ];

    if ($batch) {
      $memberRef = $this->db->collection($collectionName)->document($memberId);
      $batch->update($memberRef, $toUpdate);
    } else {
      echo "NORMALES UPDATE NICHT IMPLEMENTIERT";
      exit();
    }

    return $member;
  }

  /**
   * @param $collectionName string
   * @param $memberId string
   * @param $member array
   * @param $batch Google\Cloud\Firestore\WriteBatch
   * @return mixed
   */
  public function updateFireStoreDFBMember($collectionName, $memberId, $member, $batch)
  {
    $toUpdate = [
      ['path' => 'mainData.gender', 'value' => $member['mainData']['gender']],
      ['path' => 'mainData.firstName', 'value' => $member['mainData']['firstName']],
      ['path' => 'mainData.lastName', 'value' => $member['mainData']['lastName']],

      ['path' => 'mainData.birthday.year', 'value' => $member['mainData']['birthday']['year']],
      ['path' => 'mainData.birthday.month', 'value' => $member['mainData']['birthday']['month']],
      ['path' => 'mainData.birthday.day', 'value' => $member['mainData']['birthday']['day']],
      ['path' => 'mainData.birthday.monthDay', 'value' => $member['mainData']['birthday']['monthDay']],
      ['path' => 'mainData.birthday.full', 'value' => $member['mainData']['birthday']['full']],

      ['path' => 'dfbImport', 'value' => true],
      ['path' => 'assignedClub', 'value' => $member['assignedClub']],

      ['path' => 'dfbData.passNumber', 'value' => $member['dfbData']['passNumber']],
      ['path' => 'dfbData.ageGroup', 'value' => $member['dfbData']['ageGroup']],
      ['path' => 'dfbData.eligibleForOfficialMatches', 'value' => $member['dfbData']['eligibleForOfficialMatches']],
      ['path' => 'dfbData.eligibleForFriendlyMatches', 'value' => $member['dfbData']['eligibleForFriendlyMatches']],
      ['path' => 'dfbData.signOut', 'value' => $member['dfbData']['signOut']],
      ['path' => 'dfbData.playerStatus', 'value' => $member['dfbData']['playerStatus']],
      ['path' => 'dfbData.guestPlayer.guestRight', 'value' => $member['dfbData']['guestPlayer']['guestRight']],
      ['path' => 'dfbData.guestPlayer.season', 'value' => $member['dfbData']['guestPlayer']['season']],
      ['path' => 'dfbData.guestPlayer.type', 'value' => $member['dfbData']['guestPlayer']['type']],
      ['path' => 'dfbData.passPrint', 'value' => $member['dfbData']['passPrint']],
      ['path' => 'dfbData.allowedToPlay', 'value' => $member['dfbData']['allowedToPlay']],
    ];

    if ($batch) {
      $memberRef = $this->db->collection($collectionName)->document($memberId);
      $batch->update($memberRef, $toUpdate);
    } else {
      echo "NORMALES UPDATE NICHT IMPLEMENTIERT";
      exit();
    }

    return $member;
  }

  public function getAge($birthday)
  {
    return DateTime::createFromFormat('Y-m-d', $birthday, new DateTimeZone(date_default_timezone_get()))
      ->diff(new DateTime('now', new DateTimeZone(date_default_timezone_get())))
      ->y;
  }

}
