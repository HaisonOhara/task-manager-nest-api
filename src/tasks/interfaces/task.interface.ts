// Interface que define a estrutura de uma tarefa
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  categoryId?: string; // ID da categoria (opcional)
  createdAt: Date;
}
