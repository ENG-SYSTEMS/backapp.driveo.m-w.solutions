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
            menuContact: '[action=menu-contact]',
/*            menuParam: '[action=menu-param]',*/
            menuQrcode: '[action=menu-qrcode]',
            loginbutton: '[action=loginbutton]',
            logintext: '[action=logintext]',
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
            /*menuParam: {
                tap: function () {
                    this.redirectTo('param');
                }
            },*/
            menuContact: {
                tap: function () {
                    this.redirectTo('contact');
                }
            }
        },
        routes: {
            /** root cards **/
            'main': 'showMain',
            'contact': 'showContact',
            'qrcode': 'showQrCode',
            'login' : 'showLogin',
            'product/:id': 'showProduct',
            'product/add': 'addProduct',
            'param' : 'showParametres'
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
        if (user.length&&pass.length) {
            Ext.Ajax.request({
                params: {
                    login: user,
                    pass: pass
                },
                url: backapp.utils.Config.getLoginUrl(),
/*                url: backapp.utils.Config.getLoginUrl()+user+'/'+pass+'/'+backapp.utils.Config.getCurrentKey(),*/
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
                    var popup = Ext.Msg.alert('Erreur de connexion', 'Vous ne semblez pas connecté à internet. Si il s\'agit d\'un problème temporaire, pressez "OK" pour réessayer.', function(){
                        return true;
                    });
                }
            });
        }else{
            //un des champs est vide
            var popup = Ext.Msg.alert('Erreur de saisie', 'Veuillez saisir un identifiant et un mot de passe.', function(){
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
    _currentLevel: 0,
    manageView: function (level,name_view) {
        console.log('---- show view ----', name_view,'level',level);

        //redirection accueil si pas de clef
        if (!backapp.utils.Config.getCurrentKey()&& name_view!='backapp.view.Login') {
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
    showContact: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(1,'backapp.view.Vente');
    },
    showQrCode: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(1,'backapp.view.Qrcode');
    },
    showParametres: function () {
        backapp.utils.Config.hideMenu();
        this.manageView(0,'backapp.view.Parametres');
    },
    showProduct: function (id) {
        var ficheview = Ext.create('backapp.view.FicheProduit');
        Ext.Viewport.setActiveItem(ficheview);
        this._currentLevel = 1;
        var valetStore = Ext.getStore('Produits');
        var record = valetStore.getById(id);
        ficheview.setRecord(record);
    },
    addProduct: function () {
        var ficheview = Ext.create('backapp.view.FicheProduit');
        Ext.Viewport.setActiveItem(ficheview);
        this._currentLevel = 1;
/*        var valetStore = Ext.getStore('Produits');
        var record = valetStore.get
        ficheview.setRecord(record);*/
    }
 });
