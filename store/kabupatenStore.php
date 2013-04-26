<?php

    include "../php/mysql.db.php";
    $db = new koneksi();

    include "../php/initial.php";
    $conn = $db->connect();

    $page   = strlen($_POST["page"])==0?"":$_POST["page"];
    $start  = strlen($_POST["start"])==0?"":$_POST["start"];
    $end    = strlen($_POST["limit"])==0?"":$_POST["limit"];
    $propinsi_id = strlen($_POST["propinsi_id"])==0?"0":$_POST["propinsi_id"];
    
    $search  = !isset($_POST["query"])?"":$_POST["query"];
    $initVal = !isset($_POST["initVal"])?"":$_POST["initVal"];

    $sql = "SELECT COUNT(DISTINCT(ID)) AS TOTAL FROM tbl_jne_kabupaten WHERE 1 AND " .
           (strlen($initVal)>0?"ID='$initVal' ":"ID_PROPINSI='$propinsi_id'") .
           (strlen($search)>0?(" AND KABUPATEN LIKE '%$search%'"):"");
    $db->query($sql, $rec_num, $rs);
    $totalCount = $rs[0]["TOTAL"];

    if($totalCount>0) {
        $sql = "SELECT ID, KABUPATEN FROM tbl_jne_kabupaten WHERE 1 AND " .
               (strlen($initVal)>0?"ID='$initVal' ":"ID_PROPINSI='$propinsi_id' ") .
               (strlen($search)>0?("AND KABUPATEN LIKE '%$search%' "):"")  .
               "ORDER BY ID LIMIT $start, $end";
        $db->query($sql, $rec_num, $rs);
        $topics = $rs;

    }
    $db->close($conn);
    
    $result = array(
        "totalCount" => $totalCount ,
        "topics"    => $totalCount>0?$topics:""
    );

    include "../php/Json.php";
    $json = new Json();

    die($json->encode($result));

?>