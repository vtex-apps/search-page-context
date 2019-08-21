import { createContext, useContext } from 'react'

const SearchPageContext = createContext({})

const useSearchPage = () => useContext(SearchPageContext)

const SearchPageStateContext = createContext({})

const useSearchPageState = () => useContext(SearchPageStateContext)

const SearchPageStateDispatch = createContext(() => {})

const useSearchPageStateDispatch = () => useContext(SearchPageStateDispatch)

export default {
  SearchPageContext,
  useSearchPage,
  SearchPageStateContext,
  useSearchPageState,
  SearchPageStateDispatch,
  useSearchPageStateDispatch,
}
