Ext.define('backapp.utils.Config', {
    singleton : true,
    mixins: ['Ext.mixin.Observable'],
    alias : 'utils.Config',
    config : {
        logkeyUrl: 'http://app.madeinchina.boutique/Systeme/Connexion/getToken.json',
        loginUrl: 'http://app.madeinchina.boutique/Systeme/Connexion/login.json',
        checkAlreadyLoggedUrl: 'http://app.madeinchina.boutique/Systeme/Connexion/isLogged.json',

        venteSaveUrl: 'http://app.madeinchina.boutique/Boutique/Contact/Save.json',
        produitSaveUrl: 'http://app.madeinchina.boutique/Boutique/Produit/',

        /**
         * user login definition
         */
        currentKey: '',
        address: 'Adresse en cours d\'acquisition...',
        currentUser: null,
        /**
         * views
         */
        mainView:null,
        /**
         * Root app
         */
        app:null,
        /**
         * Geoloc object
         */
        geo: null,
        currentLat: null,
        currentLng: null,
        altitude: null,
        speed: null,
        heading: null
    },
    constructor: function(config) {
        this.initConfig(config);
        this.callParent([config]);
    },
    /***
     * initLocation
     * Initialisation de l'objet de localisation
     */
    initLocation: function () {
        var me = this;
        if (!this.getGeo()){
            console.log('creation de l objet geoloc');
            this.setGeo(Ext.create('Ext.util.Geolocation', {
                autoUpdate: false,
                listeners: {
                    locationupdate: function(geo) {
                        me.setCurrentLat(geo.getLatitude());
                        me.setCurrentLng(geo.getLongitude());
                        me.setAltitude(geo.getAltitude());
                        me.setSpeed(geo.getSpeed());
                        me.setHeading(geo.getHeading());
                        console.log('location update '+me.getCurrentLat()+' '+me.getCurrentLng());
                        backapp.utils.Config.getCurrentAddressFromLocation(me.getCurrentLat(), me.getCurrentLng());
                    },
                    locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                        if(bTimeout)
                            console.log('Timeout occurred',"Could not get current position");
                        else
                            console.log('Error occurred.',message);
                        }
                    }
                })
            );
        }
        
        //mise à jour de la localisation
        this.getGeo().updateLocation();
    },
    /***
     * getCurrentAddressFromLocation
     * Recuperation de l'adresse depuis l API GOOGLE PLACE
     */
    getCurrentAddressFromLocation: function (lat,lng) {
        var geocoder = new google.maps.Geocoder(),
            latlng   = new google.maps.LatLng(lat, lng);

        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log(results[0].formatted_address);
                    backapp.utils.Config.setAddress(results[0].formatted_address);
                    backapp.utils.Config.fireEvent('locationUpdate',backapp.utils.Config);
                } else {
                    console.info("No results found");
                }
            } else {
                console.info("Geocoder failed due to: " + status);
            }
        });
    },
    updateLocation: function () {
        this.getGeo().updateLocation();
    },
    resetKey: function () {
        this.setCurrentKey(null);
        this.setCurrentUser(null);
        localStorage.removeItem('key');
        localStorage.removeItem('user_id');
    },
    /********************************
     * MENU ANIMATION
     * ******************************/
    showMenu: function () {
        var menu = Ext.select('#sidemenu');
        if(menu){
            var cont = Ext.get('ext-viewport');
            //start animation
            cont.addCls('body-animated');
            menu.addCls('menu-animated');
            setTimeout(function() {
                cont.on({
                    tap: function (e) {
                        e.stopEvent();
                        backapp.utils.Config.hideMenu();
                    }/*,
                    swipe: function(e, node, options) {
                        if(e.direction == "left") {
                            //alert("Hey! I swipe left");
                            backapp.utils.Config.hideMenu();
                        } else {
                            //alert("Hey! I swipe right");
                        }
                    }*/
                });
            }, 400);
        }
    },
    hideMenu: function () {
        console.log('--> hide menu');
        var menu = Ext.select('#sidemenu');
        if(menu){
            var cont = Ext.get('ext-viewport');
            cont.clearListeners();
            //start animation
            cont.removeCls('body-animated');
            menu.removeCls('menu-animated');
        }
    },
    toggleMenu: function () {
        console.log('togglemenu');
        var menu = Ext.select('#sidemenu.menu-animated');
        if(menu.elements.length){
            backapp.utils.Config.hideMenu();
        }else{
            backapp.utils.Config.showMenu();
        }
    },
    getCreditString: function () {
        if (this.getCurrentUser())
            if (this.getCurrentUser().credit > 0){
                return 'Il vous reste '+this.getNbCredits()+' crédits.';
            }else{
                return 'Aucun crédit. Cliquez ici pour acheter des crédits';
            }
        else return 'Nombre de crédits en cours d\'acquisition ...';
    },
    _elementMenu: null,
    setElementMenu: function (el) {
        this._elementMenu = el;
    },
    resetElementMenu: function () {
        if (this._elementMenu) {
            console.log('destruction du menu',this._elementMenu);
            Ext.getBody().removeChild(this._elementMenu);
        }
    },
    restoreElementMenu: function (el) {
        if (this._elementMenu)
            Ext.getBody().insertFirst(this._elementMenu);
    },
    setSwipe: function () {
        if (this._elementMenu){
            //swipe menu
            this._elementMenu.on('swipe', this.onSwipe);
            //swipe bpdy
            Ext.Viewport.bodyElement.on('swipe', this.onSwipe);
        }
    },
    unsetSwipe: function () {
        if (this._elementMenu) {
            console.log('unswipe ',this._elementMenu);
            this._elementMenu.removeListener('swipe',this.onSwipe);
            Ext.Viewport.bodyElement.clearListeners();
        }
    },
    onSwipe: function (event, node, options) {
        console.log('swipe');
        if (event.direction == "right") {
            backapp.utils.Config.showMenu();
        } else {
            backapp.utils.Config.hideMenu();
        }
    }
});
