<?php
  $type = 'Content-type: application/';
  $type .= (isset($_GET['type']) ? $_GET['type'] : 'xml');
  header($type);
  $url = (isset($_GET['url']) ? $_GET['url'] : null);
  $pointer = fopen($url, 'r');
  $ret = '';
  if ($pointer) {
    while (!feof($pointer)) {
      $ret .= fgets($pointer);
    }
    fclose($pointer);
  }
  echo $ret;
?>
