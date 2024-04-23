import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "tasks",
      columns: [
        { name: "task", type: "string" },
        { name: "created_at", type: "number" },
      ],
    }),
  ],
});
