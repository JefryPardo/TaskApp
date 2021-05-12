<?php
    include('database.php');
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $description = $_POST['description'];
        $query = "INSERT into task(name,description) VALUES('$name','$description')";
        
        $result = mysqli_query($con,$query);
        if(!$result){
            die('Error al insertar el dato.');
        }
        echo 'Tarea agregada';
    }
?>