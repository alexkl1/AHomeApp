type Sensors = Array<{
  id: string;
  minValue?: number;
  maxValue?: number;
  value: number;
}>;

type AuthResult = {
  token: string;
};
type AuthRequest = {
  login: string;
  password: string;
};

type Cameras = Array<{id: string; snapshotUrl: string}>;

export type {Sensors, Cameras, AuthResult, AuthRequest};
