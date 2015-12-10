Ext.define("backapp.store.Produits", {
    extend: 'Ext.data.Store',

    alias: 'store.Produits',
    config: {
        model: 'backapp.model.Produit',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                create: backapp.utils.Config.getDomain()+'/Boutique/Produit/getData.json',
                read: backapp.utils.Config.getDomain()+'/Boutique/Produit/getData.json',
                update: backapp.utils.Config.getDomain()+'/Boutique/Produit/getData.json',
                destroy: backapp.utils.Config.getDomain()+'/Boutique/Produit/deleteData.json'
            },
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            reader: {
                type: 'json',
                rootProperty: 'results',
                totalProperty: 'total'
            },
            writer: {
                type: 'json',
                writeAllFields: true
            }
        }
    }
});
