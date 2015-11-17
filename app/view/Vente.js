Ext.define('backapp.view.Vente', {
    extend: 'Ext.Panel',
    xtype: 'vente',
    requires: [
        'Ext.TitleBar',
        'Ext.ux.mgd.device.Scanner',
        'backapp.form.Vente'
    ],
    config: {
        cls: 'vente-page',
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Nouvelle vente',
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
                    }
               ]
           },
            {
                align: 'center',
                style: 'margin-top:10px',
                xtype: 'formVente'
            }
        ]
    },
    setResult: function (text) {
        this.down('[action=affichage-resultat]').setHtml(text);
    }
});
