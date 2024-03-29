import React, { ChangeEvent, FC, memo } from "react";
import { EditableSpan } from "@app/common/components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { tasksThunks } from "@app/features/todolist-list/tasks/tasks.reducer";
import { useActions } from "@app/common/hooks/useActions";
import { TaskType } from "@app/features/todolist-list/tasks/task.api";
import { TaskStatuses } from "@app/common/enum/common.enums";
import { useSelector } from "react-redux";
import { selectStatus } from "@app/app/selectors";

type PropsType = {
  task: TaskType;
  todolistId: string;
};
export const Task: FC<PropsType> = memo(({ todolistId, task }) => {
  const { updateTask, removeTask } = useActions(tasksThunks);

  const status = useSelector(selectStatus);

  const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let currentStatus = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New;
    updateTask({
      taskId: task.id,
      model: { status: currentStatus },
      todolistId,
    });
  };
  const onTitleChangeHandler = (title: string) => {
    updateTask({
      taskId: task.id,
      model: { title },
      todolistId,
    });
  };
  const isDisabledTask =
    task.status === TaskStatuses.Completed ? "line-through text-zinc-600" : "";

  return (
    <div key={task.id} className="flex items-start">
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color="primary"
        onChange={onStatusChangeHandler}
      />
      <span className="relative mt-[9px]">
        <span className={isDisabledTask}>
          <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        </span>
        <span className="absolute left-[240px] top-[-6px]">
          <IconButton
            onClick={() => removeTask({ taskId: task.id, todolistId })}
          >
            <Delete />
          </IconButton>
        </span>
      </span>
    </div>
  );
});
