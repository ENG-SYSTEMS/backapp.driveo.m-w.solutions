Ext.define('backapp.view.Ordonnance', {
    extend: 'Ext.Container',
    xtype: 'ordonnance',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'Ext.tab.Panel',
        'Ext.Menu',
        'Ext.Anim',
        'Ext.util.Geolocation'
    ],
    id: 'ordonnance',
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
               title: 'Liste des ordonnances',
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
                        title: 'Ordonnances',
                        style: 'overflow:hidden',
                        iconCls: 'cart',
                        width: '100%',
                        height: '100%',
                        xtype: 'list',
                        store: 'Ordonnances',
                        cls: 'product-list',
                        infinite: false,
                        action: 'listeordonnance',
                        itemTpl: '<div class="list-item {PrioriteCss}">'+
                            '<div class="list-item-col">' +
                                '<img src="'+backapp.utils.Config.getDomain()+'/{Image}.mini.60x60.jpg" class="float-left product-avatar" alt="img">'+
                                '<h3>{Date}</h3>'+
                                '<h2>{Nom} {Prenom}</h2>'+
                                '<div>{Adresse} {CodPos} {Ville}</div>'+
                                '<div>{Tel} {Email}</div>'+
                            '</div>'+
                            '<div class="list-item-col">' +
                                '<div><b>Commentaires:</b> <br/>{Commentaire}</div>'+
                            '</div>'+
                            '<div class="list-item-col">' +
                                '{EtatText}'+
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
