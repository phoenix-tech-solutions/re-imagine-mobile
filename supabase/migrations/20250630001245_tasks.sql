-- Step 1: Create the new enum type
CREATE TYPE task_status AS ENUM ('not_started', 'in_progress', 'done');

-- Step 2: Drop the existing status column
ALTER TABLE tasks
  DROP COLUMN status;

-- Step 3: Add the new status column with the enum type
ALTER TABLE tasks
  ADD COLUMN status task_status NOT NULL DEFAULT 'not_started';
