$(document).ready(function(){

    var intro = document.getElementById("audio");
    intro.autoplay = true;
    intro.load();

            $.ajax({
            type:"GET",
            url:`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random()*200)}`,
            dataType:"json",
            success: function (response) {
                console.log(response);
                let character = response;
                
                $('#pokemon-1').html(`
                    <h4>${character.name}</h4>
                    <img src="${character.sprites.other.dream_world.front_default}" alt="">
                `);
                
                var chart = new CanvasJS.Chart("chartContainer", {
                    backgroundColor: '#9ae4ed',
                    animationEnabled: true,
                    title: {
                        text: 'Stats',
                        fontWeight:'bolder',
                        padding:10,
                        backgroundColor: '#ffff00',
                        cornerRadius:15,
                    },
                    data: [{
                        type: "pie",
                        startAngle: 240,
                        fontColor: '#000000',
                        fontWeight:'bolder',
                        yValueFormatString: "##\"",
                        indexLabel: "{label} {y}",
                        dataPoints: [
                            {y: character.stats[0].base_stat, label: "HP"},
                            {y: character.stats[1].base_stat, label: "Attack"},
                            {y: character.stats[2].base_stat, label: "Defense"},
                            {y: character.stats[3].base_stat, label: "Sp. Attack"},
                            {y: character.stats[4].base_stat, label: "Sp. Defense"},
                            {y: character.stats[5].base_stat, label: "Speed"},
                        ]
                    }]
                });
                chart.render();
                
                $('#pokemon-2 > ul').html(`
                    <h4>Caracteristicas:</h4>
                    <h5>Tamaño:</h5>
                    <p>${character.weight} CM.</p>
                    <h5>N° Pokedex: </h5>
                    <p>${character.id} </p>
                    <h5>Tipo:</h5>
                `);
                character.types.map((tipo) =>{
                    $('#pokemon-2 > ul').append(`            
                    <li>${tipo.type.name}</li>
                    `);
                });
                
                $('input').val("");
            },

            error: function(error){
                console.error(error);
                $('#chartContainer').html(`
                <p>El Nombre (${entrada}) que buscas no existe, intenta nuevamente</p>
            `)
            }
        });
    });


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
            
            $('#pokemon-1').html(`
                <h4>${character.name}</h4>
                <img src="${character.sprites.front_default}" alt="">
            `);
            
            var chart = new CanvasJS.Chart("chartContainer", {
                backgroundColor: '#9ae4ed',
                animationEnabled: true,
                title: {
                    text: 'Stats',
                    fontWeight:'bolder',
                    padding:10,
                    backgroundColor: '#ffff00',
                    cornerRadius:15,
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    fontColor: '#000000',
                    fontWeight:'bolder',
                    yValueFormatString: "##\"",
                    indexLabel: "{label} {y}",
                    dataPoints: [
                        {y: character.stats[0].base_stat, label: "HP"},
                        {y: character.stats[1].base_stat, label: "Attack"},
                        {y: character.stats[2].base_stat, label: "Defense"},
                        {y: character.stats[3].base_stat, label: "Sp. Attack"},
                        {y: character.stats[4].base_stat, label: "Sp. Defense"},
                        {y: character.stats[5].base_stat, label: "Speed"},
                    ]
                }]
            });
            chart.render();
            
            $('#pokemon-2 > ul').html(`
                <h4>Caracteristicas:</h4>
                <h5>Tamaño:</h5>
                <p>${character.weight} CM.</p>
                <h5>N° Pokedex: </h5>
                <p>${character.id} </p>
                <h5>Tipo:</h5>
            `);
            character.types.map((tipo) =>{
                $('#pokemon-2 > ul').append(`            
                <li>${tipo.type.name}</li>
                `);
            });
            
            $('input').val("");
        },

        error: function(error){
            console.error(error);
            $('#chartContainer').html(`
            <p>El Nombre (${entrada}) que buscas no existe, intenta nuevamente</p>
        `)
        }
    });
});

