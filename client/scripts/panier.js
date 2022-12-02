function item_to_html_panier(item, itemData){

    let mainRow = $('<div></div>')
        .addClass('row');

    let item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');

    let item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nomProduit + '</h4>');

    let row = $('<div></div>')
        .addClass('row')

    let colItemDesc = $('<div></div>')
        .addClass('col-sm')
        .append('<l>Categorie:' + "itemData.categorie" +'</l>')
        .append('<l>S/N :' + itemData.serial +'</l>');

    let colItemQty = $('<div></div>')
        .addClass('col-sm')
        .append('<a>Quantité:' + item.quantite +'</a>')

    let colItemPrice = $('<div></div>')
        .addClass('col-sm')
        .append('<a>Prix :' + item.quantite * item.prix +'</a>');

    let colItemEntry = $('<div></div>')
        .addClass('col-sm')
        .append('<button> supprimer </button>');

    let Grid = $('<div></div>')
        .addClass('container')

    row.append(colItemDesc);
    row.append(colItemQty);
    row.append(colItemPrice);
    row.append(colItemEntry);

    Grid.append(row);

    item_card.append(item_head);
    item_card.append(Grid);


    return $('<div></div>').append(mainRow).append(item_card);
    /*let row = $('<div></div>')
        .addClass('row');

    let item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');

    let item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nomProduit + '</h4>');

    let item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Categorie:' + item.descriptionProduit +'</li>')
        .append('<li>Quantitées :' + item.quantite +'</li>');

    let item_image = $('<i></i>');

    let item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <a class="card-title text-center"> $' + item.prix +'</a>');

    let p = $('<p></p>')
        .addClass('w-100 display-6 text-center')
        //.append('<i class="bi bi-cart-plus"></i>')
        .append('<button type="button" className="btn btn-primary position-relative" onClick="add_item('+item.id+')"> <i class="bi bi-cart-plus"></i></button>');

    item_detail.append(p);
    item_body.append(item_detail);


    item_card.append(item_head).append(item_body);

    return $('<div></div>').append(row).append(item_card);*/
}

function add_item(id_item)
{
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
        }
    });
}

function LoadCart(items){
    $.ajax({
        url: "/clients/1/panier",
        method: "GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k');
        },
        success: function( result ) {
                $.each(result.items, function (key, value) {
                    let itemData = GetItem(items,value.idProduit);
                    let item = item_to_html_panier(value, itemData);
                    $('#list_items_panier').append(item);
                });
            }
        }
    );
}

function GetItem(ids, id)
{
    let result
    ids.forEach(function(entry) {
        if(ids == entry.id)
        {
            result = entry;
        }
    });
    return result;
}

function GetItems(ids){

    $.ajax({
        url: "/produits",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k');
        },
        success: function( result )
        {
            LoadCart(result);
        }
    });
}

async function chargerpanier (){
    LoadCart('Tout');
}