const cardsActions = require('./cards-actions');
const loginActions = require('./login-actions');

module.exports = {
    ...cardsActions,
    ...loginActions
};