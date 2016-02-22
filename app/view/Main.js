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
        'Ext.Label'
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
                width: '80%',
                layout: {
                    type: 'vbox'
                },
                style: 'margin: 10px 10%',
                items: [
                    {
                        cls: 'driv-panel warning',
                        items: [
                            {
                                html: '<h2>Ordonnances en cours</h2>'
                            },
                            {
                                action: 'ordonnances-info',
                                style: 'margin: 0 0 10px 0',
                                html: '<div>Il n\'y a pas d\'ordonnance en cours.</div>'
                            },
                            {
                                xtype: 'button',
                                width: '100%',
                                cls: 'ypm-button warning',
                                action: 'menu-ordonnance',
                                text: 'Liste des ordonnances'
                            }
                        ]
                    },
                    {
                        cls: 'driv-panel warning',
                        items: [
                            {
                                html: '<h2>Commandes en cours</h2>'
                            },
                            {
                                action: 'commandes-info',
                                style: 'margin: 0 0 10px 0',
                                html: '<div>Il n\'y a pas de commande en cours.</div>'
                            },
                            {
                                xtype: 'button',
                                width: '100%',
                                cls: 'ypm-button warning',
                                action: 'menu-commande',
                                text: 'Liste des commandes'
                            },
                            {
                                xtype: 'button',
                                width: '100%',
                                cls: 'ypm-button',
                                action: 'menu-produit',
                                text: 'Parcourir les produits'
                            }
                        ]
                    }
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
                            layout: {
                                type: 'vbox',
                                pack: 'top'
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
                                /*{
                                    cls: 'menu-item',
                                    action: 'menu-produit',
                                    html: '<i class="fa fa-list"></i>' +
                                    '<strong>Liste des produits</strong>'
                                },*/
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
        },
        refreshData: function () {
            //Définition des commandes
            var commandes = Ext.getStore('Commandes'),
                commande_input = this.down('[action=commandes-info]'),
                tab_commande = [],
                panier_encours = [];

            //recherche des commandes
            commandes.findBy(function (record){
                if (!record.get('Cloture')){
                    if (record.get('Valide'))
                        tab_commande.push(record);
                    else
                        panier_encours.push(record);
                }
            });

            //mise à jour des contenus
            if (tab_commande.length==0){
                commande_input.setHtml('<div>Il n\'y a pas de commande en cours.</div>');
            }else{
                commande_input.setHtml('<div>Il y a '+tab_commande.length+' commande(s) en cours.</div>');
            }

            //Définition des ordonnances
            var ordonnances = Ext.getStore('Ordonnances'),
                ordonnances_input = this.down('[action=ordonnances-info]'),
                tab_ordonnance = [];

            //recherche des commandes
            ordonnances.findBy(function (record){
                if (record.get('Etat')<4){
                    tab_ordonnance.push(record);
                }
            });

            //mise à jour des contenus
            if (tab_ordonnance.length==0){
                ordonnances_input.setHtml('<div>Il n\'y a pas d\'ordonnance en cours.</div>');
            }else{
                ordonnances_input.setHtml('<div>Il y a '+tab_ordonnance.length+' ordonnance(s) en cours.</div>');
            }

        }
    }
});
