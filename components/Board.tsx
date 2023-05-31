"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import Column from "./Column";

type Props = {};

const Board = (props: Props) => {
  const { setBoardState, getBoard, updateTodoInDB, board } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);

      const rearrangedColumns = new Map(entries);

      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }

    if (type === "card") {
      const columns = Array.from(board.columns);
      const startColumnIndex = columns[Number(source.droppableId)];
      const endColumnIndex = columns[Number(destination.droppableId)];

      const startCol: Column = {
        id: startColumnIndex[0],
        todos: startColumnIndex[1].todos,
      };

      const endCol: Column = {
        id: endColumnIndex[0],
        todos: endColumnIndex[1].todos,
      };

      if (!startCol || !endCol) return;

      if (source.index === destination.index && startCol === endCol) return;

      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 1);

      if (startCol.id === endCol.id) {
        newTodos.splice(destination.index, 0, todoMoved);
        const newCol = {
          ...startCol,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);

        setBoardState({
          ...board,
          columns: newColumns,
        });
      } else {
        const finishTodos = Array.from(endCol.todos);
        finishTodos.splice(destination.index, 0, todoMoved);

        const newCol = {
          ...startCol,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);

        newColumns.set(startCol.id, newCol);
        newColumns.set(endCol.id, {
          ...endCol,
          todos: finishTodos,
        });

        updateTodoInDB(todoMoved, endCol.id);

        setBoardState({
          ...board,
          columns: newColumns,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], i) => (
              <Column key={id} id={id} todos={column.todos} index={i} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
