<?php
// 言語振り分け
$languages = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
$languages = array_reverse($languages);
 
$result = '';
 
foreach ($languages as $language) {
    if(preg_match('/^en/i', $language)){
        $result = 'English';
        header("Location: /en/");
    }elseif (preg_match('/^ja/i', $language)){
        $result = 'Japanese';
        header("Location: /jp/");
    }
}
if($result == '') {
    $result = 'Japanese';
    header("Location: /jp/");
}
?>

<html></html>