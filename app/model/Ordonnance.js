Ext.define('backapp.model.Ordonnance', {
    extend: 'Ext.data.Model',
    config: {
        autoLoad: true,
        fields: [
            {name: 'id', type: 'int'},
            {name: 'label', type: 'string'},
            {name: 'Nom', type: 'string'},
            {name: 'tmsCreate', type: 'string'},
            {name: 'Prenom', type: 'string'},
            {name: 'Email', type: 'string'},
            {name: 'Telephone', type: 'string'},
            {name: 'Image', type: 'string'},
            {name: 'Commentaire', type: 'string'},
            {name: 'Etat', type: 'int'},
            {name: 'EtatText', type: 'string', convert: function (value,record){
                switch (record.get('Etat')) {
                    case 1:
                        return '<span class="product-dist product-near success">En attente de traitement</span>'
                        break;
                    case 2:
                        return '<span class="product-dist product-near warning">En préparation</span>'
                        break;
                    case 3:
                        return '<span class="product-dist product-near warning">En attente de retrait</span>'
                        break;
                    case 4:
                        return '<span class="product-dist product-near warning">En attente de cloture</span>'
                        break;
                    case 6:
                    case 5:
                        return '<span class="product-dist product-near danger">Cloturé</span>'
                        break;
                }
            }},
            {name: 'Date', type: 'string', convert: function (value,record){
                return record.get('tmsCreate');
            }}
        ]
    }
});
