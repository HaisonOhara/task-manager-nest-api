// Interface que define a estrutura de uma categoria
export interface Category {
  id: string;
  name: string;
  description: string;
  color: string; // Cor para identificação visual
  createdAt: Date;
}
