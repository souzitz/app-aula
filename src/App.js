import React, { useContext, useState } from "react";
import TarefasContext from "./context"; // Importa o contexto
import Listadetarefas from "./Listadetarefas"; // Importa o componente de lista de tarefas

function App() {
  const { estado, dispatch } = useContext(TarefasContext); // Pega o estado e dispatch do contexto
  const [novatarefa, setnovatarefa] = useState(""); // Armazena o texto da nova tarefa
  const [filtro, setfiltro] = useState("todas"); // Armazena o filtro selecionado

  // Função para adicionar uma nova tarefa
  const adicionartarefa = () => {
    if (novatarefa.trim()) {
      // Verifica se o campo não está vazio
      dispatch({
        tipo: "adicionar tarefa", // Ação para adicionar a tarefa
        payload: { texto: novatarefa, concluida: false }, // Envia o texto e status de "concluída" como falso
      });
      setnovatarefa(""); // Limpa o campo de entrada
    }
  };

  // Função para alternar o status da tarefa (concluída ou pendente)
  const toggletarefa = (index) => {
    dispatch({
      tipo: "alternar tarefa", // Ação para alternar o status
      payload: { index }, // Passa o índice da tarefa
    });
  };

  // Função para remover uma tarefa
  const removetarefa = (index) => {
    dispatch({
      tipo: "remover tarefa", // Ação para remover a tarefa
      payload: index, // Passa o índice da tarefa a ser removida
    });
  };

  // Filtra as tarefas com base no filtro selecionado
  const tarefasfiltradas = () => {
    if (filtro === "concluidas") {
      return estado.tarefas.filter((tarefa) => tarefa.concluida); // Retorna apenas as tarefas concluídas
    } else if (filtro === "pendentes") {
      return estado.tarefas.filter((tarefa) => !tarefa.concluida); // Retorna apenas as tarefas pendentes
    }
    return estado.tarefas; // Retorna todas as tarefas
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas 2.0</h1>
      <input
        type="text"
        placeholder="Nova tarefa"
        value={novatarefa} // Mostra o texto da nova tarefa no input
        onChange={(e) => setnovatarefa(e.target.value)} // Atualiza o estado ao digitar
      />
      <button onClick={adicionartarefa}>Adicionar</button>{" "}
      {/* Botão para adicionar a tarefa */}
      {/* Botões para filtrar as tarefas */}
      <div>
        <button onClick={() => setfiltro("todas")}>Todas</button>
        <button onClick={() => setfiltro("concluidas")}>Concluídas</button>
        <button onClick={() => setfiltro("pendentes")}>Pendentes</button>
      </div>
      {/* Passa as tarefas filtradas e as funções de alternar e remover para o componente de lista */}
      <Listadetarefas
        tarefas={tarefasfiltradas()} // Tarefas filtradas
        toggletarefa={toggletarefa} // Função para alternar o status
        removetarefa={removetarefa} // Função para remover a tarefa
      />
    </div>
  );
}

export default App;
