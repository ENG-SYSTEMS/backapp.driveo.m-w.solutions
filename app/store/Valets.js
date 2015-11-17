Ext.define("backapp.store.Valets", {
    extend: 'Ext.data.Store',
    alias: 'store.Valets',
    config: {
        model: 'backapp.model.Valet',
        clearOnPageLoad: true,
        pageSize: 5,
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            url: backapp.utils.Config.getStoreValet(),
            method: 'POST',
            actionMethods: {
                create : 'POST',
                read   : 'POST', // by default GET
                update : 'POST',
                destroy: 'POST'
            },
            reader: {
                type: 'json',
                totalProperty: 'totalCount',
                rootProperty: 'data'
            }
        }
        /*data:[ {"id":1,"name":"Re"},{"id":2,"name":"Cus"},{"id":3,"name":"Voit"},{"id":4,"name":"Cli"}]*/
    }
});
