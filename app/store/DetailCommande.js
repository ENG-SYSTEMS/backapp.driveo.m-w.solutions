Ext.define("backapp.store.DetailCommande", {
    extend: 'Ext.data.Store',

    alias: 'store.DetailCommande',
    config: {
        model: 'backapp.model.LigneCommande',
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            actionMethods: {
                read   : 'POST'
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
