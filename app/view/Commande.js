Ext.define('backapp.view.Commande', {
    extend: 'Ext.Container',
    xtype: 'commande',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'Ext.tab.Panel',
        'Ext.Menu',
        'Ext.Anim',
        'Ext.util.Geolocation'
    ],
    id: 'commande',
    config: {
        cls: 'product-list-page',
        layout: {
            type: 'card',
            align: 'center',
            animation: 'flip'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Liste des commandes',
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
                    }
                ]
            },
           {
                align: 'center',
                items:[
                    {
                        title: 'Commandes',
                        style: 'overflow:hidden',
                        iconCls: 'cart',
                        width: '100%',
                        height: '100%',
                        xtype: 'list',
                        store: 'Commandes',
                        cls: 'product-list',
                        infinite: false,
                        action: 'listecommande',
                        itemTpl: '<div class="list-item {PrioriteCss}">'+
                            '<div class="list-item-col">' +
                                '<h3>{DateCommande} {RefCommande}</h3>'+
                                '<h2>{Nom} {Prenom}</h2>'+
                                '<div>{Adresse} {CodePostal} {Ville}</div>'+
                                '<div>{Tel} {Mail}</div>'+
                            '</div>'+
                            '<div class="list-item-col">' +
                                '<div><b>Commentaires:</b> <br/>{Commentaire}</div>'+
                            '</div>'+
                            '<div class="list-item-col">' +
                                '<div class="list-item-right">{Etat}</div>'+
                                '<div class="list-item-right"><span class="label success">{MontantTTC} € TTC</span></div>'+
                            '</div>'+
                        '</div>',
                        grouped: false,
                        pinHeaders: false,
                        plugins: [
                            {
                                xclass: 'Ext.plugin.ListPaging',
                                autoPaging: true,
                                showAnimation: 'slideIn',
                                loadMoreText: 'Chargement...',
                                noMoreRecordsText: 'Pas plus d\'enregistrements'
                            },
                            {
                                xclass: 'Ext.plugin.PullRefresh',
                                pullText: 'Glissez vers le bas pour rafraichir.',
                                releaseText:'Relachez pour rafraichir.',
                                loadingText: 'Chargement en cours ...',
                                loadedText: 'Chargement reussi.',
                                lastUpdatedText: 'Mise à jour:  ',
                                listeners : {
                                    latestfetched: function () {
                                        console.log('refresh list');
                                        this.getList().getStore().currentPage = 1;
                                        this.getList().getStore().removeAll();
                                        this.getList().getStore().load();
                                    }
                                }
                            }

                        ]
                    }
                ]
            }

        ]
    }
});
