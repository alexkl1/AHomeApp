#!/bin/bash

for x in `adb devices | grep device | awk '{ print $1}'  | tail -n +2`;
do
  echo "REVERSING PORTS $x "
  adb  -s $x reverse tcp:8081 tcp:8081
  adb  -s $x reverse tcp:8082 tcp:8082
  adb  -s $x reverse tcp:8083 tcp:8083
  adb  -s $x reverse tcp:8084 tcp:8084

done


#adb  reverse tcp:8081 tcp:8081
#adb  reverse tcp:8082 tcp:8082
#adb  reverse tcp:8083 tcp:8083
echo "ADB REVERSE OK"
