# 15 - Test Cases

# StudyGenie Test Cases

> This document defines the functional, integration, security, AI, and UI test cases for the StudyGenie platform. Every completed development phase should pass the relevant tests before deployment.

---

# 1. Testing Objectives

The application should be verified for:

- Functional correctness
- Authentication & authorization
- API behavior
- AI features
- Database operations
- Responsive UI
- Error handling
- Security
- Performance

---

# 2. Authentication Test Cases

## User Registration

| ID       | Test Case                    | Expected Result           |
| -------- | ---------------------------- | ------------------------- |
| AUTH-001 | Register with valid data     | User created successfully |
| AUTH-002 | Register with existing email | Validation error          |
| AUTH-003 | Missing required fields      | Validation error          |
| AUTH-004 | Invalid email format         | Validation error          |
| AUTH-005 | Weak password                | Validation error          |

---

## Login

| ID       | Test Case         | Expected Result         |
| -------- | ----------------- | ----------------------- |
| AUTH-006 | Valid credentials | Session created         |
| AUTH-007 | Invalid password  | Unauthorized            |
| AUTH-008 | Unknown email     | Unauthorized            |
| AUTH-009 | Google login      | User authenticated      |
| AUTH-010 | Expired token     | Authentication required |

---

# 3. Authorization Test Cases

| ID        | Test Case                               | Expected Result   |
| --------- | --------------------------------------- | ----------------- |
| AUTHZ-001 | Access protected route while logged in  | Success           |
| AUTHZ-002 | Access protected route while logged out | Redirect to login |
| AUTHZ-003 | Delete own study material               | Success           |
| AUTHZ-004 | Delete another user's material          | Forbidden         |
| AUTHZ-005 | View another user's dashboard           | Forbidden         |

---

# 4. Study Material Test Cases

## Create

| ID      | Test Case              | Expected Result  |
| ------- | ---------------------- | ---------------- |
| MAT-001 | Create with valid data | Material created |
| MAT-002 | Missing title          | Validation error |
| MAT-003 | Missing subject        | Validation error |
| MAT-004 | Missing content        | Validation error |
| MAT-005 | Invalid difficulty     | Validation error |

---

## Read

| ID      | Test Case             | Expected Result       |
| ------- | --------------------- | --------------------- |
| MAT-006 | View material details | Success               |
| MAT-007 | Invalid material ID   | Not found             |
| MAT-008 | Empty materials list  | Empty state displayed |

---

## Delete

| ID      | Test Case                      | Expected Result |
| ------- | ------------------------------ | --------------- |
| MAT-009 | Delete own material            | Success         |
| MAT-010 | Delete another user's material | Forbidden       |

---

# 5. Search & Filter Test Cases

| ID         | Test Case                | Expected Result           |
| ---------- | ------------------------ | ------------------------- |
| SEARCH-001 | Search by title          | Matching results returned |
| SEARCH-002 | Search with no match     | Empty state               |
| SEARCH-003 | Filter by subject        | Correct records           |
| SEARCH-004 | Filter by difficulty     | Correct records           |
| SEARCH-005 | Combine multiple filters | Correct filtered records  |
| SEARCH-006 | Sort newest              | Correct order             |
| SEARCH-007 | Sort A–Z                 | Alphabetical order        |
| SEARCH-008 | Pagination               | Correct page data         |

---

# 6. AI Notes Generator Test Cases

| ID     | Test Case                       | Expected Result        |
| ------ | ------------------------------- | ---------------------- |
| AI-001 | Generate notes with valid input | Notes generated        |
| AI-002 | Missing topic                   | Validation error       |
| AI-003 | Missing learning goal           | Validation error       |
| AI-004 | Regenerate notes                | New response generated |
| AI-005 | Save generation history         | History stored         |
| AI-006 | AI provider unavailable         | Friendly error message |
| AI-007 | Rate limit exceeded             | Rate limit response    |

---

# 7. AI Tutor Test Cases

| ID       | Test Case                     | Expected Result       |
| -------- | ----------------------------- | --------------------- |
| CHAT-001 | Create chat session           | Session created       |
| CHAT-002 | Send first message            | AI response returned  |
| CHAT-003 | Follow-up question            | Context maintained    |
| CHAT-004 | Resume previous session       | Conversation restored |
| CHAT-005 | Delete chat session           | Session removed       |
| CHAT-006 | Access another user's session | Forbidden             |
| CHAT-007 | Empty message                 | Validation error      |

