Ext.define('backapp.model.LigneCommande', {
    extend: 'Ext.data.Model',
    config: {
        autoLoad:true,
        fields: [
            {name: 'id',          type: 'int'},
            {name: 'label',          type: 'string'},
            {name: 'CommandeId',        type: 'id'},
            {name: 'tmsCreate',        type: 'string'},
            {name: 'Quantite',        type: 'int'},
            {name: 'MontantUnitaireTTC',        type: 'float'},
            {name: 'MontantHT',        type: 'float'},
            {name: 'MontantTTC',        type: 'float', convert: function (value,record){
                if (!value) return "0";
                else return value;
            }},
            {name: 'Taxe',        type: 'float'},
            {name: 'Image',        type: 'string'},
            {name: 'Titre',        type: 'string'},
            {name: 'Reference',        type: 'string'},
            {name: 'TarifText',        type: 'float' ,convert: function (value, record) {
                value=record.get('MontantTTC');
                var DecimalSeparator = '.';
                var AmountWithCommas = value;
                var arParts = String(AmountWithCommas).split(DecimalSeparator);
                var intPart = arParts[0];
                var decPart = (arParts.length > 1 ? arParts[1] : '');
                decPart = (decPart + '00').substr(0,2);
                return intPart + DecimalSeparator + decPart + ' € TTC';
            }},

        ]
    }
});