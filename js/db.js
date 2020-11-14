const idxDB = idb.open("kabar-liga", 1, function(upgradeDb) {
    const ligaObjekStore = upgradeDb.createObjectStore("leagues", {
        keyPath: "id"
    });
    ligaObjekStore.createIndex("league", "league", {
        unique: false
    });
});

function saveFavLiga(teams) {
    idxDB
    .then(function(db) {
        const tx = db.transaction("leagues", "readwrite");
        const item = {
            id: teams.competition.id,
            name: teams.competition.area.name,
            lastUpdated: teams.competition.lastUpdated,
            teams: teams.teams
        }
        tx.objectStore("leagues").put(item);
        return tx.complete;
    })
    .then(function() {
        console.log("Liga favorit ditambahkan");
    });
}

function deleteFavLiga(id){
    return new Promise(function(resolve, reject) {
        idxDB
        .then(function(db){
            const tx = db.transaction("leagues", "readwrite");
            tx.objectStore('leagues').delete(id);
            return tx;
        })
        .then(function(tx){
            if (tx.complete) {
                resolve(true)
            } else {
                reject(new Error(tx.onerror))
            }
        })
    })
}

function getAll() {
    return new Promise(function(resolve, reject) {
        idxDB
        .then(function(db) {
            const tx = db.transaction("leagues", "readonly");
            const store = tx.objectStore("leagues");
            return store.getAll();
        })
        .then(function(liga) {
            resolve(liga);
        })
        .catch(error => reject(error));
    });
}

function getLigaById(id) {
    return new Promise(function(resolve, reject) {
        idxDB
        .then(function(db) {
            const tx = db.transaction("leagues", "readonly");
            return tx.objectStore("leagues").get(id);
        })
        .then(function(data) {
            console.log(data)
            resolve(data);
        })
        .catch(error => reject(error));
    });
}
