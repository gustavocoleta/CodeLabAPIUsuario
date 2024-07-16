export interface IKongJWTCredencial {
  id: string;
  key: string;
}

export interface IKongConsumerJWT {
  data: IKongJWTCredencial[];
}
