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

type Cameras = Array<{id: string; snapshotUrl: string}>;

export type {Sensors, Cameras, AuthResult, AuthRequest};
