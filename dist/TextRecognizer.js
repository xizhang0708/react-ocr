"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _tesseract = require("tesseract.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var scheduler = (0, _tesseract.createScheduler)();

var useTakeWebcamStream = function useTakeWebcamStream(_ref) {
  var video = _ref.video;
  (0, _react.useEffect)(function () {
    if (video) {
      var handleSuccess = function handleSuccess(stream) {
        // Attach the video stream to the video element and autoplay.
        video.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(handleSuccess);
    }
  }, [video]);
};

var useTesseract = function useTesseract() {
  (0, _react.useEffect)(function () {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var i, worker;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = 0;

            case 1:
              if (!(i < 4)) {
                _context.next = 13;
                break;
              }

              worker = (0, _tesseract.createWorker)();
              _context.next = 5;
              return worker.load();

            case 5:
              _context.next = 7;
              return worker.loadLanguage("eng");

            case 7:
              _context.next = 9;
              return worker.initialize("eng");

            case 9:
              scheduler.addWorker(worker);

            case 10:
              i++;
              _context.next = 1;
              break;

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, []);
};

var doOCR = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(canvas) {
    var _yield$scheduler$addJ, text;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return scheduler.addJob("recognize", canvas);

          case 2:
            _yield$scheduler$addJ = _context2.sent;
            text = _yield$scheduler$addJ.data.text;
            return _context2.abrupt("return", text);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function doOCR(_x) {
    return _ref3.apply(this, arguments);
  };
}(); // TODO: use video height and width for snapshot


function TextRecognizer(_ref4) {
  var onChange = _ref4.onChange;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      videoRef = _useState2[0],
      setVideoRef = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      snapShotRef = _useState4[0],
      setSnapShotRef = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      results = _useState6[0],
      setResults = _useState6[1];

  useTakeWebcamStream({
    video: videoRef
  });
  useTesseract();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "capture",
    onClick: function onClick() {
      if (videoRef && snapShotRef) {
        // @ts-ignore
        snapShotRef.getContext("2d").drawImage(videoRef, 0, 0, 320, 240);
        doOCR(snapShotRef).then(function (recognizedText) {
          setResults(recognizedText);
          onChange(recognizedText);
        });
      }
    }
  }, "Capture Image"), /*#__PURE__*/_react.default.createElement("video", {
    id: "video",
    controls: true,
    autoPlay: true,
    ref: setVideoRef
  }), /*#__PURE__*/_react.default.createElement("canvas", {
    id: "snapShot",
    width: "320",
    height: "240",
    ref: setSnapShotRef
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "results"
  }, results));
}

var _default = TextRecognizer;
exports.default = _default;