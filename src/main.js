const { BrowserWindow, Notification } = require('electron');
const { getConnection } = require('./database')

async function createAnotation(anotation){
    try {
        const conn = await getConnection()
        const result = await conn.query('INSERT INTO anotation SET ?', anotation);
        console.log(result);

        new Notification ({
            title: 'Registro da nota!',
            body: 'Anotação cadastrada com sucesso'
          }).show();

        anotation.id = result.insertId;
        return anotation;

    } catch (error) {
        console.log(error)
    }

    
    
}

async function getAnotation(){
    try {
        const conn = await getConnection()
        const result = await conn.query('SELECT * FROM anotation ORDER BY id DESC');
        return result;
    } catch (error) {
        console.log(error);
    }
    
}

async function deleteAnotation(id){
    try {
        const conn = await getConnection()
        const result =  await conn.query('DELETE FROM anotation WHERE id = ?', id);
        return result
    } catch (error) {
        console.log(error)
    }
    
}

async function getAnotationById(id){
    try {
        const conn = await getConnection()
        const result = await conn.query('SELECT * FROM anotation WHERE id = ?', id);
        return result[0]
    } catch (error) {
        console.log(error)
    }  
}

async function updateAnotation(id, anotation){
    try {
        const conn = await getConnection()
        await conn.query('UPDATE anotation SET ? WHERE id = ?', [anotation, id]);

        new Notification ({
            title: 'Registro da nota!',
            body: 'Anotação atualizada com sucesso!'
          }).show();
    } catch (error) {
        console.log(error)
    }
}

let window;

function createWindow() {
    window = new BrowserWindow ({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        
    });
    window.loadFile('src/ui/index.html');
}

module.exports = {
    createWindow,
    createAnotation,
    getAnotation,
    deleteAnotation,
    getAnotationById,
    updateAnotation
}