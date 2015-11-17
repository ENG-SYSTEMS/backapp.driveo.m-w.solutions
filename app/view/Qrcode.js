Ext.define('backapp.view.Qrcode', {
    extend: 'Ext.Panel',
    xtype: 'qrcode',
    requires: [
        'Ext.TitleBar',
        'Ext.ux.mgd.device.Scanner'
    ],
    config: {
        cls: 'qrcode-page',
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'QRCode Scanner',
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
                style: 'margin: 10px 30px',
                align: 'center',
                items: [
                    {
                        align: 'center',
                        action: 'affichage-resultat',
                        html: 'En attente du retour ...'
                    }
                ]
            }
        ]
    },
    setResult: function (text) {
        this.down('[action=affichage-resultat]').setHtml(text);
    }
});
