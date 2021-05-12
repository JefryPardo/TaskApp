<?php
    $user="parcial";
    $pass="9696";
    $server="localhost";
    $db="task-app";
    $con=mysqli_connect($server,$user,$pass,$db);
    
    if($con->connet_error){
        die("No hay conexion: ".mysqli_connect_error());
    }

?>