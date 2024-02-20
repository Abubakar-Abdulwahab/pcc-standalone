"use strict";

import rand from "./rand";

const storeName = "pcc-request";
const storeKey = "fileName";
const dbVersion = 1;
let db = null;
const UserStore = "userstore";

// IndexedDB Methods
export const initIndexedDb = (dbName, stores) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);
    request.onerror = (event) => {
      reject(event.target.error);
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, { keyPath: "id" });

        objectStore.createIndex("rawData", "rawData", { unique: false });
        objectStore.createIndex(
          "intpassportdatapagefile",
          "intpassportdatapagefile",
          { unique: false }
        );
        objectStore.createIndex(
          "passportphotographfile",
          "passportphotographfile",
          { unique: false }
        );
        objectStore.createIndex(
          "biometricsUploadFile",
          "biometricsUploadFile",
          { unique: false }
        );
      }
      if (!db.objectStoreNames.contains(UserStore)) {
        const objectStore = db.createObjectStore(UserStore, { keyPath: "id" });

        objectStore.createIndex("rawData", "rawData", { unique: false });
        objectStore.createIndex("identificationfile", "identificationfile", {
          unique: false,
        });
      }
    };
  });
};

export const clearEntriesFromIndexedDb = (storeName) => {
  const store = db.transaction(storeName, "readwrite").objectStore(storeName);
  store.clear();
};

export const deleteDataFromIndexedDb = (storeKey, storeName) => {
  const store = db.transaction(storeName, "readwrite").objectStore(storeName);
  store.delete(storeKey);
};

export const fetchDBData = (storeName) => {
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction(storeName, "readonly");
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      request.onsuccess = function (event) {
        const data = event.target.result;
        resolve(data);
      };
      request.onerror = function (event) {
        reject(event.target.error);
      };
    } catch (error) {
        resolve([])
    }
  });
};

// Form functions

/**
 * @desc Gets the file from the input field and adds it to the IndexedDB
 * @param {Event} ev
 * @returns {Promise<void>}
 */
export const saveDataToDB = async (raw, file1, file2, file3) => {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);

  const req = objectStore.add({
    id: rand(10, ""),
    rawData: raw,
    passportphotographfile: file1,
    intpassportdatapagefile: file2,
    biometricsUploadFile: file3,
  });
  req.onsuccess = function () {
  };
};
export const saveUserDataToDB = async (raw, file) => {
  const transaction = db.transaction([UserStore], "readwrite");
  const objectStore = transaction.objectStore(UserStore);

  const req = objectStore.add({
    id: rand(10, ""),
    rawData: raw,
    identificationfile: file,
  });
  req.onsuccess = function () {

  };
};

window.addEventListener("load", async () => {
  db = await initIndexedDb("pcc-db", [{ name: storeName, keyPath: storeKey }]);
});
