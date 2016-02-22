Ext.define('backapp.view.Produit', {
    extend: 'Ext.Container',
    xtype: 'produit',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'Ext.tab.Panel',
        'Ext.Menu',
        'Ext.Anim',
        'Ext.util.Geolocation'
    ],
    id: 'produit',
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
               title: 'Liste des produits',
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
                       xtype: 'button',
                       text: '',
                       iconCls: 'fa fa-plus',
                       action: 'addproduit',
                       cls: 'open-socials'
                   }
                ]
            },
           {
                align: 'center',
                items:[
                    {
                        title: 'Produits',
                        style: 'overflow:hidden',
                        iconCls: 'home',
                        width: '100%',
                        height: '100%',
                        xtype: 'list',
                        store: 'Produits',
                        cls: 'product-list',
                        infinite: false,
                        action: 'listeproduit',
                        itemTpl: '<div class="product">'+
                        '<img src="'+backapp.utils.Config.getDomain()+'/{Image}.mini.60x60.jpg" class="float-left product-avatar" alt="img">'+
                        '<span class="product-dist product-near">{backappReference} pièces</span>'+
                        '<h2>{Nom} ({Reference})</h2>'+
                        '<span class="product-hours">{TarifText}</span>'+
                            /*'<span class="valet-address">Poids: {Poids}<br />Largeur: {Largeur} <br />Hauteur: {Hauteur} <br /> Profondeur: {Profondeur}</span>'+*/
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
