import { useState } from "react";

export const useBrowserStorage = () => {
  // initialize our states
  const [localStorageValues, setLocalStorageValues] = useState({});

  // create storage objects
  const createStorage = (state, setState) => ({
    // get value
    get: (key) => state[key] || null,

    // set value
    set: (key, value) => {
      const updatedState = { ...state, [key]: value };
      setState(updatedState);
    },

    // update value
    update: (key, newValue) => {
      const presentValue = createStorage(state, setState).get(key);

      if (presentValue) {
        createStorage(state, setState).set(key, {
          ...presentValue,
          ...newValue,
        });
      }
    },

    // delete a value
    remove: (key) => {
      const { [key]: removedValue, ...updatedState } = state;
      setState(updatedState);
    },
  });

  const localStorage = createStorage(localStorageValues, setLocalStorageValues);

  return { localStorage };
};
