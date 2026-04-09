# Project Presentation: Code Snippets

Use these snippets in your presentation slides to demonstrate the technical implementation and logic of the project.

---

## 1. Database Layer (MySQL)
**Concept**: Relational schema design with unique constraints and data types.

```sql
-- Example Table: Events
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. API Configuration (Frontend)
**Concept**: Using Axios interceptors to automatically attach the JWT token to every secure request.

```javascript
// client/src/api/axios.js
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

---

## 3. Dynamic Data Fetching (Frontend)
**Concept**: React Hooks (`useState`, `useEffect`) for managing lifecycle and state-driven UI.

```jsx
// client/src/components/Announcements.jsx
const [announcements, setAnnouncements] = useState([]);

useEffect(() => {
    api.get('/announcements')
        .then(res => setAnnouncements(res.data))
        .catch(err => console.error(err));
}, []);

// Rendering logic
return (
    <ul>
        {announcements.map((item) => (
            <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </li>
        ))}
    </ul>
);
```

---

## 4. Secure Authentication (Backend)
**Concept**: Implementing password hashing with Bcrypt and stateless sessions with JWT.

```javascript
// server/controllers/authController.js
exports.login = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM admins WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        const admin = results[0];
        // Securely compare hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (isMatch) {
            // Generate stateless JWT
            const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
    });
};
```

---

## 5. File Upload & DB Integration (Backend)
**Concept**: Using Multer for binary storage and SQL for metadata linkage.

```javascript
// server/controllers/slideController.js
exports.addSlide = (req, res) => {
    let { title, subtitle, image_url } = req.body;

    // Handle binary file if uploaded
    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const sql = 'INSERT INTO home_slides (image_url, title, subtitle) VALUES (?, ?, ?)';
    db.query(sql, [image_url, title, subtitle], (err, result) => {
        res.status(201).json({ id: result.insertId, image_url });
    });
};
```
