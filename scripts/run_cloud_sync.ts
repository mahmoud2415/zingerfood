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

  const itemIds = new Set(initialMenuItems.map((item) => item.id));
  if (itemIds.size !== initialMenuItems.length) {
    throw new Error('The menu contains duplicate item IDs.');
  }

  const menuCollection = collection(db, 'menu_items');
  const currentMenu = await getDocs(menuCollection);
  const staleIds = currentMenu.docs
    .map((menuDoc) => menuDoc.id)
    .filter((id) => !itemIds.has(id));
  const operations = [
    ...initialMenuItems.map((item) => ({ type: 'set' as const, item })),
    ...staleIds.map((id) => ({ type: 'delete' as const, id })),
  ];

  console.log(`Replacing ${currentMenu.size} existing items; removing ${staleIds.length} obsolete items.`);

  const chunkSize = 400;
  for (let i = 0; i < operations.length; i += chunkSize) {
    const chunk = operations.slice(i, i + chunkSize);
    const batch = writeBatch(db);

    for (const operation of chunk) {
      if (operation.type === 'set') {
        batch.set(doc(db, 'menu_items', operation.item.id), removeUndefined(operation.item));
      } else {
        batch.delete(doc(db, 'menu_items', operation.id));
      }
    }

    await batch.commit();
    console.log(`Committed operations ${i + 1} to ${Math.min(i + chunkSize, operations.length)}.`);
  }

  console.log('All items successfully synced to Firestore!');

  // Verify categories
  const snap = await getDocs(collection(db, 'menu_items'));
  const syncedIds = new Set(snap.docs.map((menuDoc) => menuDoc.id));
  const missingIds = initialMenuItems
    .map((item) => item.id)
    .filter((id) => !syncedIds.has(id));
  const unexpectedIds = [...syncedIds].filter((id) => !itemIds.has(id));
  if (missingIds.length > 0 || unexpectedIds.length > 0) {
    throw new Error(
      `Menu sync verification failed. Missing: ${missingIds.length}; unexpected: ${unexpectedIds.length}.`,
    );
  }

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
