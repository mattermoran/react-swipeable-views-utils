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

exports.default = virtualize;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSwipeableViewsCore = require('react-swipeable-views-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function virtualize(MyComponent) {
  var Virtualize = function (_PureComponent) {
    (0, _inherits3.default)(Virtualize, _PureComponent);

    function Virtualize(props, context) {
      (0, _classCallCheck3.default)(this, Virtualize);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Virtualize.__proto__ || (0, _getPrototypeOf2.default)(Virtualize)).call(this, props, context));

      _this.state = {};
      _this.timer = null;

      _this.handleChangeIndex = function (indexContainer, indexLatest) {
        var _this$props = _this.props,
            slideCount = _this$props.slideCount,
            onChangeIndex = _this$props.onChangeIndex;


        var indexDiff = indexContainer - indexLatest;
        var index = _this.state.index + indexDiff;

        if (slideCount) {
          index = (0, _reactSwipeableViewsCore.mod)(index, slideCount);
        }

        // Is uncontrolled
        if (_this.props.index === undefined) {
          _this.setIndex(index, indexContainer, indexDiff);
        }

        if (onChangeIndex) {
          onChangeIndex(index, _this.state.index);
        }
      };

      _this.handleTransitionEnd = function () {
        // Delay the update of the window to fix an issue with react-motion.
        _this.timer = setTimeout(function () {
          _this.setWindow();
        }, 0);

        if (_this.props.onTransitionEnd) {
          _this.props.onTransitionEnd();
        }
      };

      _this.state.index = _this.props.index || 0;
      return _this;
    }

    /**
     *
     *           index          indexStop
     *             |              |
     * indexStart  |       indexContainer
     *   |         |         |    |
     * ------------|-------------------------->
     *  -2    -1   0    1    2    3    4    5
     */


    (0, _createClass3.default)(Virtualize, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setWindow(this.state.index);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var index = nextProps.index;


        if (typeof index === 'number' && index !== this.props.index) {
          var indexDiff = index - this.props.index;
          this.setIndex(index, this.state.indexContainer + indexDiff, indexDiff);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.timer);
      }
    }, {
      key: 'setIndex',
      value: function setIndex(index, indexContainer, indexDiff) {
        var nextState = {
          index: index,
          indexContainer: indexContainer,
          indexStart: this.state.indexStart,
          indexStop: this.state.indexStop
        };

        // We are going forward, let's render one more slide ahead.
        if (indexDiff > 0 && (!this.props.slideCount || nextState.indexStop < this.props.slideCount - 1)) {
          nextState.indexStop += 1;
        }

        // Extend the bounds if needed.
        if (index > nextState.indexStop) {
          nextState.indexStop = index;
        }

        var beforeAhead = nextState.indexStart - index;

        // Extend the bounds if needed.
        if (beforeAhead > 0) {
          nextState.indexContainer += beforeAhead;
          nextState.indexStart -= beforeAhead;
        }

        this.setState(nextState);
      }
    }, {
      key: 'setWindow',
      value: function setWindow() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.index;
        var slideCount = this.props.slideCount;


        var beforeAhead = this.props.overscanSlideBefore;
        var afterAhead = this.props.overscanSlideAfter;

        if (slideCount) {
          if (beforeAhead > index) {
            beforeAhead = index;
          }

          if (afterAhead + index > slideCount - 1) {
            afterAhead = slideCount - index - 1;
          }
        }

        this.setState({
          indexContainer: beforeAhead,
          indexStart: index - beforeAhead,
          indexStop: index + afterAhead
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            indexProp = _props.index,
            onChangeIndex = _props.onChangeIndex,
            overscanSlideAfter = _props.overscanSlideAfter,
            overscanSlideBefore = _props.overscanSlideBefore,
            slideCount = _props.slideCount,
            slideRenderer = _props.slideRenderer,
            other = (0, _objectWithoutProperties3.default)(_props, ['children', 'index', 'onChangeIndex', 'overscanSlideAfter', 'overscanSlideBefore', 'slideCount', 'slideRenderer']);
        var _state = this.state,
            indexContainer = _state.indexContainer,
            indexStart = _state.indexStart,
            indexStop = _state.indexStop;


        var slides = [];

        for (var slideIndex = indexStart; slideIndex <= indexStop; slideIndex += 1) {
          slides.push(slideRenderer({
            index: slideIndex,
            key: slideIndex
          }));
        }

        return _react2.default.createElement(
          MyComponent,
          (0, _extends3.default)({
            index: indexContainer,
            onChangeIndex: this.handleChangeIndex,
            onTransitionEnd: this.handleTransitionEnd
          }, other),
          slides
        );
      }
    }]);
    return Virtualize;
  }(_react.PureComponent);

  Virtualize.defaultProps = {
    overscanSlideAfter: 2,
    // Render one more slide for going backward as it's more difficult to
    // keep the window up to date.
    overscanSlideBefore: 3
  };
  Virtualize.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * @ignore
     */
    children: function children(props, propName) {
      if (props[propName] !== undefined) {
        return new Error("The children property isn't supported.");
      }

      return null;
    },
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
    onTransitionEnd: _propTypes2.default.func,
    /**
     * Number of slide to render after the visible slide.
     */
    overscanSlideAfter: _propTypes2.default.number,
    /**
     * Number of slide to render before the visible slide.
     */
    overscanSlideBefore: _propTypes2.default.number,
    /**
     * When set, it's adding a limit to the number of slide: [0, slideCount].
     */
    slideCount: _propTypes2.default.number,
    /**
     * Responsible for rendering a slide given an index.
     * ({ index: number }): node.
     */
    slideRenderer: _propTypes2.default.func.isRequired
  } : {};


  return Virtualize;
}