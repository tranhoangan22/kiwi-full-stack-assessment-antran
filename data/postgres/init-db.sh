#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER kiwi;
    CREATE DATABASE kiwi;
    GRANT ALL PRIVILEGES ON DATABASE kiwi TO kiwi;
EOSQL

psql -v 'ON_ERROR_STOP=1' -d kiwi -f /data/dump.sql