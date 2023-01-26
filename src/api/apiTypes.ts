type SensorInfo = {
  id: string;
  type: string;
  name: string;
  minValue?: number;
  maxValue?: number;
  value: number;
};
type SensorsResult = Array<SensorInfo>;

type AuthResult = {
  token: string;
  user: string;
};
type AuthRequest = {
  login: string;
  password: string;
};

type SnapShotRequest = {
  id: string;
};

type SnapShotResponse = boolean;

type Cameras = Array<{id: string; snapshotUrl: string}>;

export type {
  SensorsResult,
  SensorInfo,
  Cameras,
  AuthResult,
  AuthRequest,
  SnapShotRequest,
  SnapShotResponse,
};
