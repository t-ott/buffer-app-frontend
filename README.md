# buffer-app-frontend



Start frontend on localhost:
```bash
npm install # If needed

npm start
```

Need backend running on localhost as well ([buffer-app-backend repo](https://github.com/t-ott/buffer-app-backend/)):
```bash
cd ../buffer-app-backend
cargo run
```

Requests sent to `/buffer` are proxied to backend's port on localhost as configured in `vite.config.js`.
