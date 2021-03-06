'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = bindKeyboard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _reactSwipeableViewsCore = require('react-swipeable-views-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bindKeyboard(MyComponent) {
  var BindKeyboard = function (_Component) {
    (0, _inherits3.default)(BindKeyboard, _Component);

    function BindKeyboard() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, BindKeyboard);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BindKeyboard.__proto__ || (0, _getPrototypeOf2.default)(BindKeyboard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.handleKeyDown = function (event) {
        var action = void 0;
        var _this$props = _this.props,
            _this$props$axis = _this$props.axis,
            axis = _this$props$axis === undefined ? 'x' : _this$props$axis,
            children = _this$props.children,
            onChangeIndex = _this$props.onChangeIndex,
            slideCount = _this$props.slideCount;


        switch ((0, _keycode2.default)(event)) {
          case 'page down':
          case 'down':
            if (axis === 'y') {
              action = 'decrease';
            } else if (axis === 'y-reverse') {
              action = 'increase';
            }
            break;

          case 'left':
            if (axis === 'x') {
              action = 'decrease';
            } else if (axis === 'x-reverse') {
              action = 'increase';
            }
            break;

          case 'page up':
          case 'up':
            if (axis === 'y') {
              action = 'increase';
            } else if (axis === 'y-reverse') {
              action = 'decrease';
            }
            break;

          case 'right':
            if (axis === 'x') {
              action = 'increase';
            } else if (axis === 'x-reverse') {
              action = 'decrease';
            }
            break;

          default:
            break;
        }

        if (action) {
          var indexLatest = _this.state.index;
          var indexNew = indexLatest;

          if (action === 'increase') {
            indexNew += 1;
          } else {
            indexNew -= 1;
          }

          if (slideCount || children) {
            indexNew = (0, _reactSwipeableViewsCore.mod)(indexNew, slideCount || _react.Children.count(children));
          }

          // Is uncontrolled
          if (_this.props.index === undefined) {
            _this.setState({
              index: indexNew
            });
          }

          if (onChangeIndex) {
            onChangeIndex(indexNew, indexLatest);
          }
        }
      }, _this.handleChangeIndex = function (index, indexLatest) {
        // Is uncontrolled
        if (_this.props.index === undefined) {
          _this.setState({
            index: index
          });
        }

        if (_this.props.onChangeIndex) {
          _this.props.onChangeIndex(index, indexLatest);
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(BindKeyboard, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setState({
          index: this.props.index || 0
        });
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var index = nextProps.index;


        if (typeof index === 'number' && index !== this.props.index) {
          this.setState({
            index: index
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            indexProp = _props.index,
            onChangeIndex = _props.onChangeIndex,
            other = (0, _objectWithoutProperties3.default)(_props, ['index', 'onChangeIndex']);
        var index = this.state.index;


        return _react2.default.createElement(
          _reactEventListener2.default,
          { target: 'window', onKeyDown: this.handleKeyDown },
          _react2.default.createElement(MyComponent, (0, _extends3.default)({ index: index, onChangeIndex: this.handleChangeIndex }, other))
        );
      }
    }]);
    return BindKeyboard;
  }(_react.Component);

  BindKeyboard.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * @ignore
     */
    axis: _propTypes2.default.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
    /**
     * @ignore
     */
    children: _propTypes2.default.node,
    /**
     * @ignore
     */
    index: _propTypes2.default.number,
    /**
     * @ignore
     */
    onChangeIndex: _propTypes2.default.func,
    /**
     * @ignore
     */
    slideCount: _propTypes2.default.number
  } : {};


  return BindKeyboard;
}