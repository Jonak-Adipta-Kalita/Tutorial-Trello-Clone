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
  const { getBoard, board } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd: OnDragEndResponder = (result) => {};

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
