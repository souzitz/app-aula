/* eslint-disable react/prop-types */
import React from "react"; // Importa React

// Componente para listar as tarefas
function Listadetarefas({ tarefas, toggletarefa, removetarefa }) {
  return (
    <ul>
      {" "}
      {/* Lista de tarefas */}
      {tarefas.map((tarefa, index) => (
        <li key={index}>
          {" "}
          {/* Cada item de tarefa na lista */}
          <input
            type="checkbox"
            checked={tarefa.concluida} // Marca o checkbox se a tarefa estiver concluída
            onChange={() => toggletarefa(index)} // Alterna o estado da tarefa ao clicar
          />
          <span
            style={{
              textDecoration: tarefa.concluida ? "line-through" : "none", // Risca o texto se a tarefa estiver concluída
            }}
          >
            {tarefa.texto} {/* Exibe o texto da tarefa */}
          </span>
          <button onClick={() => removetarefa(index)}>Remover</button>{" "}
          {/* Botão para remover a tarefa */}
        </li>
      ))}
    </ul>
  );
}

export default Listadetarefas; // Exporta o componente
