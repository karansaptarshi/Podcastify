import { Pool } from "pg";
let _pool: Pool | undefined;
export function db() {
  if (!_pool) _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return _pool;
}
