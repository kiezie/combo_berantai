<?php
    include "../php/mysql.db.php";
    $db = new koneksi();

    include "../php/initial.php";
    $conn = $db->connect();

    $page    = strlen($_POST["page"])==0?"":$_POST["page"];
    $start   = strlen($_POST["start"])==0?"":$_POST["start"];
    $end     = strlen($_POST["limit"])==0?"":$_POST["limit"];
    $search  = !isset($_POST["query"])?"":$_POST["query"];
    $initVal = !isset($_POST["initVal"])?"":$_POST["initVal"];

    $sql = "SELECT COUNT(DISTINCT(ID)) AS TOTAL FROM tbl_jne_propinsi WHERE 1" .
           (strlen($initVal)>0?" AND ID='$initVal' ":"") .
           (strlen($search)>0?(" AND PROPINSI LIKE '%$search%'"):"");
    $db->query($sql, $rec_num, $rs);
    $totalCount = $rs[0]["TOTAL"];
    
    if($totalCount>0) {
        $sql = "SELECT ID, PROPINSI FROM tbl_jne_propinsi WHERE 1 " .
               (strlen($initVal)>0?"AND ID='$initVal' ":"") .
               (strlen($search)>0?("AND PROPINSI LIKE '%$search%' "):"")  .
               "ORDER BY ID LIMIT $start, $end";
        $db->query($sql, $rec_num, $rs);
        $topics = isset($rs)?$rs:"";

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