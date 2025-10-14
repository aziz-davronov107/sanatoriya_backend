#!/bin/sh
set -e

# wait-for-postgres (simple loop)
host="$(echo $DATABASE_URL | sed -E 's#.*@([^:/]+).*#\1#')"
port="$(echo $DATABASE_URL | sed -E 's#.*:([0-9]+)/.*#\1#')"

echo "Waiting for database at $host:$port..."
while ! nc -z $host $port >/dev/null 2>&1; do
  sleep 1
done

echo "Running prisma migrate deploy..."
npx prisma migrate deploy || true

if [ "$SEED_ON_BOOT" = "true" ]; then
  echo "Running seeder..."
  node dist/main.js --seed
fi

exec "$@"
