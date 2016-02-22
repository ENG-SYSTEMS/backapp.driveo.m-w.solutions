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
                        action: 'listeproduit',
                        itemTpl: '<div class="product">'+
                        '<span class="product-dist product-near">{MontantTTC} € TTC</span>'+
                        '<h2>({Reference})</h2>'+
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
