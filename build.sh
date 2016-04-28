#!/bin/bash
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/build/outputs/apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore android-x86-release-unsigned.apk eng.systems
rm backapp-x86.apk
~/Logiciels/android-sdk-linux/build-tools/23.0.3/zipalign -v 4 android-x86-release-unsigned.apk backapp-x86.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore android-armv7-release-unsigned.apk eng.systems
rm backapp-armv7.apk
~/Logiciels/android-sdk-linux/build-tools/23.0.3/zipalign -v 4 android-armv7-release-unsigned.apk backapp-armv7.apk
