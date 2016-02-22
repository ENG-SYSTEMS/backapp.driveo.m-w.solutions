/**
 * @class Activabackapp.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('backapp.controller.Main', {
    extend: 'Ext.app.Controller',
    /*requires: ['Ext.device.Device'],*/
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            main: '#mainCard',
            /*** general ***/
            closeMenu: '[action=close-menu]',
            back: '[action=back]',
            addproduit: '[action=addproduit]',
            /*** navigation ***/
            menuMain: '[action=menu-main]',
            menuProduit: '[action=menu-produit]',
            menuCommande: '[action=menu-commande]',
            menuOrdonnance: '[action=menu-ordonnance]',
            menuNewOrdonnance: '[action=menu-photo-ordonnance]',

            loginbutton: '[action=loginbutton]',
            logintext: '[action=logintext]',
            domaintext: '[action=domaintext]',
            passtext: '[action=passtext]',
            deconnexion: '[action=deconnexion]'

        },

        control: {
            closeMenu: {
                tap: 'onCloseMenu'
            },
            addproduit: {
                tap: function () {
                    this.redirectTo('product/add');
                }
            },
            loginbutton: {
                tap: 'onLoginTap'
            },
            deconnexion: {
                tap: 'onDeconnexion'
            },
            back: {
                tap: 'onBackTap'
            },
            menuMain: {
                tap: function () {
                    this.redirectTo('main');
                }
            },
            menuProduit: {
                tap: function () {
                    this.redirectTo('produit');
                }
            },
            menuCommande: {
                tap: function () {
                    this.redirectTo('commande');
                }
            },
            menuNewOrdonnance: {
                tap: function () {
                    this.redirectTo('new-ordonnance');
                }
            },
            menuOrdonnance: {
                tap: function () {
                    this.redirectTo('ordonnance');
                }
            }
        },
        routes: {
            /** root cards **/
            'main': 'showMain',
            'produit': 'showProduit',
            'commande': 'showCommande',
            'commande/:id': 'showFicheCommande',
            'ordonnance': 'showOrdonnance',
            'ordonnance/:id': 'showFicheOrdonnance',
            'new-ordonnance': 'showNewOrdonnance',
            'login' : 'showLogin',
            'product/:id': 'showProduct',
            'product/add': 'addProduct',
            'param' : 'showParametres',
            'registration' : 'showRegistration',
            'resetpassword' : 'showResetPassword'
        }
    },
    /***************************
     * CONNEXION / DECONNEXION
     ***************************/
    onDeconnexion: function () {
        console.log('deconnexion utilisateur');
        backapp.utils.Config.getApp().disconnect();
        backapp.utils.Config.hideMenu();
    },
    onLoginTap: function () {
        console.log('login en cours...');
        var curview = Ext.Viewport.getActiveItem();
        //masquage de la vue en cours pendant le chargement
        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false/*
             message: 'Vérification des données utilisateurs ...'*/
        });
        var me = this;
        //verification des champs
        var user = this.getLogintext().getValue();
        var pass = this.getPasstext().getValue();
        var domain = this.getDomaintext().getValue();
        if (domain){
            backapp.utils.Config.setDomain(domain);
        }

        if (user.length&&pass.length&&domain.length) {
            //definition du domaine
            Ext.Ajax.request({
                params: {
                    login: user,
                    pass: pass
                },
                url: backapp.utils.Config.getLoginUrl(),
                useDefaultXhrHeader: false,
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText);
                    console.log('Récupération de la donnée utilisateur');

                    //suppresion de la page de chargement
                    curview.setMasked(null);

                    //test de la réponse
                    if (obj.success) {
                        console.log('Utilisateur connecté', obj);
                        backapp.utils.Config.setCurrentKey(obj.logtoken);
                        backapp.utils.Config.setCurrentUser(obj);
                        backapp.utils.Config.getApp().fireEvent('onLoginSuccess',this);
                    }else{
                        var popup = Ext.Msg.alert('Erreur', obj.msg);
                    }

                },
                failure: function(response, opts) {
                    console.log('Petit problème ' + response.status);

                    //suppresion de la page de chargement
                    curview.setMasked(null);

                    // Basic alert:
                    Ext.Msg.alert('Erreur de connexion', 'Vous ne semblez pas connecté à internet. Si il s\'agit d\'un problème temporaire, pressez "OK" pour réessayer.', function(){
                        return true;
                    });
                }
            });
        }else{
            //un des champs est vide
            Ext.Msg.alert('Erreur de saisie', 'Veuillez saisir un identifiant et un mot de passe.', function(){
                return true;
            });
            curview.setMasked(null);
        }
    },
    /********************************
     * NAVIGATION
     * ******************************/
    onCloseMenu: function () {
        backapp.utils.Config.hideMenu();
        console.log('close menu');
    },
    /***
     * onBackTap
     * On presse le bouton back
     */
    onBackTap: function ( button, e, eOpts ) {
        console.log('itemtap back');
        var appHistory = this.getApplication().getHistory();

        // fire previous route
        appHistory.back();

        // prevent the default navigation view
        // back button behavior from firing
        return false;
    },
    onProduitAddTap: function ( button, e, eOpts ) {
        backapp.utils.Config.hideMenu();
        this.redirectTo('produit/add');
    },
    _indexViews: [],
    _currentView: null,
    _currentLevel: 0,
    manageView: function (level,name_view) {
        //redirection accueil si pas de clef
        if (name_view==this._currentView){
            console.log('meme vue. exit');
            return this._indexViews[name_view];
        }else if (!backapp.utils.Config.getCurrentKey()&&name_view!='backapp.view.Login'&&name_view=='backapp.form.Registration') {
            console.log('perte de clef... attente...');
            //_____________________________________________________________________________________________________________
            //                                                                                                  ANIMATIONS
            //Ext.Viewport.getLayout().setAnimation({type: 'fade', direction: 'right'});
            //_____________________________________________________________________________________________________________
            //backapp.utils.Config.getApp().disconnect();
            return;
        }else if (backapp.utils.Config.getCurrentKey()&&(name_view=='backapp.view.Login'||name_view=='backapp.form.Registration')&&backapp.utils.Config.getCurrentUser()){
            console.log('interdit ya une clef mais la vue est login ou registration et connecté');
            return;
        }else if (backapp.utils.Config.getCurrentKey()&&(name_view!='backapp.view.Login'&&name_view!='backapp.form.Registration')&&!backapp.utils.Config.getCurrentUser()){
            console.log('interdit ya une clef mais la vue est login ou registration et pas de user');
            return;
        }
        console.log('---- show view ----', name_view,'level',level);


        var commview;

        //gestion des effets
        switch (this._currentLevel-level){
            case 1:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'right'});
                //_____________________________________________________________________________________________________________
                break;
            case -1:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'left'});
                //_____________________________________________________________________________________________________________
                break;
            default:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'fade', direction: 'left'});
                //____________________________________________________________________________________________________________
                break;
        }

        //maintenance de l'index des vues chargées
        if (this._indexViews[name_view]){
            console.log();
            commview = this._indexViews[name_view];
        }else{
            this._indexViews[name_view] = commview = Ext.create(name_view);
        }
        this._currentView=name_view;
        Ext.Viewport.setActiveItem(commview);
        this._currentLevel=level;

        return commview;
    },
    /********************************
     * ROUTING
     * ******************************/
    showLogin: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(0,'backapp.view.Login');
    },
    showMain: function () {
        backapp.utils.Config.hideMenu();
        var curview  = this.manageView(0,'backapp.view.Main');
        if (curview)
            curview.setMasked(false);
    },
    showProduit: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(1,'backapp.view.Produit');
    },
    showRegistration: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(1,'backapp.view.Registration');
    },
    showResetPassword: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(1,'backapp.view.ResetPassword');
    },
    showCommande: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(1,'backapp.view.Commande');
    },
    showFicheCommande: function (id) {
        var ficheview = this.manageView(2,'backapp.view.FicheCommande');
        var comStore = Ext.getStore('Commandes');
        var record = comStore.getById(id);
        ficheview.setRecord(record);
    },
    showOrdonnance: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(1,'backapp.view.Ordonnance');
    },
    showNewOrdonnance: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(1,'backapp.view.EnvoyerOrdonnance');
    },
    showFicheOrdonnance: function (id) {
        var ficheview = this.manageView(2,'backapp.view.FicheOrdonnance');
        var ordoStore = Ext.getStore('Ordonnances');
        var record = ordoStore.getById(id);
        ficheview.setRecord(record);
    },
    showProduct: function (id) {
        var ficheview = this.manageView(2,'backapp.view.FicheProduit');
        var valetStore = Ext.getStore('Produits');
        var record = valetStore.getById(id);
        if (ficheview)
            ficheview.setRecord(record);
    }
});
