function item_to_html(item){
    //console.log((String)item);
    let item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');

    let item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nomProduit + '</h4>');

    let item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Categorie:' + item.descriptionProduit +'</li>')
        .append('<li>S/N :' + item.quantite +'</li>');

    let item_image = $('<i></i>');

    let item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>');

    let p = $('<p></p>')
        .addClass('w-100 display-6 text-center')
        //.append('<i class="bi bi-cart-plus"></i>')
        .append('<button type="button" className="btn btn-primary position-relative" onClick="add_item('+item.id+')"> <i class="bi bi-cart-plus"></i></button>');

    item_detail.append(p);
    item_body.append(item_detail);


    item_card.append(item_head).append(item_body);

    return $('<div></div>').addClass('col-md-3') .append(item_card);
}

function add_item(id_item)
{
    //console.log(id_item);
    // console.log(id_item);
    $.ajax({
        url: "/clients/"+"1"+"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k');
        },
        success: function( result ) {
            let total = 0;

            $.each(result.items, function (key, value)
            {
                total += value.quantite;
            });
            $('#item_counter').text(total);
            //$('#item_counter').text(result.items.length);

        }
    });
}

function LoadCart(){
    $.ajax({
        url: "/clients/1/panier",
        method: "GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k');
        },
        success: function( result ) {
                $.each(result.items, function (key, value) {
                    let item = item_to_html(value);
                    $('#list_items').append(item);
                });
            }
        }
    );
}


async function chargerpanier (){
    LoadCart('Tout');
}