<?php
    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $description = $_POST['description'];
        $name = $_POST['name'];
        $query = "UPDATE task SET name = '$name', description = '$description'  WHERE id = '$id'";
        $result = mysqli_query($con,$query);

        if(!$result){
            die('Error al conectar'. mysqli_error($con));
        }
        echo 'Se edito';
    }
?>