Ext.define('backapp.utils.DataViewYpm', {
    extend: 'Ext.DataView',
    xtype: 'dataviewypm',
    onBeforeLoad: function () {
        var loadingText = this.getLoadingText();
        if (loadingText && this.isPainted()) {
            this.setMasked({
                xtype: 'loadmaskypm',
                message: 'Chargement ...'
            });
        }

        this.hideEmptyText();
    }
});
