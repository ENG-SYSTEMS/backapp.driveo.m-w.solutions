Ext.define('backapp.model.Valet', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id',          type: 'int'},
            {name: 'distance',        type: 'integer', convert:function (value,record) {
                function pad (str, max) {
                  str = str.toString();
                  return str.length < max ? pad("0" + str, max) : str;
                }

                if (parseInt(value)!=value) return value;
                return value < 1000 ? value+' m' :
                    (value < 1000000 ?
                        Math.floor(value/1000)+' '+' km'
                        : (Math.floor(value/1000000)+' '+pad(Math.floor(value/1000)-(Math.floor(value/1000000))*1000,3)+' km'));
            }},
            {name: 'firstname',        type: 'string'},
            {name: 'lastname',        type: 'string'},
            {name: 'avatar',        type: 'string',     defaultValue: 'resources/images/default-avatar.jpg', convert: function (value,record) {
                var tt = new Date().getTime();
                return value ? value+'?_dc='+tt : 'resources/images/default-avatar.jpg';
            }},
            {name: 'phone',       type: 'string',     defaultValue: ''},
            {name: 'street',       type: 'string',     defaultValue: ''},
            {name: 'city',       type: 'string',     defaultValue: ''},
            {name: 'postalCode',       type: 'string',     defaultValue: ''},
            {name: 'workStartAt',       type: 'string',     defaultValue: ''},
            {name: 'workEndAt',       type: 'string',     defaultValue: ''},
            {name: 'workStartAtPm',       type: 'string',     defaultValue: '17:00'},
            {name: 'workEndAtPm',       type: 'string',     defaultValue: '23:00'}
        ]
    }
});
