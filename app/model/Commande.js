Ext.define('backapp.model.Commande', {
    extend: 'Ext.data.Model',
    config: {
        autoLoad:true,
        fields: [
            {name: 'id',          type: 'int'},
            {name: 'label',          type: 'string'},
            {name: 'RefCommande',        type: 'string'},
            {name: 'tmsCreate',        type: 'string'},
            {name: 'MontantHorsPromoHT',        type: 'float'},
            {name: 'MontantHorsPromoTTC',        type: 'float'},
            {name: 'MontantHT',        type: 'float'},
            {name: 'MontantTTC',        type: 'float', convert: function (value,record){
                if (!value) return "0";
                else return value;
            }},
            {name: 'Remise',        type: 'float'},
            {name: 'Nom',         type: 'string'},
            {name: 'Prenom',  type: 'string'},
            {name: 'MontantPaye',        type: 'float'},
            {name: 'MontantLivraison',        type: 'float'},
            {name: 'Valide',        type: 'boolean'},
            {name: 'Expedie',        type: 'boolean'},
            {name: 'Prepare',        type: 'boolean'},
            {name: 'PrepareLe',        type: 'string'},
            {name: 'ExpedieLe',        type: 'string'},
            {name: 'Paye',        type: 'boolean'},
            {name: 'Current',        type: 'boolean'},
            {name: 'PaymentPending',        type: 'boolean'},
            {name: 'EchecPayment',        type: 'boolean'},
            {name: 'PayeLe',        type: 'date'},
            {name: 'Cloture',        type: 'boolean'},
            {name: 'ClotureLe',        type: 'string'},
            {name: 'DateCommande',        type: 'string'},
            {name: 'AdresseId',        type: 'int'},
            {name: 'CodePromoId',        type: 'int'},
            {name: 'ClientId',        type: 'int'},
            {name: 'MagasinId',        type: 'int'},
            {name: 'LitigeId',        type: 'int'},
            {name: 'BaseHTTx1',        type: 'float'},
            {name: 'TxTva1',        type: 'float'},
            {name: 'MtTva1',        type: 'float'},
            {name: 'TTC1',        type: 'float'},
            {name: 'BaseHTTx2',        type: 'float'},
            {name: 'TxTva2',        type: 'float'},
            {name: 'MtTva2',        type: 'float'},
            {name: 'TTC2',        type: 'float'},
            {name: 'HtLivr',        type: 'float'},
            {name: 'TxTvaLiv',        type: 'float'},
            {name: 'MtTvaLiv',        type: 'float'},
            {name: 'TTCLiv',        type: 'float'},
            {name: 'Etat', type: 'string', convert: function (value,record) {
                if (record.get('Cloture'))
                    return '<span class="label danger">commande cloturée</span>';
                else if (record.get('Expedie')&&!record.get('Cloture'))
                    return '<span class="label warning">commande retirée mais non cloturée.</span>';
                else if (record.get('Prepare')&&!record.get('Expedie')&&!record.get('Cloture'))
                    return '<span class="label warning">commande préparée en attente de retrait</span>';
                else if (record.get('Valide')&&!record.get('Prepare')&&!record.get('Expedie')&&!record.get('Cloture'))
                    return '<span class="label success">commande en attente de préparation</span>';
            }}
        ]
    }
});