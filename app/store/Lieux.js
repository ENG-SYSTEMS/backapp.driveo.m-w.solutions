Ext.define("backapp.store.Lieux", {
    extend: 'Ext.data.Store',
    alias: 'store.Lieux',
    config: {
        model: 'backapp.model.Lieu',
        clearOnPageLoad: true,
        pageSize: 10,
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            url: backapp.utils.Config.getPlaceGetUrl(),
            method: 'POST',
            actionMethods: {
                create : 'POST',
                read   : 'POST', // by default GET
                update : 'POST',
                destroy: 'POST'
            },
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }
});
