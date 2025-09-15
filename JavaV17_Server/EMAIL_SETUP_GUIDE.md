# Email Setup Guide

## Quick Setup

1. **Create config file:** `src/main/resources/application-local.properties`
   ```properties
   EMAIL_USERNAME=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

2. **Get Gmail App Password:**
   - Enable 2-Factor Authentication in Gmail
   - Go to: Google Account → Security → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password (keep spaces!)

3. **Clear environment variables (if needed):**
   ```cmd
   set EMAIL_USERNAME=
   set EMAIL_PASSWORD=
   ```

4. **Test:** Start app and visit http://localhost:8080/send-test-email

## Troubleshooting

- **Authentication failed?** Check your app password (16 chars with spaces)
- **Still using env variables?** Run `set EMAIL_USERNAME=` and `set EMAIL_PASSWORD=`


## Important Notes

- This file is in `.gitignore` (won't be committed)
- Use Gmail App Password, not regular password

