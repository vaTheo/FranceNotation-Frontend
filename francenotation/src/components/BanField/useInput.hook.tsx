// Importing necessary hooks from React
import { useState, useCallback } from 'react';

// Declaration of the useInput custom hook with an initial value for the input
export function useInput(initialValue: string) {
    // useState hook to manage the input's state
    // `value` holds the current state of the input
    // `setValue` is a function to update the state
    const [value, setValue] = useState<string>(initialValue);
  
    // useCallback hook returns a memoized version of the callback `onChange`
    // that only changes if one of the dependencies has changed.
    // In this case, there are no dependencies (`[]`), so it doesn't change across re-renders
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      // Updates the `value` state to the current value of the input field
      setValue(event.target.value);
    }, []);
  
    // Another useCallback hook for `resetInput`
    // This function is dependent on `initialValue`
    // It will be re-created if `initialValue` changes
    const resetInput = useCallback(() => {
      // Resets the `value` state back to the initial value
      setValue(initialValue);
    }, [initialValue]);
  

    // The hook returns an object containing the state `value`, the function `setValue`
    // to update the state, the memoized `onChange` function for input changes,
    // and the `resetInput` function to reset the input field
    return { value, setValue, onChange, resetInput };
}