# Firebase Firestore Security Rules for Free Fire Tournament App

## 🔐 Security Rules Overview

These rules ensure that:
- Users can only access their own data
- Admins have full control over the system
- Data integrity is maintained
- Unauthorized access is prevented

## 📁 Collections and Their Rules

### 1. Users Collection (`/users/{userId}`)
```javascript
// Users can read their own data only
allow read: if isOwner(userId);

// Users can create their own profile during signup
allow create: if isOwner(userId) && isValidUserData();

// Users can update their own profile (name, photoURL, balance)
allow update: if isOwner(userId) && 
  (request.resource.data.diff(resource.data).affectedKeys().hasOnly(['name', 'photoURL', 'balance', 'referralEarnings']) ||
   isAdmin());

// Only admins can delete users
allow delete: if isAdmin();
```

### 2. Matches Collection (`/matches/{matchId}`)
```javascript
// Anyone can read matches (public information)
allow read: if true;

// Only admins can create matches
allow create: if isAdmin() && isValidMatchData();

// Admins can update matches, users can only join/leave
allow update: if isAdmin() || 
  (isAuthenticated() && 
   request.resource.data.diff(resource.data).affectedKeys().hasOnly(['joinedPlayers']));

// Only admins can delete matches
allow delete: if isAdmin();
```

### 3. Transactions Collection (`/transactions/{transactionId}`)
```javascript
// Users can read their own transactions only
allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;

// Users can create their own transactions
allow create: if isAuthenticated() && 
  request.resource.data.userId == request.auth.uid && 
  isValidTransactionData();

// Only admins can update/delete transactions
allow update, delete: if isAdmin();
```

### 4. Add Money Requests Collection (`/addMoneyRequests/{requestId}`)
```javascript
// Users can read their own requests
allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;

// Users can create their own requests
allow create: if isAuthenticated() && 
  request.resource.data.userId == request.auth.uid && 
  isValidAddMoneyRequest();

// Only admins can approve/reject requests
allow update: if isAdmin() && 
  request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status']);

// Only admins can delete requests
allow delete: if isAdmin();
```

### 5. Banners Collection (`/banners/{bannerId}`)
```javascript
// Anyone can read banners (public)
allow read: if true;

// Only admins can manage banners
allow create, update, delete: if isAdmin() && isValidBannerData();
```

## 🛠️ Implementation Steps

### Step 1: Update Admin UIDs
In the `firestore.rules` file, replace the placeholder admin UIDs:

```javascript
function isAdmin() {
  return isAuthenticated() && 
    (request.auth.uid in ['YOUR_ACTUAL_ADMIN_UID_1', 'YOUR_ACTUAL_ADMIN_UID_2'] || 
     request.auth.token.email in ['your-admin@example.com', 'admin2@example.com']);
}
```

### Step 2: Deploy Rules
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Click on "Rules" tab
4. Replace the existing rules with the content from `firestore.rules`
5. Click "Publish"

### Step 3: Test Rules
Use Firebase Emulator or test in development mode first:

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Start emulator
firebase emulators:start
```

## 🔒 Key Security Features

### 1. Data Validation
- All data is validated before writing
- Required fields are checked
- Data types are enforced
- Value ranges are validated

### 2. User Isolation
- Users can only access their own data
- Cross-user data access is prevented
- Admin access is properly controlled

### 3. Admin Privileges
- Admins have full system access
- Admin UIDs are hardcoded for security
- Admin emails are also checked

### 4. Rate Limiting (Optional)
You can add rate limiting to prevent abuse:

```javascript
// Add this to your rules for rate limiting
function isNotRateLimited() {
  return request.time > resource.data.lastRequest.toMillis() + 1000; // 1 second
}
```

## 🚨 Important Security Notes

### 1. Admin UIDs
- Never expose admin UIDs in client-side code
- Use environment variables in production
- Regularly rotate admin credentials

### 2. Data Validation
- Always validate data on both client and server
- Use the validation functions in rules
- Check data types and ranges

### 3. Testing
- Test all rules thoroughly before production
- Use Firebase Emulator for testing
- Test both positive and negative cases

### 4. Monitoring
- Enable Firebase App Check for additional security
- Monitor Firestore usage and costs
- Set up alerts for unusual activity

## 📊 Example Usage

### Creating a User Profile
```javascript
// This will work (user creating their own profile)
await setDoc(doc(db, 'users', currentUser.uid), {
  name: 'John Doe',
  email: 'john@example.com',
  balance: 1000,
  referralCode: 'ABC123',
  referralEarnings: 0,
  createdAt: new Date()
});
```

### Joining a Match
```javascript
// This will work (user joining match)
await updateDoc(doc(db, 'matches', matchId), {
  joinedPlayers: arrayUnion(currentUser.uid)
});
```

### Admin Creating Match
```javascript
// This will work (admin creating match)
await addDoc(collection(db, 'matches'), {
  title: 'Free Fire Tournament',
  game: 'Free Fire',
  startTime: new Date(),
  entryFee: 100,
  maxPlayers: 50,
  description: 'Tournament description',
  createdAt: new Date()
});
```

## 🔄 Updating Rules

When you need to update rules:

1. **Backup current rules**
2. **Test in development first**
3. **Deploy during low-traffic periods**
4. **Monitor for any issues**
5. **Rollback if needed**

## 📞 Support

If you encounter issues with the rules:

1. Check Firebase Console for error messages
2. Use Firebase Emulator for testing
3. Review the validation functions
4. Ensure all required fields are present
5. Check admin UIDs and emails

Remember: Security rules are your first line of defense. Always test thoroughly before deploying to production!