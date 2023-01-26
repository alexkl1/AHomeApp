type Sensors = Array<{
  id: string;
  name: string;
  minValue?: number;
  maxValue?: number;
  value: number;
}>;

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
  Sensors,
  Cameras,
  AuthResult,
  AuthRequest,
  SnapShotRequest,
  SnapShotResponse,
};
