function item_to_html_panier(item, itemData){

    let mainRow = $('<div></div>')
        .addClass('row');

    let item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');

    let item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nomProduit + '</h4>');

    let row = $('<div></div>')
        .addClass('row');

    let colItemDesc = $('<div></div>')
        .addClass('col-sm')
        .append('<ul>Categorie:' + itemData.categorie.nom +'</ul>')
        .append('<ul>S/N :' + itemData.serial +'</ul>');

    let colItemDelete = $('<div></div>')
        .addClass('col-sm');

    let colItemPrice = $('<div></div>')
        .addClass('col-sm');
        //.append('<a>Prix : ' + (item.quantite * item.prix).toFixed(2) +' $</a>');
    let prixa = (document).createElement('a');
    prixa.textContent = 'Prix : ' + (item.quantite * item.prix).toFixed(2) +' $';
    colItemPrice.append(prixa);

    let colItemEntry = $('<div style="align-content: center;"></div>')
        .addClass('col-sm');

    let Grid = $('<div></div>')
        .addClass('container');

    let quantite = $('<div></div>')
        .addClass('btn btn-ligh');

    let quantitea = (document).createElement('a');
    quantitea.id = "quantite";
    quantitea.textContent =item.quantite;
    quantite.append(quantitea);

    let btnAdd = (document).createElement('button');
    btnAdd.textContent = '+';
    btnAdd.classList.add('btn','btn-primary');


    let btnRemove = (document).createElement('button');
    btnRemove.textContent = '-';
    btnRemove.classList.add('btn','btn-primary');


    //colItemEntry.append('<button type="button" class="btn btn-primary"> - </button>');
    colItemEntry.append(btnAdd);
    colItemEntry.append(quantite);
    colItemEntry.append(btnRemove);
    //colItemEntry.append('<button type="button" class="btn btn-primary" > + </button>');
    let btnDelete = (document).createElement('button');
    btnDelete.textContent = 'Enlever';
    btnDelete.classList.add('btn','btn-danger');


    colItemDelete.append(btnDelete);

    row.append(colItemDesc);
    row.append(colItemEntry);

    row.append(colItemPrice);
    row.append(colItemDelete);



    Grid.append(row);

    item_card.append(item_head);
    item_card.append(Grid);

    let result = $('<div></div>').append(mainRow).append(item_card);
    btnAdd.addEventListener("click", () => add_itemToCart(item.id, result, quantitea, prixa ));
    btnRemove.addEventListener("click", () => remove_itemToCart(item.id , result, quantitea, prixa  ));
    btnDelete.addEventListener("click", () => deleteItemFromCart(item.id , result, quantitea, prixa  ));

    return result;
}

function add_itemToCart(id_item, card, qte, prix)
{
    $.ajax({
        url: "/clients/"+"1"+"/panier/"+id_item,
        method:"PUT",
        data: {"quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k');
        },
        success: function( result ) {
            let item = GetItemDataFromCart(result, id_item);
            qte.textContent = item.quantite;
            prix.textContent = (item.quantite * item.prix).toFixed(2);;
        }
    });
}


function remove_itemToCart(id_item, card, qte, prix)
{
    $.ajax({
        url: "/clients/"+"1"+"/panier/"+id_item,
        method:"PUT",
        data: {"quantite": -1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k');
        },
        success: function( result ) {
            let item = GetItemDataFromCart(result, id_item);
            if(item.quantite <= 0)
            {
                deleteItemFromCart(id_item,card, qte, prix);
            }

            qte.textContent = item.quantite;
            prix.textContent = (item.quantite * item.prix).toFixed(2);;
        }
    });
}


function deleteItemFromCart(id_item,card, qte, prix)
{
    $.ajax({
        url: "/clients/"+"1"+"/panier/"+id_item,
        method:"DELETE",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k');
        },
        success: function( result ) {
            card.remove();
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
function GetItemDataFromCart(cart, itemID)
{
    let result
    cart.items.forEach(function(entry) {
        if(itemID == entry.id)
        {
            result = entry;
        }
    });
    return result;
}

function GetItem(ids, id)
{
    let result
    ids.forEach(function(entry) {
        if(id == entry.id)
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
    GetItems('Tout');
}