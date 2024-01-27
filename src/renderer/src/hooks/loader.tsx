// @ts-nocheck
import {
  createContext,
  useState,
} from 'react';

export const LoaderContext = createContext()

export function LoaderState({ children }) {
	const [isLoading, setIsLoading] = useState()

	function changeLoadingState(newState): void {
		setIsLoading(newState)
	}
	return (
		<LoaderContext.Provider value={{ isLoading, changeLoadingState }}>
			{children}
		</LoaderContext.Provider>
	)
}
