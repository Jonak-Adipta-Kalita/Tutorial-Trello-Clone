"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

type Props = {};

const Board = (props: Props) => {
  const { getBoard } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <DragDropContext>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => <div></div>}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
