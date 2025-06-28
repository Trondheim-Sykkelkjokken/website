# Start a dev server and open the website in your browser
open:
    npm run dev -- --open ||:

# Start a dev server and host the website locally, show QR for mobile
host:
    #!/bin/bash
    npm run dev -- --host &
    pid=$!
    ip=$(hostname -I | awk '{print $1}')
    qrcode --small "http://${ip}:5173"
    wait $pid  # Wait for something like ctrl-c to kill the process
