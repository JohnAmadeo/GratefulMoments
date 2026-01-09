# Destination Repository for gratefulmoments

This repository will contain translated/modified content from the source repository.

Source: https://github.com/JohnAmadeo/GratefulMoments.git
Created: Tue Jan  6 07:49:26 UTC 2026

# Issues found and fixed during React Native/Expo translation

The following issues were discovered when attempting to run the Expo app (`npx expo run:ios`):

## 1. Incorrect babel plugin in app.json

**Problem**: `react-native-reanimated/plugin` was listed in `app.json` under `expo.plugins`, but this is a Babel plugin, not an Expo config plugin.

**Error**:
```
Error: [Reanimated] Babel plugin exception: TypeError: Cannot set properties of undefined (setting 'workletNumber')
```

**Fix**: Removed `react-native-reanimated/plugin` from `app.json`. It should only be in `babel.config.js` (which was already correctly configured).

## 2. Corrupted asset PNG files

**Problem**: The `assets/icon.png` and `assets/splash.png` files had internal CRC corruption, causing prebuild to fail.

**Error**:
```
Error: [ios.dangerous]: withIosDangerousBaseMod: Crc error - -338763222 - -1967640566
```

**Fix**: Regenerated the asset files with valid PNG images using Python/Pillow.

## 3. Missing Metal Toolchain

**Problem**: `react-native-svg` uses Metal shaders for GPU-accelerated SVG filter effects (blur, color matrix, composite blending). The Metal compiler toolchain was not installed on the system.

**Error**:
```
error: cannot execute tool 'metal' due to missing Metal Toolchain
```

**Fix**: Ran `xcodebuild -downloadComponent MetalToolchain` to download the 704 MB Metal Toolchain component.

## 4. Missing expo-asset package

**Problem**: The `expo-asset` package was not listed in dependencies but is required by Metro bundler.

**Error**:
```
Error: The required package `expo-asset` cannot be found
```

**Fix**: Ran `npm install expo-asset` to add the missing dependency.
