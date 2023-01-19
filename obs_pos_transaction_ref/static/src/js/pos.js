odoo.define('obs_pos_transaction_ref.obs_pos_transaction_ref', function (require) {
"use strict";

var models = require('point_of_sale.models');
var core = require('web.core');
var QWeb = core.qweb;
var _t = core._t;
const { Gui } = require('point_of_sale.Gui');


	var _super_posmodel = models.PosModel.prototype;
	models.PosModel = models.PosModel.extend({
		initialize: function (session, attributes) {
			
			var payment_method = _.find(this.models, function(model){ return model.model === 'pos.payment.method'; });
			payment_method.fields.push('hide_pay_ref');

			return _super_posmodel.initialize.call(this, session, attributes);

		},

	});


	var OrderSuper = models.Order.prototype;
	models.Order = models.Order.extend({
		initialize: function(attr,options){
			OrderSuper.initialize.apply(this, arguments);
		},

		async add_paymentline(payment_method) {
			let line = OrderSuper.add_paymentline.apply(this, arguments);
			if(payment_method.hide_pay_ref){

				if(this.pos.config.allow_payment_ref){
					const { confirmed, payload: newName } = await Gui.showPopup('PaymentRefData', {
						title: _t('Payment Reference'),
					});
					
					if (newName) {
						line.set_transaction_reference(newName['inputRef']);
						line.set_value(newName['inputValue']);
						line.set_bank_name(newName['inputBank']);
						line.set_data(newName['inputData']);
					}
				}
			}
			
			return line;
		},
	});

	var PaymentlineSuper = models.Paymentline;
	models.Paymentline = models.Paymentline.extend({
		initialize: function(attributes, options){
			var self = this;
			PaymentlineSuper.prototype.initialize.apply(this, arguments);
			this.transaction_reference = this.transaction_reference || "";
			this.value = this.value || "";
			this.bank_name = this.bank_name || "";
			this.data = this.data || "";
		},
		set_transaction_reference: function(transaction_reference){
            this.transaction_reference = transaction_reference;
            this.trigger('change',this);
        },
        set_value: function(value){
            this.value = value;
            this.trigger('change',this);
        },
        set_bank_name: function(bank_name){
            this.bank_name = bank_name;
            this.trigger('change',this);
        },
        set_data: function(data){
            this.data = data;
            this.trigger('change',this);
        },
        get_transaction_reference: function(){
            return this.transaction_reference;
        },
        get_value: function(){
            return this.value;
        },
        get_bank_name: function(){
            return this.bank_name;
        },
        get_data: function(){
            return this.data;
        },
		export_as_JSON: function(){
			var data = PaymentlineSuper.prototype.export_as_JSON.apply(this, arguments);
			data.transaction_reference = this.transaction_reference || "";
			data.value = this.value || "";
			data.bank_name = this.bank_name || "";
			data.data = this.data || "";
			return data;
		},
		init_from_JSON: function(json){
			PaymentlineSuper.prototype.init_from_JSON.apply(this,arguments);
			this.transaction_reference = json.transaction_reference || "";
			this.value = json.value || "";
			this.bank_name = json.bank_name || "";
			this.data = json.data || "";
		},
	});
});

