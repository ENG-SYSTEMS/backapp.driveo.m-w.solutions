Ext.define("backapp.store.Commandes", {
    extend: 'Ext.data.Store',

    alias: 'store.Commande',
    config: {
        model: 'backapp.model.Commande',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                create: backapp.utils.Config.getDomain()+'/Boutique/Commande/getData.json',
                read: backapp.utils.Config.getDomain()+'/Boutique/Commande/getData.json',
                update: backapp.utils.Config.getDomain()+'/Boutique/Commande/getData.json',
                destroy: backapp.utils.Config.getDomain()+'/Boutique/Commande/deleteData.json'
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
