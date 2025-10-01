#!/bin/sh

echo "⏳ Waiting for PostgreSQL (db:5432)..."

while ! nc -z db 5432; do
  sleep 1
done

echo "✅ Database is ready!"
echo "🚀 Running Prisma DB push..."
npx prisma db push --accept-data-loss

echo "▶️ Starting application..."
exec npm run start