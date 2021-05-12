$(document).ready(function(){  

    let editar = false;

    $('#task-result').hide();
    fetchTasks();



    //Buscardor Filtro
    $('#search').keyup(function(){
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url:'task-search.php',
                type: 'POST',
                data: {search},
                success: function(resp){
                    let data = JSON.parse(resp); 
                    console.log(data);   
                    let template = '';              
                    data.forEach(element => {
                        template += `<li>${element.name}</li>`
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
    });



    //Formulario Envia
    $('#task-form').submit(function(event){
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#task-id').val()
        };  
        
        let url = editar === false ? 'task-add.php': 'task-edit.php';
        
        $.post(url,postData,function(response){
            fetchTasks();
            console.log(url);
            console.log(response);
            $('#task-form').trigger('reset');
        });
        event.preventDefault();
    });

    function fetchTasks(){
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (resp){
                let data = JSON.parse(resp);
                let template = '';
                data.forEach(d => {
                    template += `
                    <tr task-id="${d.id}">
                        <td>${d.id}</td>
                        <td><a href="#" class="edit" >${d.name}</a></td>
                        <td>${d.description}</td>
                        <td><button class="task-delete btn btn-danger">Borrar</button></td>
                    </tr>
                    `
                });
                $('#tasks').html(template);
            }
        });
    }

    $(document).on('click','.task-delete',function(){
        if(confirm('¿Seguro quiere eliminar este dato?')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('task-id');
            $.post('task-del.php',{id},function (resp){
                console.log(resp);
                fetchTasks();
            });
        }
    });


    $(document).on('click','.edit',function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('task-id');
        $.post('task-single.php',{id}, function(resp){
            const data = JSON.parse(resp);
            $('#name').val(data.name);
            $('#description').val(data.description);
            $('#task-id').val(data.id);
            editar = true;
        });
    });


});