---

# 8. Dashboard Test Cases

| ID       | Test Case               | Expected Result      |
| -------- | ----------------------- | -------------------- |
| DASH-001 | View dashboard          | Statistics displayed |
| DASH-002 | Dashboard without data  | Empty state          |
| DASH-003 | Charts render correctly | Charts displayed     |
| DASH-004 | Unauthorized access     | Redirect to login    |

---

# 9. Analytics Test Cases

| ID            | Test Case            | Expected Result |
| ------------- | -------------------- | --------------- |
| ANALYTICS-001 | View study progress  | Correct data    |
| ANALYTICS-002 | Subject distribution | Correct chart   |
| ANALYTICS-003 | AI usage statistics  | Correct metrics |

---

# 10. API Test Cases

| ID      | Test Case               | Expected Result           |
| ------- | ----------------------- | ------------------------- |
| API-001 | GET existing resource   | 200 OK                    |
| API-002 | POST valid payload      | 201 Created               |
| API-003 | Invalid payload         | 400 Bad Request           |
| API-004 | Unauthorized request    | 401 Unauthorized          |
| API-005 | Forbidden request       | 403 Forbidden             |
| API-006 | Missing resource        | 404 Not Found             |
| API-007 | Unexpected server error | 500 Internal Server Error |

---

# 11. Validation Test Cases

Verify:

- Required fields
- Email validation
- Password validation
- ObjectId validation
- Enum validation
- Query parameter validation
- Request body validation

Every invalid request should return a structured validation error.

---

# 12. Security Test Cases

| ID      | Test Case                   | Expected Result       |
| ------- | --------------------------- | --------------------- |
| SEC-001 | Invalid session             | Unauthorized          |
| SEC-002 | Expired session             | Unauthorized          |
| SEC-003 | Missing session             | Unauthorized          |
| SEC-004 | SQL/NoSQL injection attempt | Request rejected      |
| SEC-005 | XSS input                   | Sanitized or rejected |
| SEC-006 | Rate limit exceeded         | 429 Too Many Requests |
| SEC-007 | Access another user's data  | Forbidden             |

---

# 13. Responsive UI Test Cases

Verify layouts on:

- Mobile
- Tablet
- Laptop
- Desktop

Check:

- Navbar
- Cards
- Dashboard
- Tables
- Forms
- Charts
- AI Chat
- AI Notes

No horizontal scrolling should occur during normal use.

---

# 14. Accessibility Test Cases

Verify:

- Keyboard navigation
- Focus visibility
- Form labels
- Screen reader compatibility
- Sufficient color contrast
- Accessible buttons and links

---

# 15. Performance Test Cases

Verify:

- Initial page load
- Image optimization
- Lazy loading
- Pagination performance
- API response times
- AI response handling
- Chart rendering

---

# 16. Error Handling Test Cases

Simulate:

- Database unavailable
- AI provider timeout
- Network interruption
- Invalid API request
- Unexpected server exception

The application should display friendly messages and remain stable.

---

# 17. Browser Compatibility

Test on:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari (latest stable versions where possible)

Core functionality should behave consistently.

---

# 18. Manual Testing Checklist

Before deployment, verify:

- User registration
- Login/logout
- Google authentication
- Protected routes
- CRUD operations
- Search, filter, and sorting
- Pagination
- AI Notes generation
- AI Tutor conversations
- Dashboard statistics
- Analytics charts
- Mobile responsiveness
- Error handling
- Loading states
- Empty states

---

# 19. Acceptance Criteria

StudyGenie is considered ready for production when:

- All critical test cases pass.
- Authentication and authorization work correctly.
- AI features behave consistently.
- CRUD operations function correctly.
- Responsive layouts work across supported devices.
- APIs return expected responses.
- Security checks pass.
- No critical bugs remain.

---

# 20. Continuous Testing Strategy

Testing should be performed:

- After each development phase.
- Before every release.
- After major AI prompt changes.
- After database schema updates.
- After authentication or authorization changes.

Maintaining this testing process helps ensure StudyGenie remains stable, secure, and production-ready as new features are added.
