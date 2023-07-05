'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var reactNative = require('react-native');
var codegenNativeComponent = require('react-native/Libraries/Utilities/codegenNativeComponent');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var codegenNativeComponent__default = /*#__PURE__*/_interopDefaultLegacy(codegenNativeComponent);

var FastImageView = codegenNativeComponent__default['default']('FastImageView');

const resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center'
};
const priority = {
  low: 'low',
  normal: 'normal',
  high: 'high'
};
const cacheControl = {
  // Ignore headers, use uri as cache key, fetch only if not in cache.
  immutable: 'immutable',
  // Respect http headers, no aggressive caching.
  web: 'web',
  // Only load from cache.
  cacheOnly: 'cacheOnly'
};

const resolveDefaultSource = defaultSource => {
  if (!defaultSource) {
    return null;
  }

  if (reactNative.Platform.OS === 'android') {
    // Android receives a URI string, and resolves into a Drawable using RN's methods.
    const resolved = reactNative.Image.resolveAssetSource(defaultSource);

    if (resolved) {
      return resolved.uri;
    }

    return null;
  } // iOS or other number mapped assets
  // In iOS the number is passed, and bridged automatically into a UIImage


  return defaultSource;
};

function FastImageBase({
  source,
  defaultSource,
  tintColor,
  onLoadStart,
  onProgress,
  onLoad,
  onError,
  onLoadEnd,
  style,
  fallback,
  children,
  // eslint-disable-next-line no-shadow
  resizeMode = 'cover',
  forwardedRef,
  ...props
}) {
  var _global;

  if (fallback) {
    const cleanedSource = { ...source
    };
    delete cleanedSource.cache;
    const resolvedSource = reactNative.Image.resolveAssetSource(cleanedSource);
    return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
      style: [styles.imageContainer, style],
      ref: forwardedRef
    }, /*#__PURE__*/React__default['default'].createElement(reactNative.Image, _extends__default['default']({}, props, {
      style: [reactNative.StyleSheet.absoluteFill, {
        tintColor
      }],
      source: resolvedSource,
      defaultSource: defaultSource,
      onLoadStart: onLoadStart,
      onProgress: onProgress,
      onLoad: onLoad,
      onError: onError,
      onLoadEnd: onLoadEnd,
      resizeMode: resizeMode
    })), children);
  } // @ts-ignore non-typed property


  const FABRIC_ENABLED = !!((_global = global) !== null && _global !== void 0 && _global.nativeFabricUIManager); // this type differs based on the `source` prop passed

  const resolvedSource = reactNative.Image.resolveAssetSource(source);

  if (resolvedSource !== null && resolvedSource !== void 0 && resolvedSource.headers && (FABRIC_ENABLED || reactNative.Platform.OS === 'android')) {
    // we do it like that to trick codegen
    const headersArray = [];
    Object.keys(resolvedSource.headers).forEach(key => {
      headersArray.push({
        name: key,
        value: resolvedSource.headers[key]
      });
    });
    resolvedSource.headers = headersArray;
  }

  const resolvedDefaultSource = resolveDefaultSource(defaultSource);
  const resolvedDefaultSourceAsString = resolvedDefaultSource !== null ? String(resolvedDefaultSource) : null;
  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: [styles.imageContainer, style],
    ref: forwardedRef
  }, /*#__PURE__*/React__default['default'].createElement(FastImageView, _extends__default['default']({}, props, {
    tintColor: tintColor,
    style: reactNative.StyleSheet.absoluteFill,
    source: resolvedSource,
    defaultSource: resolvedDefaultSourceAsString,
    onFastImageLoadStart: onLoadStart,
    onFastImageProgress: onProgress,
    onFastImageLoad: onLoad,
    onFastImageError: onError,
    onFastImageLoadEnd: onLoadEnd,
    resizeMode: resizeMode
  })), children);
}

const FastImageMemo = /*#__PURE__*/React.memo(FastImageBase);
const FastImageComponent = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React__default['default'].createElement(FastImageMemo, _extends__default['default']({
  forwardedRef: ref
}, props)));
FastImageComponent.displayName = 'FastImage';
const FastImage = FastImageComponent;
FastImage.resizeMode = resizeMode;
FastImage.cacheControl = cacheControl;
FastImage.priority = priority;

FastImage.preload = sources => reactNative.NativeModules.FastImageView.preload(sources);

FastImage.clearMemoryCache = () => reactNative.NativeModules.FastImageView.clearMemoryCache();

FastImage.clearDiskCache = () => reactNative.NativeModules.FastImageView.clearDiskCache();

const styles = reactNative.StyleSheet.create({
  imageContainer: {
    overflow: 'hidden'
  }
});

module.exports = FastImage;
