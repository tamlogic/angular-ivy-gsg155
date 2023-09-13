export interface NewWidget {
  name: string;
  price: number;
  color: string;
}

export interface Widget extends NewWidget {
  id: number;
}