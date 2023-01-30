/**
 * Temperature sensor Element
 */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SensorInfo} from '../../../api/apiTypes';
import {Text} from '@rneui/themed';
import {GaugeProgress} from 'react-native-simple-gauge';

/*
map threshold temperature to color
 */

type TemperatureObject = {
  from: number;
  color: string;
};

type TemperatureColorMapper = Array<TemperatureObject>;

const tempColorMapper: TemperatureColorMapper = [
  {from: -100, color: '#00179b'},
  {from: 12, color: '#328aa2'},
  {from: 17, color: '#51a644'},
  {from: 25, color: '#cea34a'},
  {from: 27, color: '#ce7844'},
];

type TempSensorElementProps = {
  data: SensorInfo;
};
export function TempSensorElement({data}: TempSensorElementProps) {
  const minDegree = -10;
  const maxDegree = 40;
  //const value = data?.value;
  const value = 13;
  let bgColor = tempColorMapper[0].color;
  for (const k in tempColorMapper) {
    if (value > tempColorMapper[k].from) {
      bgColor = tempColorMapper[k].color;
    }
  }

  const percent = (value - minDegree) / ((maxDegree - minDegree) / 100);
  const adjPercent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
  //const prevAdjPercent = usePrevious(adjPercent);

  //console.log(`value=${value}, percent=${percent}, bgColor=${bgColor}`);
  if (!(data && data?.value)) {
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
            backgroundColor="black"
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
    //borderColor: 'black',
    //borderWidth: 1,
    width: 120,
    height: 60,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
