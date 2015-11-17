/**
 * The picker with hours and minutes slots
 */
Ext.define('backapp.utils.TimePicker', {
    extend:'Ext.picker.Picker',
    xtype:'timepicker',
    requires: [
        'backapp.utils.Slot'
    ],

    config:{
        /**
         * @cfg {Number} increment The number of minutes between each minute value in the list.
         * Defaults to: 5
         */
        increment:5,


        /**
         * @cfg {Number} start value of hours
         */
        minHours:0,


        /**
         * @cfg {Number} end value of hours.
         */
        maxHours:23,


        /**
         * @cfg {String} title to show above hour slot
         * Note: for titles to show set the {useTitle} config to true.
         */
        hoursTitle:'Heures',


        /**
         * @cfg {String} title to show above hour slot
         * Note: for this to show set the {useTitle} config to true.
         */
        minutesTitle:'Minutes',


        /**
         * @cfg {boolean} show/hide title headers.
         * Note: defaults to false (framework default 'Ext.picker.Picker')
         */


        slots: [],
        useTitles: true
        //renderTo: Ext.getCmp('sidemenu')
    },
/*    show: function() {
        this.callParent(arguments);
        Ext.getCmp('sidemenu').add(this);

        var cont = Ext.get('ext-viewport');
        cont.setStyle('z-index',-1);

        backapp.utils.Config.unsetSwipe();

    },
    hide: function() {
        this.callParent(arguments);
        var cont = Ext.get('ext-viewport');
        cont.setStyle('z-index',9);

        backapp.utils.Config.setSwipe();
    },*/
    /**
     *
     * @param value
     * @param animated
     */
    setValue:function (values, animated) {
        if (!values) return;
        var increment = this.getInitialConfig().increment,
            modulo;


        if (Ext.isDate(values)) {
            values = {
                hours: values.getHours(),
                minutes: values.getMinutes()
            };
        }
        //Round minutes
        modulo = values.minutes % increment;
        if (modulo > 0) {
            values.minutes = Math.round(values.minutes / increment) * increment;
        }

        /** original **/
        var me = this,
            slots = me.getInnerItems(),
            ln = slots.length,
            key, slot, loopSlot, i, value;

        if (!values) {
            values = {};
            for (i = 0; i < ln; i++) {
                //set the value to false so the slot will return null when getValue is called
                values[slots[i].config.name] = null;
            }
        }

        for (key in values) {
            slot = null;
            value = values[key];
            for (i = 0; i < slots.length; i++) {
                loopSlot = slots[i];
                if (loopSlot.config.name == key) {
                    slot = loopSlot;
                    break;
                }
            }

            if (slot) {
                if (animated) {
                    slot.setValueAnimated(value);
                } else {
                    slot.setValue(value);
                }
            }
        }

        me._values = me._value = values;
    },


    /**
     * @override
     * @returns {Date} A date object containing the selected hours and minutes. Year, month, day default to the current date..
     */
    getValue:function () {
        var value = this.callParent(arguments),
            date = new Date();
        value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), value.hours, value.minutes);
        return value;
    },


    applySlots:function (slots) {
        var me = this,
            hours = me.createHoursSlot(),
            minutes = me.createMinutesSlot();


        return [hours, minutes];
    },


    createHoursSlot:function () {
        var me = this,
            initialConfig = me.getInitialConfig(),
            title = initialConfig.hoursTitle ,
            minHours = initialConfig.minHours,
            maxHours = initialConfig.maxHours,
            hours = [],
            slot;


        for (var i = minHours; i <= maxHours; i++) {
            var text = (i < 10) ? ('0' + i) : i; //Add leading zero
            hours.push({text:text, value:i});
        }


        slot = {
            name:'hours',
            align:'center',
            title:title,
            data:hours,
            flex:1,
            value: 14
        };

        return slot;
    },


    createMinutesSlot:function () {
        var me = this,
            initialConfig = me.getInitialConfig(),
            title = initialConfig.minutesTitle ,
            increment = initialConfig.increment,
            minutes = [],
            slot;


        for (var j = 0; j < 60; j += increment) {
            var text;
            text = (j < 10) ? ('0' + j) : j; //Add leading zero
            minutes.push({text:text, value:j});
        }


        slot = {
            name:'minutes',
            align:'center',
            title:title,
            data:minutes,
            flex:1,
            value: 15
        };
        return slot;
    }
});
