import {
  FilterValuesType,
  todolistsActions,
  TodolistDomainType,
  todolistsReducer,
  todolistsThunks,
} from "@app/features/todolist-list/todolists/todolists.reducer";
import { RequestStatusType } from "@app/app/app.reducer";
import { useActions } from "@app/common/hooks/useActions";
import { TodolistType } from "@app/features/todolist-list/todolists/todolists.api";

const {
  fetchTodolists,
  addTodolist,
  removeTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
} = useActions({ ...todolistsActions, ...todolistsThunks });

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[] = [];

beforeEach(() => {
  todolistId1 = "todolistId1";
  todolistId2 = "todolistId2";
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
  ];
});

test("correct todolists should be removed", () => {
  const endState = todolistsReducer(
    startState,
    removeTodolist.fulfilled({ id: todolistId1 }, "requestId", todolistId1)
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolists should be added", () => {
  let todolist: TodolistType = {
    title: "New TodolistList",
    id: "any id",
    addedDate: "",
    order: 0,
  };

  const endState = todolistsReducer(
    startState,
    addTodolist.fulfilled({ todolist }, "requestId", todolist.title)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(todolist.title);
  expect(endState[0].filter).toBe("all");
});

test("correct todolists should change its name", () => {
  let newTodolistTitle = "New TodolistList";

  const args = { id: todolistId2, title: newTodolistTitle };

  const action = changeTodolistTitle.fulfilled(args, "requestId", args);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolists should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const action = changeTodolistFilter({ id: todolistId2, filter: newFilter });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test("todolists should be added", () => {
  const action = fetchTodolists.fulfilled(
    { todolists: startState },
    "requestId",
    undefined
  );
  const endState = todolistsReducer([], action);
  expect(endState.length).toBe(2);
});

test("correct entity status of todolists should be changed", () => {
  let newStatus: RequestStatusType = "loading";

  const action = changeTodolistEntityStatus({
    id: todolistId2,
    status: newStatus,
  });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newStatus);
});
