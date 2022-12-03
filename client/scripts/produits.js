/*function chargerproduit(){
    $.ajax({
        url: "/produits",
        success: function( result ) {
            for(let produit in result)
            {
                //console.log(result[produit].nom);
                //item = item_to_html(result[produit]);
                //listeProduit.append(item);
                $('#list_items').append(item_to_html(result[produit]));
            }
        }
    });
}

function CreateItemCard(item)
{
    let h4 = document.createElement('h4');
    h4.innerText = item.nom;
    return h4;
}

document.addEventListener('DOMContentLoaded', (event)=>
{
    chargerproduit();
});

function add_item(idItem)
{
    $.ajax({
        url: "/clients/"+1+"/panier",
        method:"POST",
        data: {"idProduit": idItem, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k");
        },
        success: function( result ) {
            console.log(result.items.length);
        }
    });
}


function item_to_html(item){
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');

    item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');

    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Qté. :' + item.qte_inventaire +'</li>')
        .append('<li>Categorie. :' + item.categorie.nom +'</li>')
        .append('<li> - </li>')
        .append('<li>'+  item.description +'</li>');

    item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>');

    button = $('<p></p>')
        .addClass('w-100 display-6 text-center')
        .append('<button type="button" class="btn btn-primary position-relative" onclick="add_item('+item.id+')">')
        .append('<i class="bi bi-cart-plus"></i>');


    item_detail.append(button);
    item_body.append(item_detail);

    item_card.append(item_head).append(item_body);

    return $('<div></div>').addClass('col-md-3') .append(item_card);
}*/

function item_to_html(item){
    //console.log((String)item);
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');

    item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');

    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Categorie. :' + item.categorie.nom +'</li>');

    item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>');

    p = $('<p></p>')
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
            total = 0;

            $.each(result.items, function (key, value)
            {
                total += value.quantite;
            });
            $('#item_counter').text(total);
            //$('#item_counter').text(result.items.length);

        }
    });
}

function chargerproduit(){
    $.ajax({
        url: "/produits",
        success: function( result ) {
            //console.log(result);
            $.each(result, function (key, value) {
                item = item_to_html(value);
                $('#list_items').append(item);
            });
        }
    });
}

async function chargerproduit() {
}