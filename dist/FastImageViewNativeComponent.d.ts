import type { ViewProps, ColorValue } from 'react-native';
import type { Float, WithDefault, BubblingEventHandler, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
declare type Headers = ReadonlyArray<Readonly<{
    name: string;
    value: string;
}>>;
declare type Priority = WithDefault<'low' | 'normal' | 'high', 'normal'>;
declare type CacheControl = WithDefault<'immutable' | 'web' | 'cacheOnly', 'web'>;
declare type FastImageSource = Readonly<{
    uri?: string;
    headers?: Headers;
    priority?: Priority;
    cache?: CacheControl;
}>;
declare type OnLoadEvent = Readonly<{
    width: Float;
    height: Float;
}>;
declare type OnProgressEvent = Readonly<{
    loaded: Int32;
    total: Int32;
}>;
interface NativeProps extends ViewProps {
    onFastImageError?: BubblingEventHandler<Readonly<{}>>;
    onFastImageLoad?: BubblingEventHandler<OnLoadEvent>;
    onFastImageLoadEnd?: BubblingEventHandler<Readonly<{}>>;
    onFastImageLoadStart?: BubblingEventHandler<Readonly<{}>>;
    onFastImageProgress?: BubblingEventHandler<OnProgressEvent>;
    source?: FastImageSource;
    defaultSource?: string | null;
    resizeMode?: WithDefault<'contain' | 'cover' | 'stretch' | 'center', 'cover'>;
    tintColor?: ColorValue;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<NativeProps>;
export default _default;
//# sourceMappingURL=FastImageViewNativeComponent.d.ts.map