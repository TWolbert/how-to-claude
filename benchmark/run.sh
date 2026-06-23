#!/usr/bin/env bash
set -euo pipefail

REQUESTS=50000
CONCURRENCY=100

echo "=== Python (http.server) benchmark ==="
python3 python_server.py &
PY_PID=$!
sleep 1
wrk -t4 -c$CONCURRENCY -d30s http://localhost:8080/api/hello 2>&1 | tee /tmp/wrk_py.txt
wrk -t4 -c$CONCURRENCY -d30s http://localhost:8080/api/data 2>&1 | tee -a /tmp/wrk_py.txt
kill $PY_PID 2>/dev/null || true

echo ""
echo "=== Go (Fiber) benchmark ==="
go run go_server.go &
GO_PID=$!
sleep 2
wrk -t4 -c$CONCURRENCY -d30s http://localhost:8081/api/hello 2>&1 | tee /tmp/wrk_go.txt
wrk -t4 -c$CONCURRENCY -d30s http://localhost:8081/api/data 2>&1 | tee -a /tmp/wrk_go.txt
kill $GO_PID 2>/dev/null || true

echo ""
echo "=== Resultaten ==="
echo "Python /api/hello:"
grep "Requests/sec" /tmp/wrk_py.txt | head -1
echo "Python /api/data:"
grep "Requests/sec" /tmp/wrk_py.txt | tail -1
echo "Go/Fiber /api/hello:"
grep "Requests/sec" /tmp/wrk_go.txt | head -1
echo "Go/Fiber /api/data:"
grep "Requests/sec" /tmp/wrk_go.txt | tail -1
