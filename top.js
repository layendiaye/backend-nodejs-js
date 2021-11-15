
data=[
    {
        id: 1,
        firstname: 'Sophie',
        lastname: 'Lozophy'
    },
    {
        id: 2,
        firstname: 'Annie',
        lastname: 'Versaire'
    },
    {
        id: 3,
        firstname: 'Paul',
        lastname: 'Ochon'
    }
];

let texte='an';
texte=texte.toLowerCase();
listFiltrer=[];
for(const element of data)
{
    let text=JSON.stringify(element);
    text=text.toLowerCase();
    if(text.includes(texte)===true)
    {
        listFiltrer.push(element);
    }
}


console.log(listFiltrer);


