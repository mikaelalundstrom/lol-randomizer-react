export interface IChamp {
  id: string;
  name: string;
  title?: string;
  included?: boolean;
  roles?: string[];
}

export interface IRole {
  name: string;
  icon: string;
  active: boolean;
}

export interface ISkin {
  id: number;
  name: string;
}
