Ext.define('backapp.view.FicheProduit', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'backapp.form.Produit'
    ],
    config: {
        cls: 'produit-page',
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                action: 'valettitle',
                title: 'Stéphanie Delaporta',
                cls: 'header',
                items: [
                    {
                        xtype: 'button',
                        text: '',
                        iconCls: 'fa fa-navicon',
                        cls: 'open-socials',
                        handler: function(){
                            backapp.utils.Config.toggleMenu();
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype : 'button',
                        hidden: false,
                        ui    : 'decline',
                        action: 'back',
                        iconCls: 'fa fa-arrow-left',
                        cls: 'open-socials',
                        text  : ''
                    }/*,
                    {
                        xtype: 'button',
                        text: '',
                        iconCls: 'fa fa-share-alt',
                        cls: 'open-socials',
                        handler: function(){
                            if(Ext.Viewport.getMenus().right.isHidden()){
                                Ext.Viewport.showMenu('right');
                            }
                            else
                            {
                                Ext.Viewport.hideMenu('right');
                            }
                        }
                    }*/
                ]
            },
            {
                align: 'center',
                style: 'margin-top:10px',
                xtype: 'formProduit'
            }
        ]
    },
    setRecord: function (record){
        if (!record) return;
        console.log(record);
        //title
        this.down('[action=valettitle]').setTitle(record.get('Nom').substr(0,20)+'...');
        this.down('[xtype=formProduit]').setRecord(record);

        //show valet histo
        var me = this;
        /*this.down('[action=show-valet-histo]').addListener('tap',function () {*/
/*            var url  = backapp.utils.Config.getHistoValetUrl();
            console.log('show valet histo',me.down('[action=valet-histo]'));
            var store = new Ext.data.Store({
                model: 'backapp.model.Course',
                proxy: {
                    method: 'POST',
                    actionMethods: {
                        create : 'POST',
                        read   : 'POST', // by default GET
                        update : 'POST',
                        destroy: 'POST'
                    },
                    useDefaultXhrHeader: false,
                    type: 'ajax',
                    url: url,
                    reader: {
                        type: 'json',
                        rootProperty: 'courses'
                    }
                }
            });
            store.getProxy().setExtraParams({
                user_id: backapp.utils.Config.getCurrentUser().user_id,
                valet_id: record.get('id'),
                logkey: backapp.utils.Config.getCurrentKey()
            });            store.load();
            me.down('[action=valet-histo]').setStore(store);
            me.down('[action=valet-histo]').setStyle('height: 750px; overflow:hidden');
        /*});*/
    }
});
