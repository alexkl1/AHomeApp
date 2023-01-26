/**
 * Temperature sensor Element
 */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SensorInfo} from '../../../api/apiTypes';
import {Text} from '@rneui/themed';
import {GaugeProgress} from 'react-native-simple-gauge';
import usePrevious from '../../../hooks/usePrevious';

/*
map threshold temperature to color
 */

type TMapper = {
  [key: string]: string;
};

const tempColorMapper: TMapper = {
  '0': '#00179b',
  '7': '#27278c',
  '12': '#328aa2',
  '17': '#51a644',
  '25': '#cea34a',
  '27': '#ce7844',
};

type TempSensorElementProps = {
  data: SensorInfo;
};
export function TempSensorElement({data}: TempSensorElementProps) {
  const minDegree = -10;
  const maxDegree = 40;
  const value = data?.value;
  const bgColor = Object.keys(tempColorMapper).reduce(
    (acc: string, k: string) => {
      if (value > parseInt(k, 10)) {
        acc = tempColorMapper[k];
      }
      return acc;
    },
  );
  const percent = (value - minDegree) / ((maxDegree - minDegree) / 100);
  const adjPercent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
  //const prevAdjPercent = usePrevious(adjPercent);

  //console.log(`value=${value}, percent=${percent}, bgColor=${bgColor}`);
  if (!data) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.tempText}>
          <Text>{parseFloat(value.toFixed(1))}°C</Text>
        </View>
        <View style={styles.tempTitle}>
          <Text style={styles.title}>{data?.name}</Text>
        </View>
        <View style={styles.tempProgress}>
          <GaugeProgress
            key={data?.id}
            size={50}
            width={5}
            //prefill={prevAdjPercent}
            fill={adjPercent}
            rotation={90}
            cropDegree={170}
            tintColor={bgColor}
            backgroundColor="#b0c4de"
            stroke={[2, 2]} //For a equaly dashed line
            strokeCap="circle"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tempText: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  title: {fontSize: 11},
  tempProgress: {
    //position: 'absolute',
    left: 5,
    top: 10,
  },
  tempTitle: {
    position: 'absolute',
    left: 5,
    bottom: 0,
  },
  box: {
    borderColor: 'black',
    borderWidth: 1,
    width: 120,
    height: 60,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
