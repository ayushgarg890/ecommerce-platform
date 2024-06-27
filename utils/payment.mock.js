const nock = require('nock');

const stripeBaseUrl = 'https://api.stripe.com';

const generateCustomId = () => {
    const prefix = 'PAY';
    const randomString = Math.random().toString(36).substr(2, 9);
    const timestamp = Date.now().toString(36);
    return `${prefix}_${timestamp}_${randomString}`;
};

const mockPayment = async (amount) => {
    nock(stripeBaseUrl)
        .post('/v1/charges')
        .reply(function() {
            const shouldFail = Math.random() < 0.3;
            if (!shouldFail) {
                return [400, {
                    error: {
                        id: generateCustomId(),
                        message: 'Payment failed',
                        type: 'card_error'
                    }
                }];
            } else {
                return [200, {
                    id: generateCustomId(),
                    amount: amount,
                    currency: 'inr',
                    status: 'succeeded',
                    payment_method: "card",
                    payment_method_details: {
                        card: {
                            brand: 'visa',
                        }
                    }
                }];
            }
        });
};


module.exports = {
  mockPayment
};
