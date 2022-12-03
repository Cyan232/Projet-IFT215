async function chargerpgConfirmation()
{
    ShowConfirmation(1);
    console.log("result.courriel");
}

function ShowConfirmation(clientID)
{
    $.ajax({
        url: "/clients/"+clientID,
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k');
        },
        success: function( result ) {
            var text = document.getElementById('bordure1').textContent = "Vous avez reçu un courriel à cette adresse " + result.courriel;
        }
    });
}


