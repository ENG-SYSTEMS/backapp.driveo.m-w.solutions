Ext.define('backapp.model.Produit', {
    extend: 'Ext.data.Model',
    config: {
        autoLoad:true,
        fields: [
            {name: 'id',          type: 'int'},
            {name: 'label',          type: 'string'},
            {name: 'Nom',        type: 'string'},
            {name: 'Reference',        type: 'string'},
            {name: 'Actif',        type: 'boolean'},
            {name: 'Poids',        type: 'float'},
            {name: 'Largeur',        type: 'float'},
            {name: 'Hauteur',        type: 'float'},
            {name: 'Profondeur',        type: 'float'},
            {name: 'Accroche',        type: 'string'},
            {name: 'Image',        type: 'string'},
            {name: 'Description',        type: 'string'},
            {name: 'Commentaire',        type: 'string'},
            {name: 'CompteComptable',        type: 'string'},
            {name: 'CompteComptablePro',        type: 'string'},
            {name: 'MultiTarif',        type: 'boolean'},
            {name: 'Tarif',        type: 'float'},
            {name: 'TarifText',        type: 'float' ,convert: function (value, record) {
                value=record.get('Tarif');
                var DecimalSeparator = '.';
                var AmountWithCommas = value;
                var arParts = String(AmountWithCommas).split(DecimalSeparator);
                var intPart = arParts[0];
                var decPart = (arParts.length > 1 ? arParts[1] : '');
                decPart = (decPart + '00').substr(0,2);
                return intPart + DecimalSeparator + decPart + ' € HT';
            }},
            {name: 'TypeTvaInterne',        type: 'integer'},
            {name: 'TypeTvaExp',        type: 'integer'},
            {name: 'Ordre',        type: 'string'},
            {name: 'Url',        type: 'string'},
            {name: 'Template',        type: 'string'},
            {name: 'Display',        type: 'boolean'},
            {name: 'TypeProduit',        type: 'integer'},
            {name: 'NatureProduit',        type: 'integer'},
            {name: 'TitleMeta',        type: 'string'},
            {name: 'DescriptionMeta',        type: 'string'},
            {name: 'KeywordsMeta',        type: 'string'},
            {name: 'ImgMeta',        type: 'string'},
            {name: 'Coeur',        type: 'boolean'},
            {name: 'IdKdo',        type: 'boolean'},
            {name: 'ImageFond',        type: 'string'},
            {name: 'EAN',        type: 'string'},
            {name: 'OrdreFlash',        type: 'integer'},
            {name: 'Note',        type: 'float'},
            {name: 'Ventes',        type: 'integer'},
            {name: 'Visites',        type: 'integer'},
            {name: 'backappReference',        type: 'integer'/*,convert: function (value, record) {
                return Math.floor(Math.random()*1000);
            }*/},
            {name: 'CategorieId',        type: 'int'},
            {name: 'ConditionnementId',        type: 'int'}
        ]

    }
});
