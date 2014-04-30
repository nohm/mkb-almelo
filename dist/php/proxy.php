<?php
  header('Content-type: application/xml');
  $url = (isset($_GET['url']) ? $_GET['url'] : null);
  $pointer = fopen($url, 'r');
  if ($pointer) {
    while (!feof($pointer)) {
      $line = fgets($pointer);
      echo $line;
    }
    fclose($pointer);
  }
?>
