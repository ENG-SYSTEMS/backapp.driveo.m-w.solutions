#!/bin/bash
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/ant-build
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore CordovaApp-release-unsigned.apk backapp
rm backapp.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 CordovaApp-release-unsigned.apk backapp.apk
