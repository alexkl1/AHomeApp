/**
 * Root stack navigation types
 */
type MainTabParams = {
  Home: undefined;
  Cameras: {activeCameraId?: string};
  Settings: undefined;
  Sensors: {activeSensorId?: string};
};
export default MainTabParams;
