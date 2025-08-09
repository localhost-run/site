# Admin Setup Guide - Free Fire Tournament App

## 🔧 How to Fix "Access Denied" Issue

### Step 1: Update Firebase Configuration

1. Open `admin-panel.html`
2. Replace the `firebaseConfig` object with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
    databaseURL: "YOUR_ACTUAL_DATABASE_URL",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID",
    measurementId: "YOUR_ACTUAL_MEASUREMENT_ID"
};
```

### Step 2: Set Up Admin Access

#### Option A: Using Email (Recommended for Testing)

1. Open `admin-panel.html`
2. Find the `ADMIN_EMAILS` array (around line 671)
3. Add your email address:

```javascript
const ADMIN_EMAILS = ['your-email@example.com', 'admin@example.com', 'admin2@example.com'];
```

#### Option B: Using UID (More Secure)

1. First, sign up/login to the user panel
2. Open browser console (F12)
3. Look for your UID in the console or check Firebase Console
4. Add your UID to the `ADMIN_UIDS` array:

```javascript
const ADMIN_UIDS = ['YOUR_ACTUAL_UID_HERE', 'YOUR_ADMIN_UID_2'];
```

### Step 3: Quick Test Setup

For immediate testing, you can use any email that contains 'admin' or 'test':

```javascript
// This is already added in the code for testing
if (user.email && (user.email.includes('test') || user.email.includes('admin'))) {
    return true;
}
```

So you can use:
- `admin@test.com`
- `test@example.com`
- `yourname@admin.com`

### Step 4: Create Admin User

1. **Using User Panel**:
   - Go to `user-panel.html`
   - Sign up with your admin email (e.g., `admin@example.com`)
   - Note down the UID from browser console

2. **Using Firebase Console**:
   - Go to Firebase Console → Authentication → Users
   - Click "Add User"
   - Enter your admin email and password

### Step 5: Test Admin Access

1. Open `admin-panel.html`
2. Enter your admin email and password
3. Click "Login"
4. You should now have access to the admin panel

## 🚨 Troubleshooting

### Issue: "Access Denied" Still Appears

**Solution 1**: Check if your email is in the admin list
```javascript
// Add this to your admin-panel.html temporarily for debugging
console.log('Current user:', user.email);
console.log('Admin emails:', ADMIN_EMAILS);
console.log('Is admin?', isAdminUser(user));
```

**Solution 2**: Use the temporary admin access
- Use any email containing 'admin' or 'test'
- Example: `admin@test.com`

**Solution 3**: Check Firebase Console
- Go to Firebase Console → Authentication → Users
- Verify your user exists and is active

### Issue: "User Not Found"

**Solution**: Create the user first
1. Go to `user-panel.html`
2. Sign up with your admin email
3. Then try logging into admin panel

### Issue: "Incorrect Password"

**Solution**: Reset password
1. Go to Firebase Console → Authentication → Users
2. Find your user
3. Click "Reset Password"

## 🔒 Security Best Practices

### For Production:

1. **Remove temporary admin access**:
```javascript
// Remove this section from isAdminUser function
if (user.email && (user.email.includes('test') || user.email.includes('admin'))) {
    return true;
}
```

2. **Use only UIDs for admin access**:
```javascript
const ADMIN_UIDS = ['YOUR_SECURE_ADMIN_UID_1', 'YOUR_SECURE_ADMIN_UID_2'];
const ADMIN_EMAILS = []; // Empty for production
```

3. **Enable Firebase App Check** for additional security

4. **Set up proper Firebase Rules** (already provided)

## 📞 Quick Fix Commands

If you need to quickly test:

1. **Add your email to admin list**:
```javascript
const ADMIN_EMAILS = ['your-email@example.com'];
```

2. **Use test email**:
- Email: `admin@test.com`
- Password: `password123`

3. **Check console for errors**:
- Press F12 in browser
- Look for error messages in Console tab

## ✅ Verification Checklist

- [ ] Firebase config updated with actual values
- [ ] Admin email/UID added to arrays
- [ ] User exists in Firebase Authentication
- [ ] User can login to user panel
- [ ] User can login to admin panel
- [ ] Admin features are accessible
- [ ] Temporary admin access removed (for production)

## 🆘 Still Having Issues?

1. **Check browser console** for error messages
2. **Verify Firebase project** is correctly configured
3. **Test with simple email** like `admin@test.com`
4. **Check Firebase Rules** are properly deployed
5. **Ensure user exists** in Firebase Authentication

Remember: The admin panel is designed to be secure by default. You need to explicitly add your credentials to the admin lists.