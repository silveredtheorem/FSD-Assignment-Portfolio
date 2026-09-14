#!/usr/bin/env bash
# curl commands covering all backend endpoints (B1-B7), including one failure
# case per validated endpoint. Run the server first (npm run dev, from /server),
# then run this script, or copy/paste individual blocks.
#
#   cd server && npm run dev &
#   ./curl-examples.sh

BASE_URL="${BASE_URL:-http://localhost:5050}"

echo "== B1: GET / — health check =="
curl -s -w "\n%{http_code}\n" "$BASE_URL/"

echo
echo "== B2: GET /api/projects — list all projects =="
curl -s -w "\n%{http_code}\n" "$BASE_URL/api/projects"

echo
echo "== B3: GET /api/projects/:id — one project (valid id) =="
curl -s -w "\n%{http_code}\n" "$BASE_URL/api/projects/whale-sentry"

echo
echo "== B3 failure case: GET /api/projects/:id — unknown id -> 404 =="
curl -s -w "\n%{http_code}\n" "$BASE_URL/api/projects/does-not-exist"

echo
echo "== B4: POST /api/contact — valid submission -> 201 =="
curl -s -w "\n%{http_code}\n" -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","message":"hi there"}'

echo
echo "== B4 failure case: POST /api/contact — missing name -> 400 =="
curl -s -w "\n%{http_code}\n" -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","message":"hi"}'

echo
echo "== B4 failure case: POST /api/contact — missing email -> 400 =="
curl -s -w "\n%{http_code}\n" -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","message":"hi"}'

echo
echo "== B4 failure case: POST /api/contact — invalid email format -> 400 =="
curl -s -w "\n%{http_code}\n" -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"not-an-email","message":"hi"}'

echo
echo "== B4 failure case: POST /api/contact — missing message -> 400 =="
curl -s -w "\n%{http_code}\n" -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com"}'

echo
echo "== B5: GET /api/contact — list all submissions (open endpoint) =="
curl -s -w "\n%{http_code}\n" "$BASE_URL/api/contact"

echo
echo "== B6: GET /api/doesnotexist — undefined route -> 404 JSON =="
curl -s -w "\n%{http_code}\n" "$BASE_URL/api/doesnotexist"

echo
echo "== B6 failure case: malformed JSON body -> 400 JSON, server stays up =="
curl -s -w "\n%{http_code}\n" -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{bad json'

echo
echo "== B7: CORS preflight from the React dev server origin =="
curl -s -i -X OPTIONS "$BASE_URL/api/projects" \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" | head -20
