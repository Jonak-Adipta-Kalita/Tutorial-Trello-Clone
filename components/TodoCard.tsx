"use client";

import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { getURL } from "../utils/getURL";
import Image from "next/image";

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
  const { deleteTask } = useBoardStore();
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getURL(todo.image!);

        if (url) {
          setImageURL(url.toString());
        }
      };

      fetchImage();
    }
  }, [todo]);

  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {imageURL && (
        <div className="h-full w-full rounded-b-md">
          <Image
            src={imageURL}
            alt="Todo Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
