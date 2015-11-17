Ext.define('backapp.model.Car', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id',          type: 'int'},
            {name: 'created_at',        type: 'date'/*, convert: function (value,record) {
                return '06/01/2015 18:35';
            }*/},
            {name: 'photo',        type: 'string',     defaultValue: 'resources/images/default-avatar.jpg', convert: function (value,record) {
                var tt = new Date().getTime();
                return value ? value+'?_dc='+tt : 'resources/images/default-avatar.jpg';
                //return 'resources/images/default-car.jpg';
            }},
            {name: 'name',      type: 'string'},
            {name: 'description',        type: 'string'},
            {name: 'brand',        type: 'string', defaultValue: 'Bmw'},
            {name: 'model',        type: 'string', defaultValue: 'X5 3.0D'},
            {name: 'registration',       type: 'string', defaultValue: ''},
            {name: 'color',       type: 'string', defaultValue: 'Noir'}
        ]
    }
});
