Ext.define('backapp.view.FicheOrdonnance', {
    extend: 'Ext.Container',
    xtype: 'fiche-ordonnance',
    requires: [
        'backapp.utils.ImageViewer'
    ],
    config: {
        cls: 'product-list-page',
        layout: 'vbox',
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
                action: 'titleordonnande',
               title: 'Fiche ordonnance',
               cls: 'header top',
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
                   }
                ]
            },
            {
                layout: 'hbox',
                width: '100%',
                cls: 'product-barre',
                items: [
                    {
                        action: 'ordonnance-info',
                        flex: 1,
                        style: 'margin: 10px;',
                        html: ''
                    },
                    {
                        layout: 'vbox',
                        flex: 1,
                        height: '100%',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'driveo-button success block',
                                action: 'ordonnancePrepare',
                                text: 'Définir l\'ordonnance comme préparée'
                            },
                            {
                                xtype: 'button',
                                cls: 'driveo-button warning block',
                                action: 'ordonnanceRetire',
                                text: 'Définir l\'ordonnance comme retirée'
                            },
                            {
                                xtype: 'button',
                                cls: 'driveo-button danger block',
                                action: 'ordonnanceCloture',
                                text: 'Définir l\'ordonnance comme cloturée'
                            },
                            {
                                xtype: 'hiddenfield',
                                action: 'ordonnanceId',
                                value: ''
                            }
                        ]
                    }
                ]
            },
            {
                height: '100%',
                items:[
                    {
                        xtype: 'pinchzoomimage',
                        width: '100%',
                        flex: 1,
                        height: '100%',
                        action: 'ordonnanceImage',
                        src: '/resources/images/default-photo.png'
                    }
                ]
            }

        ]
    },
    setRecord: function (record){
        if (!record) return;
        console.log(record);
        //title
        this.down('[action=titleordonnande]').setTitle(record.get('Nom')+' '+record.get('Prenom'));
        this.down('[action=ordonnanceImage]').setSrc(backapp.utils.Config.getDomain()+'/'+record.get('Image'));
        this.down('[action=ordonnance-info]').setHtml(
            record.get('EtatText')+''+
            '<h1>'+record.get('Nom')+' '+record.get('Prenom')+'</h1><p>'+
            '<b>Tel: '+record.get('Telephone')+'</b><br/>'+
            '<b>Email: '+record.get('Email')+'</b><br/>'+
            '<b>Adresse: '+record.get('Adresse')+'</b><br/>'+
            '<b>'+record.get('CodPos')+' '+record.get('Ville')+'</b><br/>'+
            '<b>Date: '+record.get('Date')+'</b></p>'+
            '<div>Commentaires: '+record.get('Commentaire')+'</div>'
        );
        this.down('[action=ordonnanceId]').setValue(record.get('id'));

        //boutons
        switch (record.get('Etat')) {
            case 1:
                this.down('[action=ordonnancePrepare]').setHidden(false);
                this.down('[action=ordonnanceRetire]').setHidden(false);
                this.down('[action=ordonnanceCloture]').setHidden(false);
                break;
            case 2:
            case 3:
                this.down('[action=ordonnancePrepare]').setHidden(true);
                break;
            case 4:
                this.down('[action=ordonnancePrepare]').setHidden(true);
                this.down('[action=ordonnanceRetire]').setHidden(true);
                break;
            case 5:
            case 6:
                this.down('[action=ordonnancePrepare]').setHidden(true);
                this.down('[action=ordonnanceRetire]').setHidden(true);
                this.down('[action=ordonnanceCloture]').setHidden(true);
                break;
        }
    }
});
