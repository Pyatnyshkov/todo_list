export interface ITodo extends IObjectKeys{
  id: string;
  title: string;
  description: string;
  completed: boolean;
  expired: Date;
  files: string[];
}

interface IObjectKeys {
  [key: string]: any;
}
