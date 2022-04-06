<?php

$image64 = $_REQUEST['_image'] ?? '';
$name    = $_REQUEST['_fileName'] ?? '';

function base64_to_jpeg($base64_string, $output_file)
{
    $ifp = fopen($output_file, 'wb');

    $data = explode(',', $base64_string);
    fwrite($ifp, base64_decode($data[1]));

    fclose($ifp);

    return $output_file;
}

base64_to_jpeg($image64, "../save/$name.png");
