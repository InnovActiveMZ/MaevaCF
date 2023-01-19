odoo.define('obs_pos_transaction_ref.PaymentRefData', function(require) {
	"use strict";

	const { useState, useRef } = owl.hooks;
    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const { _lt } = require('@web/core/l10n/translation');

    class PaymentRefData extends AbstractAwaitablePopup {
        constructor() {
            super(...arguments);

            this.state = useState({ 
            	inputRef: this.props.startingRef,
            	inputValue: this.props.startingValue,
            	inputBank: this.props.startingBank,
            	inputData: this.props.startingData,
            });
            this.inputRef = useRef('inputRef');
            this.inputValue = useRef('inputValue');
            this.inputBank = useRef('inputBank');
            this.inputData = useRef('inputData');
        }
        mounted() {
            this.inputRef.el.focus();
        }
        getPayload() {
            return this.state;
        }
    }
    PaymentRefData.template = 'PaymentRefData';
    PaymentRefData.defaultProps = {
        confirmText: _lt('Ok'),
        cancelText: _lt('Cancel'),
        title: '',
        body: '',
        startingRef: '',
        startingValue: '',
        startingBank: '',
        startingData: '',
    };

    Registries.Component.add(PaymentRefData);
 
});
