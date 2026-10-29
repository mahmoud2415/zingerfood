import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch, collection, getDocs } from 'firebase/firestore';
import { initialMenuItems } from '../src/data/initialMenu';

const firebaseConfig = {
  apiKey: 'AIzaSyDFbe0xLbSdwhmvGkMVPPfW8xw7ZAMnBxI',
  authDomain: 'zinger-restaurant-prod.firebaseapp.com',
  projectId: 'zinger-restaurant-prod',
  storageBucket: 'zinger-restaurant-prod.firebasestorage.app',
  messagingSenderId: '386612122707',
  appId: '1:386612122707:web:1ee229967cb6854a2fe2a6'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function removeUndefined<T extends Record<string, any>>(obj: T): any {
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      clean[key] = val;
    }
  }
  return clean;
}

async function syncAllToFirestore() {
  console.log(`Starting Firestore sync for ${initialMenuItems.length} menu items...`);

  // Batch writes in chunks of 250 (Firestore limit is 500)
  const chunkSize = 250;
  for (let i = 0; i < initialMenuItems.length; i += chunkSize) {
    const chunk = initialMenuItems.slice(i, i + chunkSize);
    const batch = writeBatch(db);

    for (const item of chunk) {
      const itemRef = doc(db, 'menu_items', item.id);
      batch.set(itemRef, removeUndefined(item));
    }

    await batch.commit();
    console.log(`Committed chunk ${i + 1} to ${Math.min(i + chunkSize, initialMenuItems.length)} items.`);
  }

  console.log('All items successfully synced to Firestore!');

  // Verify categories
  const snap = await getDocs(collection(db, 'menu_items'));
  console.log(`Total items now in Firestore: ${snap.size}`);

  const counts: Record<string, number> = {};
  snap.forEach((d) => {
    const data = d.data();
    counts[data.category] = (counts[data.category] || 0) + 1;
  });

  console.log('Updated category counts in Firestore:\n', JSON.stringify(counts, null, 2));
}

syncAllToFirestore()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Sync failed:', err);
    process.exit(1);
  });
