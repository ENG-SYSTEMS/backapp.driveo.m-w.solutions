Ext.define("backapp.store.Ordonnances", {
    extend: 'Ext.data.Store',

    alias: 'store.Ordonnances',
    config: {
        model: 'backapp.model.Ordonnance',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                create: backapp.utils.Config.getDomain()+'/Pharmacie/Ordonnance/getData.json',
                read: backapp.utils.Config.getDomain()+'/Pharmacie/Ordonnance/getData.json',
                update: backapp.utils.Config.getDomain()+'/Pharmacie/Ordonnance/getData.json',
                destroy: backapp.utils.Config.getDomain()+'/Pharmacie/Ordonnance/deleteData.json'
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
