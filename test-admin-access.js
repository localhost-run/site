// Test Admin Access Script
// Run this in browser console after logging in

// Function to test admin access
async function testAdminAccess() {
    console.log('=== TESTING ADMIN ACCESS ===');
    
    const user = auth.currentUser;
    if (!user) {
        console.log('❌ No user logged in');
        return;
    }
    
    console.log('👤 Current User:');
    console.log('  UID:', user.uid);
    console.log('  Email:', user.email);
    
    // Check hardcoded admin credentials
    const ADMIN_UIDS = ['lwrLF01gp1hcEwF0rZr4vu6oeju2'];
    const ADMIN_EMAILS = ['rahulkashyap10091009@gmail.com'];
    
    console.log('\n🔍 Checking Admin Status:');
    
    if (ADMIN_UIDS.includes(user.uid)) {
        console.log('✅ Admin access via UID');
        return true;
    }
    
    if (ADMIN_EMAILS.includes(user.email)) {
        console.log('✅ Admin access via email');
        return true;
    }
    
    console.log('❌ No admin access found');
    console.log('Expected UID:', ADMIN_UIDS[0]);
    console.log('Expected Email:', ADMIN_EMAILS[0]);
    
    return false;
}

// Function to check Firestore permissions
async function testFirestorePermissions() {
    console.log('\n=== TESTING FIRESTORE PERMISSIONS ===');
    
    try {
        // Test reading users collection
        console.log('📊 Testing users collection read...');
        const usersSnapshot = await getDocs(collection(db, 'users'));
        console.log('✅ Users collection read successful');
        console.log('  Found', usersSnapshot.size, 'users');
        
        // Test reading transactions collection
        console.log('📊 Testing transactions collection read...');
        const transactionsSnapshot = await getDocs(collection(db, 'transactions'));
        console.log('✅ Transactions collection read successful');
        console.log('  Found', transactionsSnapshot.size, 'transactions');
        
        // Test reading addMoneyRequests collection
        console.log('📊 Testing addMoneyRequests collection read...');
        const requestsSnapshot = await getDocs(collection(db, 'addMoneyRequests'));
        console.log('✅ AddMoneyRequests collection read successful');
        console.log('  Found', requestsSnapshot.size, 'requests');
        
        return true;
    } catch (error) {
        console.log('❌ Firestore permission error:', error.message);
        return false;
    }
}

// Function to make current user admin
async function makeCurrentUserAdmin() {
    console.log('\n=== MAKING USER ADMIN ===');
    
    const user = auth.currentUser;
    if (!user) {
        console.log('❌ No user logged in');
        return;
    }
    
    try {
        // Check if user document exists
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
            // Update existing user document
            await updateDoc(doc(db, 'users', user.uid), {
                admin: true
            });
            console.log('✅ Updated existing user document with admin: true');
        } else {
            // Create new user document
            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName || 'User',
                email: user.email,
                balance: 1000,
                referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
                referralEarnings: 0,
                createdAt: new Date(),
                photoURL: user.photoURL || '',
                phoneNumber: user.phoneNumber || '',
                admin: true
            });
            console.log('✅ Created new user document with admin: true');
        }
        
        console.log('🎉 User has been made admin!');
        console.log('Please refresh the page and try accessing the admin panel again.');
        
    } catch (error) {
        console.log('❌ Error making user admin:', error.message);
    }
}

// Function to show current user's Firestore data
async function showUserData() {
    console.log('\n=== USER FIRESTORE DATA ===');
    
    const user = auth.currentUser;
    if (!user) {
        console.log('❌ No user logged in');
        return;
    }
    
    try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('📄 User Data:');
            console.log(JSON.stringify(userData, null, 2));
        } else {
            console.log('❌ User document not found in Firestore');
        }
    } catch (error) {
        console.log('❌ Error fetching user data:', error.message);
    }
}

// Main test function
async function runAllTests() {
    console.log('🚀 Starting Admin Access Tests...\n');
    
    const adminAccess = await testAdminAccess();
    const firestoreAccess = await testFirestorePermissions();
    
    console.log('\n=== TEST RESULTS ===');
    console.log('Admin Access:', adminAccess ? '✅ PASS' : '❌ FAIL');
    console.log('Firestore Access:', firestoreAccess ? '✅ PASS' : '❌ FAIL');
    
    if (!adminAccess) {
        console.log('\n💡 To fix admin access:');
        console.log('1. Run makeCurrentUserAdmin() to make yourself admin');
        console.log('2. Or check if your UID/email matches the admin credentials');
    }
    
    if (!firestoreAccess) {
        console.log('\n💡 To fix Firestore access:');
        console.log('1. Check if Firestore rules are deployed correctly');
        console.log('2. Ensure you have admin privileges');
    }
}

// Run tests automatically
console.log(`
=== ADMIN ACCESS TEST SCRIPT ===

Available functions:
- testAdminAccess()           - Test admin access
- testFirestorePermissions()  - Test Firestore permissions
- makeCurrentUserAdmin()      - Make current user admin
- showUserData()             - Show current user's Firestore data
- runAllTests()              - Run all tests

Run 'runAllTests()' to start testing...
`);