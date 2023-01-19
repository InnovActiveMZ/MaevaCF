odoo.define('obs_pos_transaction_ref.PaymentScreen', function(require) {
	"use strict";

	const { Component } = owl;
	const { debounce } = owl.utils;
	const PosComponent = require('point_of_sale.PosComponent');
	const { useState, useRef } = owl.hooks;
	const { useListener } = require('web.custom_hooks');
	const Registries = require('point_of_sale.Registries');
	const PaymentScreen = require('point_of_sale.PaymentScreen');

	const CustomPaymentScreen = (PaymentScreen) =>
		class extends PaymentScreen {
			constructor() {
				super(...arguments);
				useListener('change-payment-ref', this.changePaymentRef);
			}	

			async changePaymentRef(event){
				const { cid } = event.detail;
				const line = this.paymentLines.find((line) => line.cid === cid);
				const { confirmed, payload: newName } = await this.showPopup('PaymentRefData', {
					startingRef: line.transaction_reference,
					startingValue: line.value,
					startingBank: line.bank_name,
					startingData: line.data,
					title: this.env._t('Payment Reference'),
				});
					
				if (newName) {
					line.set_transaction_reference(newName['inputRef']);
					line.set_value(newName['inputValue']);
					line.set_bank_name(newName['inputBank']);
					line.set_data(newName['inputData']);
				}
			}
	};

	Registries.Component.extend(PaymentScreen, CustomPaymentScreen);
	return PaymentScreen;
 
});
