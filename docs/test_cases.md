# 📝 Test Case Documentation

Full reference for all test cases in this Postman collection.

---

## Authentication Tests (`auth_tests.json`)

| # | Test Name | Method | Endpoint | Expected Status | Assertions |
|---|---|---|---|---|---|
| 1 | Valid API Key | GET | `/api/v1/profile` | 200 | Status 200, response time < 1000ms, JSON response |
| 2 | Invalid API Key | GET | `/api/v1/profile` | 401 | Status 401, error field present |
| 3 | Missing API Key | GET | `/api/v1/profile` | 401 or 403 | Status is 401 or 403 |
| 4 | Bearer Token — Valid | GET | `/api/v1/users/me` | 200 | Status 200, id and email fields present |
| 5 | Bearer Token — Expired | GET | `/api/v1/users/me` | 401 | Status 401, error field present |
| 6 | Basic Auth — Valid | GET | `/api/v1/secure` | 200 | Status 200 |
| 7 | Basic Auth — Wrong Password | GET | `/api/v1/secure` | 401 | Status 401 |

---

## CRUD Operation Tests (`crud_operations.json`)

| # | Test Name | Method | Endpoint | Expected Status | Assertions |
|---|---|---|---|---|---|
| 1 | GET All Records | GET | `/api/v1/records` | 200 | Status 200, array response, < 2000ms |
| 2 | GET Single Record (Valid) | GET | `/api/v1/records/:id` | 200 | Status 200, ID matches, required fields present |
| 3 | GET Non-Existent Record | GET | `/api/v1/records/999999999` | 404 | Status 404, error message returned |
| 4 | POST Create (Valid Payload) | POST | `/api/v1/records` | 201 | Status 201, ID in response, name matches |
| 5 | POST Create (Missing Field) | POST | `/api/v1/records` | 400 | Status 400, validation error message |
| 6 | PUT Full Update | PUT | `/api/v1/records/:id` | 200 | Status 200, name and status updated |
| 7 | PATCH Partial Update | PATCH | `/api/v1/records/:id` | 200 | Status 200, only status field changed |
| 8 | DELETE Valid Record | DELETE | `/api/v1/records/:id` | 200 or 204 | Status 200 or 204 |
| 9 | DELETE Already Deleted | DELETE | `/api/v1/records/:id` | 404 | Status 404 |

---

## Error Handling Tests (`error_handling.json`)

| # | Test Name | Method | Endpoint | Expected Status | Assertions |
|---|---|---|---|---|---|
| 1 | 400 Bad Request | POST | `/api/v1/records` | 400 | Status 400, error field present |
| 2 | 401 Unauthorized | GET | `/api/v1/records` | 401 | Status 401, auth header or error present |
| 3 | 403 Forbidden | DELETE | `/api/v1/admin/records/1` | 403 | Status 403, error message present |
| 4 | 404 Not Found | GET | `/api/v1/invalid-endpoint` | 404 | Status 404 |
| 5 | 422 Unprocessable Entity | POST | `/api/v1/users` | 422 | Status 422, errors object present |
| 6 | 429 Rate Limit | GET | `/api/v1/records` | 429 | Status 429, Retry-After header present |
| 7 | 500 Server Error | POST | `/api/v1/test/error` | 500 | Status 500, JSON response, error field present |

---

## Environment Variables Reference

| Variable | Used In | Description |
|---|---|---|
| `base_url` | All | API base URL (e.g. `https://api.example.com`) |
| `api_key` | Auth tests | API key value for x-api-key header |
| `bearer_token` | Auth, CRUD, Error tests | JWT or OAuth Bearer token |
| `read_only_token` | Error tests | Token with limited permissions for 403 test |
| `basic_username` | Auth tests | Username for Basic Auth |
| `basic_password` | Auth tests | Password for Basic Auth |
| `user_id` | CRUD tests | ID of a known test user |
| `record_id` | CRUD tests | ID of a known test record |
| `auth_type` | Pre-request script | `bearer` / `apikey` / `basic` |

---

## Tips for Running the Collection

- **Import environments first** before importing collections
- **Update variable values** in the environment to match your API before running
- Use **Collection Runner** in Postman to run all tests at once and see a pass/fail summary
- For the **429 rate limit test**, run the GET request rapidly in Collection Runner with no delay
- Chain tests using `pm.environment.set()` — the POST create test saves `new_record_id` for downstream tests
