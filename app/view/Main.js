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
        'Ext.util.Geolocation'
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
               title: 'Tableau de bord',
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
                ]
            }

        ],
        listeners: {
            initialize: function(item){

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
                                    html: '<i class="fa fa-tablet"></i>' +
                                    '<strong>Tableau de bord</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-produit',
                                    html: '<i class="fa fa-list"></i>' +
                                    '<strong>Liste des produits</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-commande',
                                    html: '<i class="fa fa-shopping-cart"></i>' +
                                    '<strong>Liste des commandes</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-ordonnance',
                                    html: '<i class="fa fa-pagelines"></i>' +
                                    '<strong>Liste des ordonnances</strong>'
                                },
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
    }
});
