'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Local dependencies
 */
var _require = require('@solid/jose'),
    JWT = _require.JWT;

var REQUIRED_CLAIMS = ['iss', 'sub', 'aud', 'exp', 'iat'];

var TokenClaimsSet = function () {
  /**
   * Claims inherited from JWT:
   * @param iss {string} Issuer URL
   * @param sub {string} Subject identifier
   * @param aud {string|Array<string>} Audience
   * @param exp {number} Expiration (seconds since epoch, RFC3339)
   * @param iat {number} Expiration (seconds since epoch, RFC3339)
   * @param [nbf] {number} Not Before (seconds since epoch, RFC3339)
   * @param [jti] {string} JWT Identifier
   *
   * Claims specific to ID Token:
   * @param [auth_time] {number} Time when user authn occurred (RFC3339)
   * @param [nonce] {string}
   * @param [acr] {string} Authentication Context Class Reference
   * @param [amr] {string} Authentication Methods References
   * @param [azp] {string} Authorized party
   */
  function TokenClaimsSet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        iss = _ref.iss,
        sub = _ref.sub,
        aud = _ref.aud,
        exp = _ref.exp,
        iat = _ref.iat,
        nbf = _ref.nbf,
        jti = _ref.jti,
        auth_time = _ref.auth_time,
        nonce = _ref.nonce,
        acr = _ref.acr,
        amr = _ref.amr;

    _classCallCheck(this, TokenClaimsSet);

    this.iss = iss;
    this.sub = sub;
    this.aud = aud;
    this.exp = exp;
    this.iat = iat;
    this.nbf = nbf;
    this.jti = jti;
    this.auth_time = auth_time;
    this.nonce = nonce;
    this.acr = acr;
    this.amr = amr;
  }

  _createClass(TokenClaimsSet, [{
    key: 'validate',
    value: function validate() {
      var valid = true;
      var error = void 0;
      try {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = REQUIRED_CLAIMS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var claim = _step.value;

            if (!this[claim]) {
              valid = false;
              throw new Error('Required claim ' + claim + ' is missing.');
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } catch (validationError) {
        error = validationError;
      }
      return { valid: valid, error: error };
    }
  }]);

  return TokenClaimsSet;
}();

/**
 * IDToken
 */


var IDToken = function (_JWT) {
  _inherits(IDToken, _JWT);

  function IDToken() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, IDToken);

    var _this = _possibleConstructorReturn(this, (IDToken.__proto__ || Object.getPrototypeOf(IDToken)).call(this, data));

    _this.payload = new TokenClaimsSet(data.payload);
    return _this;
  }

  _createClass(IDToken, [{
    key: 'validate',
    value: function validate() {
      var payloadResult = this.payload.validate();
      if (!payloadResult.valid) {
        return payloadResult;
      }

      var valid = true;
      var error = void 0;

      return { valid: valid, error: error };
    }
  }]);

  return IDToken;
}(JWT);

/**
 * Export
 */


module.exports = IDToken;
module.exports.TokenClaimsSet = TokenClaimsSet;