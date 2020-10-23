const { remote } = require('electron');
const main = remote.require("./main");

const productForm = document.getElementById('productForm');
const titleAnotation = document.getElementById('title');
const descriptionAnotation = document.getElementById('description');
const listAnotation = document.getElementById('anotations');
let buttonGlobal = document.getElementById('button');
let anotations = [];
let editingStatus = false;
let anotationId = '';

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newAnotation = {
        title: titleAnotation.value,
        description: descriptionAnotation.value
    }

    if(!editingStatus){
        const result = await main.createAnotation(newAnotation);
        console.log(result);
    } else{
       await main.updateAnotation(anotationId, newAnotation);

       editingStatus = false;
       anotationId = '';
       productForm.reset();
       buttonGlobal.innerHTML = 'Anotar'
    }

    getAnotation();
    productForm.reset();
    titleAnotation.focus();
    
});

function renderAnotation (anotations) {
    listAnotation.innerHTML = '';
    anotations.forEach(anotation => {
        listAnotation.innerHTML += `
            <div id="field-infos">
                <div id="field-title-info">
                ${anotation.title}
                </div>
                <div>
                <textarea id="field-description-info" rows="20" cols="35">${anotation.description}</textarea>
                </div>
                <button id="button-editar" onclick="editAnotation(${anotation.id})">Editar</button>
                <button id="button-deletar" onclick="deleteAnotation(${anotation.id})">Excluir</button>
            </div>
        `
    });
}

async function deleteAnotation(id){
    const response = confirm("Realmente deseja deletar?")
    if(response){
        await main.deleteAnotation(id);
        await getAnotation();
        productForm.submit();
    } return;
    
}

async function editAnotation(id){
   const anotationById = await main.getAnotationById(id);
   titleAnotation.value = anotationById.title;
   descriptionAnotation.value = anotationById.description;
   buttonGlobal.innerHTML = 'Salvar edição'

   editingStatus = true;

   anotationId = anotationById.id;

   

}

const getAnotation = async () => {
    anotations = await main.getAnotation();
    renderAnotation(anotations);
};

async function init(){
    await getAnotation()
}

init();



