Ext.define('backapp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'Ext.tab.Panel',
        'Ext.Menu',
        'Ext.Anim',
        'Ext.util.Geolocation',
        'backapp.form.Profil'
    ],
    id: 'mainCard',
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
            }/*,
            {
                xtype: 'toolbar',
                action:'credit-display',
                docked: 'bottom',
                title: backapp.utils.Config.getCreditString(),
                cls: 'footer'
            }*/,
           {
                align: 'center',
                items:[
                    {
                        title: 'Accueil',
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
                        '<img src="http://admin.madeinchina.boutique/{Image}.mini.60x60.jpg" class="float-left product-avatar" alt="img">'+
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

        ],
        listeners: {
            initialize: function(item){
                //initialisation de l'ecouteur pour les adresses
                /*var me = this;
                backapp.utils.Config.addListener('locationUpdate',function () {
                    console.log('location update ',backapp.utils.Config.getAddress());
                    me.updateAddress(backapp.utils.Config.getAddress());
                });
                me.updateAddress(backapp.utils.Config.getAddress());*/

                //ecouteur nombre de crédits
                /*backapp.utils.Config.addListener('creditupdate',function () {
                    console.log('credit update ',backapp.utils.Config.getCreditString());
                    me.updateCredit(backapp.utils.Config.getCreditString());
                });
                me.updateCredit(backapp.utils.Config.getCreditString());*/


                //initialisation du menu
                var leftmenu = Ext.create('Ext.Panel', {
                    id: 'sidemenu',
                    scrollable: false,
                    height: '100%',
                    width: '100%',
                    items: [
                        {
                            xtype: 'menu',
                            width: 265,
                            scrollable: false,
                            style: 'top: -10%;',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            cls: 'snap-drawer snap-drawer-left',
                            items: [
                                {
                                    action: 'close-menu',
                                    cls: 'sidebar-header',
                                    html: '<a href="#" class="sidebar-logo"></a>'
                                    /*'<a href="#" class="sidebar-close"><i class="fa fa-times"></i></a>'*/
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-main',
                                    html: '<i class="fa fa-crosshairs"></i>' +
                                    '<strong>Liste des produits</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-contact',
                                    html: '<i class="fa fa-list"></i>' +
                                    '<strong>Nouvelle vente</strong>'
                                }/*,
                                {
                                    cls: 'menu-item',
                                    action: 'menu-param',
                                    html: '<i class="fa fa-cogs"></i>' +
                                    '<strong>Paramètres</strong>'
                                }*/,
                                {
                                    cls: 'menu-item',
                                    action: 'deconnexion',
                                    html: '<i class="fa fa-sign-out"></i>' +
                                    '<strong>Déconnexion</strong>'
                                }

                            ]
                        }
                    ]
                });

                //set menu left
                /*Ext.Viewport.setMenu(leftmenu,{
                    side: 'left',
                    reveal: true
                });*/
                Ext.getBody().insertFirst(leftmenu.element);

                backapp.utils.Config.setElementMenu(leftmenu.element);

                //swipe menu
                backapp.utils.Config.setSwipe();

                //ouverture du menu à l'initialisation
                backapp.utils.Config.showMenu();
            }
        }
    }/*,
    updateAddress: function (address){

        //mise à jour de l'adresse
        var addr =
            '<div class="valet-search m-bluegrey-bg-100 m-bluegrey-borderb-400">'+
            '<span class="valet-search-address">'+backapp.utils.Config.getAddress()+'</span>'+
            '</div>';
        this.down('[action=address-display]').setHtml(addr);
    },
    updateCredit: function (address){

        //mise à jour du nombre de crédits
        this.down('[action=credit-display]').setTitle(address);
    }*/
});
