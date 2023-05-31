"use client";

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps: DraggableProvidedDraggableProps | null | undefined;
};

const TodoCard = ({
  innerRef,
  dragHandleProps,
  draggableProps,
  id,
  index,
  todo,
}: Props) => {
  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    ></div>
  );
};

export default TodoCard;
