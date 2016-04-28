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
                width: '100%',
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'driveo-case x-iconalign-top fa fa-shopping-bag success',
                                flex: 1,
                                badgeClas: 'driveo-badge',
                                action: 'menu-commande',
                                html: 'Commandes'
                            },
                            {
                                cls: 'driveo-case fa fa-medkit x-iconalign-top info',
                                xtype: 'button',
                                flex: 1,
                                badgeClas: 'driveo-badge',
                                action: 'menu-ordonnance',
                                html: 'Ordonnances'
                            },
                            {
                                cls: 'driveo-case fa fa-envelope  x-iconalign-top',
                                xtype: 'button',
                                flex: 1,
                                action: 'menu-message',
                                html: 'Messages'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        cls: 'driveo-case warning text',
                        html: '<h2>Dernières Commandes</h2>'
                    },
                    {
                        title: 'Commandes',
                        iconCls: 'cart',
                        width: '100%',
                        height: '240px',
                        scrollable: false,
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
                        pinHeaders: false
                    },
                    {
                        layout: 'hbox',
                        cls: 'driveo-case success text',
                        html: '<h2>Dernières Ordonnances</h2>'
                    },
                    {
                        title: 'Ordonnances',
                        width: '100%',
                        height: '210px',
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
                        pinHeaders: false
                    }
                ]
            }
        ],
        listeners: {
            initialize: function(item){
                var me = this;
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

                var commandes = Ext.getStore('Commandes'),
                    ordonnances = Ext.getStore('Ordonnances');

                commandes.on('load',function () {
                    me.refreshData();
                },this);

                ordonnances.on('load',function () {
                    me.refreshData();
                },this);
            }
        }
    },
    refreshData: function () {
        //Définition des commandes
        var commandes = Ext.getStore('Commandes'),
            commande_input = this.down('[action=menu-commande]'),
            commandes_actives = 0,
            commandes_urgences = 0;

        //recherche des commandes
        commandes.findBy(function (record){
            if (!record.get('Cloture')){
                if (record.get('Valide'))
                    commandes_actives++;
                if (record.get('Priorite')>=40)
                    commandes_urgences++;
            }
        });

        commande_input.setHtml('Il y a '+commandes_actives+' commande(s) en cours.<br /> et '+commandes_urgences+' à traiter');
        commande_input.setBadgeText(commandes_urgences);
        commande_input.removeCls('danger');
        if (commandes_urgences>0)commande_input.addCls('danger');

        //Définition des ordonnances
        var ordonnances = Ext.getStore('Ordonnances'),
            ordonnances_input = this.down('[action=menu-ordonnance]'),
            ordonnances_actives = 0,
            ordonnances_urgences = 0;

        //recherche des commandes
        ordonnances.findBy(function (record){
            if (record.get('Etat')<4){
                ordonnances_actives++;
            }
            if (record.get('Priorite')>=40){
                ordonnances_urgences++;
            }
        });

        ordonnances_input.setHtml('Il y a '+ordonnances_actives+' ordonnance(s) en cours.<br /> et '+ordonnances_urgences+' à traiter');
        ordonnances_input.removeCls('danger');
        ordonnances_input.setBadgeText(ordonnances_urgences);
        if (ordonnances_urgences>0){
            ordonnances_input.addCls('danger');
        }
    }
});
