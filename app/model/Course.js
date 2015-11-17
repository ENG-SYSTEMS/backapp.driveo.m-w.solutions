Ext.define('backapp.model.Course', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id',          type: 'int'},
            {name: 'start_at_u',          type: 'int'},
            {name: 'end_at_u',          type: 'int'},
            {name: 'end_at',        type: 'date', convert: function (value,record) {
                var d = new Date();
                d.setTime(parseInt(record.get('end_at_u'))*1000);
                return d.getHours()+':'+ d.getMinutes();
            }},
            {name: 'start_at',        type: 'date', convert: function (value,record) {
                var d = new Date();
                d.setTime(parseInt(record.get('start_at_u'))*1000);
                return d.toLocaleDateString()+' à '+ d.getHours()+':'+ d.getMinutes();
            }},
            {name: 'app_time',      type: 'string'},
            {name: 'amount',        type: 'float'},
            {name: 'user_comment',        type: 'string'},
            {name: 'valet_comment',        type: 'string'},
            {name: 'firstname',        type: 'string', defaultValue: 'Truc'},
            {name: 'lastname',        type: 'string', defaultValue: 'Muche'},
            {name: 'avatar',        type: 'string',     defaultValue: 'resources/images/default-avatar.jpg', convert: function (value,record) {
                var tt = new Date().getTime();
                return value ? value+'?_dc='+tt : 'resources/images/default-avatar.jpg';
            }},
            {name: 'phone',       type: 'string', defaultValue: '0665986598'},
            {name: 'street',       type: 'string', defaultValue: 'Rue de la route'},
            {name: 'city',       type: 'string', defaultValue: 'Paris'},
            {name: 'postalCode',       type: 'string', defaultValue: '75002'},
            {name: 'client',       type: 'string', defaultValue: 'Jérémy lecouvert'},
            {name: 'vehicule',       type: 'boolean', defaultValue: false},
            {name: 'vehicule_photo',     defaultValue: 'resources/images/default-car.jpg', convert: function (value,record) {
                var tt = new Date().getTime();
                return value ? value+'?_dc='+tt : 'resources/images/default-car.jpg';
            }},
            {name: 'vehicule_name',       type: 'string', defaultValue: '', convert: function (value,record){
                if (!record.get('vehicule'))
                    return 'Pas de véhicule défini';
                else return value;

            }},
            {name: 'vehicule_detail', convert: function (value, record){
                if (record.get('vehicule')){
                    return record.get('vehicule_brand')+' '+record.get('vehicule_model');
                }else return 'Aucun véhicule sélectionné';
            }},
            {name: 'vehicule_brand',       type: 'string', defaultValue: ''},
            {name: 'vehicule_model',       type: 'string', defaultValue: ''}
        ]
    }
});
