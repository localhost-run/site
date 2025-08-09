# 🔐 Admin Setup Using Firestore - Free Fire Tournament App

## 🎯 Overview

Admin users are now managed through Firestore database using an `admin` field. This is more secure and flexible than hardcoded UIDs.

## 📋 Step-by-Step Guide

### Step 1: Make First Admin User

#### Method 1: Using Browser Console (Recommended)

1. **Open User Panel** (`user-panel.html`)
2. **Sign up/Login** with your email
3. **Open Browser Console** (F12)
4. **Run this command**:
   ```javascript
   makeCurrentUserAdmin()
   ```
5. **Refresh the page** and try admin panel

#### Method 2: Using Admin Panel

1. **Open Admin Panel** (`admin-panel.html`)
2. **Login** with any email containing 'admin' (e.g., `admin@test.com`)
3. **Go to Users section**
4. **Click "Make Admin"** next to your user
5. **Refresh the page**

#### Method 3: Direct Firestore Update

1. **Go to Firebase Console**
2. **Navigate to Firestore Database**
3. **Find your user document** in `users` collection
4. **Add field**: `admin: true`
5. **Save the document**

### Step 2: Verify Admin Status

#### Check in Browser Console:
```javascript
checkAdminStatus()
```

#### Check in Admin Panel:
- Go to Users section
- Look for "Admin" badge next to your name

### Step 3: Make Other Users Admin

#### Using Admin Panel:
1. **Login to admin panel**
2. **Go to Users section**
3. **Click "Make Admin"** next to any user
4. **User will get admin privileges**

#### Using Browser Console:
```javascript
makeUserAdminByEmail('user@example.com')
```

## 🔧 Firestore Structure

### User Document Structure:
```javascript
{
  "name": "User Name",
  "email": "user@example.com",
  "balance": 1000,
  "referralCode": "ABC123",
  "referralEarnings": 0,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "admin": true  // ← This field makes user admin
}
```

### Admin Field Values:
- `true` - User is admin
- `false` - User is not admin
- `undefined` - User is not admin (default)

## 🛠️ Implementation Details

### Updated Admin Check Function:
```javascript
async function isAdminUser(user) {
    // Check hardcoded admin lists
    if (ADMIN_UIDS.includes(user.uid)) {
        return true;
    }
    
    if (user.email && ADMIN_EMAILS.includes(user.email)) {
        return true;
    }
    
    // Check Firestore for admin field
    try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.admin === true) {
                return true;
            }
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
    }
    
    return false;
}
```

### Admin Management Functions:
```javascript
// Make user admin
async function makeUserAdmin(userId) {
    await updateDoc(doc(db, 'users', userId), {
        admin: true
    });
}

// Remove admin from user
async function removeUserAdmin(userId) {
    await updateDoc(doc(db, 'users', userId), {
        admin: false
    });
}
```

## 🔒 Security Rules

### Updated Firestore Rules:
```javascript
// Users collection
match /users/{userId} {
    // Users can read their own data
    allow read: if isOwner(userId);
    
    // Users can create their own profile
    allow create: if isOwner(userId) && isValidUserData();
    
    // Users can update their own profile
    // Admins can update any user's data including admin field
    allow update: if isOwner(userId) && 
      (request.resource.data.diff(resource.data).affectedKeys().hasOnly(['name', 'photoURL', 'balance', 'referralEarnings']) ||
       isAdmin()) ||
      isAdmin() && 
      (request.resource.data.diff(resource.data).affectedKeys().hasOnly(['admin', 'balance', 'referralEarnings']));
    
    // Only admins can delete users
    allow delete: if isAdmin();
}
```

## 🚨 Troubleshooting

### Issue: "Access Denied" Still Appears

**Solution 1**: Check if admin field exists
```javascript
// In browser console
const userDoc = await getDoc(doc(db, 'users', 'YOUR_UID'));
console.log(userDoc.data());
```

**Solution 2**: Manually add admin field
```javascript
// In browser console
await updateDoc(doc(db, 'users', 'YOUR_UID'), {
    admin: true
});
```

**Solution 3**: Check Firestore rules
- Ensure rules allow admin field updates
- Check if user has proper permissions

### Issue: "User Not Found"

**Solution**: Create user first
1. Sign up in user panel
2. Then make admin

### Issue: "Permission Denied"

**Solution**: Check Firestore rules
1. Go to Firebase Console
2. Navigate to Firestore → Rules
3. Update rules with admin field support

## 📊 Admin Management Features

### In Admin Panel:
- ✅ **View all users** with admin status
- ✅ **Make users admin** with one click
- ✅ **Remove admin privileges** with one click
- ✅ **Edit user balances**
- ✅ **View user details**

### Admin Status Display:
- **Admin badge** next to admin users
- **Make Admin** button for non-admin users
- **Remove Admin** button for admin users

## 🎯 Quick Commands

### For First Time Setup:
```javascript
// 1. Login to user panel first
// 2. Then run in console:
makeCurrentUserAdmin()
```

### For Making Others Admin:
```javascript
// Make specific user admin
makeUserAdminByEmail('user@example.com')
```

### For Checking Status:
```javascript
// Check current user admin status
checkAdminStatus()
```

## ✅ Verification Checklist

- [ ] User exists in Firestore `users` collection
- [ ] `admin: true` field added to user document
- [ ] Firestore rules updated to allow admin field
- [ ] Admin panel shows admin badge
- [ ] User can access admin features
- [ ] Admin can make other users admin
- [ ] Admin can remove admin privileges

## 🔄 Migration from Hardcoded Admins

If you were using hardcoded admin UIDs/emails:

1. **Keep hardcoded lists** for backup
2. **Add admin field** to existing admin users
3. **Test new admin system**
4. **Remove hardcoded lists** once confirmed working

## 🆘 Support

If you need help:

1. **Check browser console** for errors
2. **Verify Firestore rules** are deployed
3. **Ensure user document exists**
4. **Check admin field value**
5. **Test with console commands**

Remember: The admin system is now database-driven and more secure!