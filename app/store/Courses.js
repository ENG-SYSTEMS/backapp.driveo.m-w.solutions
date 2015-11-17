Ext.define("backapp.store.Courses", {
    extend: 'Ext.data.Store',
    alias: 'store.Courses',
    config: {
        model: 'backapp.model.Course',
        clearOnPageLoad: true,
        pageSize: 10,
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            url: backapp.utils.Config.getStoreCourse(),
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
        /*data:[ {"id":1,"name":"Re"},{"id":2,"name":"Cus"},{"id":3,"name":"Voit"},{"id":4,"name":"Cli"}]*/
    }
});
