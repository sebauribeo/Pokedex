$(document).ready(function(){

    $('#buscar').on('click', ()=>{
        let entrada = $("input").val();
        console.log(entrada);
        $.ajax({
            type:"GET",
            url:`https://pokeapi.co/api/v2/pokemon/${entrada}`,
            dataType:"json",
            success: function (response) {
                console.log(response);
                let character = response;
                $('#pokemon').html(`
                    <img src="${character.sprites.front_default}" alt="">
                    <p>Nombre: ${character.name}</p>
                    <p>Tamaño: ${character.weight} CM</p>
                    <p>N° Pokedex: ${character.id} </p>
                    `);

                $('input').val("");
            },
            error: function(error){
                console.error(error);
                $('#pokemon').html(`
                <p>El Nombre ( ${entrada} ) que buscas no existe, intenta nuevamente</p>
            `)
            $('input').val("");

            }

            
        });
    
    });

});

