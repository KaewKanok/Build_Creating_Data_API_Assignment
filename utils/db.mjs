import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres:K@ewball0304@localhost:5432/build_creating_data_api",
});

export default connectionPool;
