import React, { createContext, useReducer } from "react";

// Criação do contexto para as tarefas
const TarefasContext = createContext();

// Estado inicial do contexto, onde as tarefas começam como um array vazio
const estadoinicial = {
  tarefas: [],
};

// Função reducer que gerencia as ações das tarefas (adicionar, alternar e remover)
const tarefaReducer = (estado, acao) => {
  switch (acao.tipo) {
    case "adicionar tarefa": // Ação para adicionar uma nova tarefa
      return {
        ...estado,
        tarefas: [...estado.tarefas, acao.payload], // Adiciona a nova tarefa no array
      };
    case "alternar tarefa": // Ação para alternar o status de conclusão da tarefa
      return {
        ...estado,
        tarefas: estado.tarefas.map((tarefa, index) =>
          index === acao.payload.index
            ? { ...tarefa, concluida: !tarefa.concluida } // Inverte o status da tarefa
            : tarefa
        ),
      };
    case "remover tarefa": // Ação para remover uma tarefa
      return {
        ...estado,
        tarefas: estado.tarefas.filter((_, index) => index !== acao.payload), // Remove a tarefa com o índice especificado
      };
    default:
      return estado; // Retorna o estado sem alterações caso a ação não seja reconhecida
  }
};

// Provedor do contexto para envolver a aplicação e fornecer o estado e as funções de dispatch
// eslint-disable-next-line react/prop-types
export const TarefasProvider = ({ children }) => {
  const [estado, dispatch] = useReducer(tarefaReducer, estadoinicial); // Usa useReducer para gerenciar o estado das tarefas

  return (
    <TarefasContext.Provider value={{ estado, dispatch }}>
      {children} {/* Passa o estado e dispatch para os componentes filhos */}
    </TarefasContext.Provider>
  );
};

export default TarefasContext; // Exporta o contexto para ser usado em outros componentes
