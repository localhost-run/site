// Script to make a user admin in Firestore
// Run this in browser console after setting up Firebase

// Function to make current user admin
async function makeCurrentUserAdmin() {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert('Please login first');
            return;
        }

        await updateDoc(doc(db, 'users', user.uid), {
            admin: true
        });
        
        alert('You have been made admin! Please refresh the page.');
        console.log('Admin status updated for user:', user.email);
    } catch (error) {
        alert('Failed to make admin: ' + error.message);
        console.error('Error:', error);
    }
}

// Function to make any user admin by email
async function makeUserAdminByEmail(email) {
    try {
        // Find user by email
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            alert('User not found with email: ' + email);
            return;
        }
        
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'users', userDoc.id), {
            admin: true
        });
        
        alert('User ' + email + ' has been made admin!');
        console.log('Admin status updated for user:', email);
    } catch (error) {
        alert('Failed to make admin: ' + error.message);
        console.error('Error:', error);
    }
}

// Function to check if current user is admin
async function checkAdminStatus() {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert('Please login first');
            return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.admin) {
                alert('You are already an admin!');
            } else {
                alert('You are not an admin. Use makeCurrentUserAdmin() to become admin.');
            }
        } else {
            alert('User document not found');
        }
    } catch (error) {
        alert('Error checking admin status: ' + error.message);
        console.error('Error:', error);
    }
}

// Instructions for use:
console.log(`
=== ADMIN SETUP INSTRUCTIONS ===

1. To make current user admin:
   makeCurrentUserAdmin()

2. To make any user admin by email:
   makeUserAdminByEmail('user@example.com')

3. To check current user admin status:
   checkAdminStatus()

4. After making someone admin, refresh the admin panel page.
`);