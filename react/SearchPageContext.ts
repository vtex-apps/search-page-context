import { createContext, useContext, useReducer } from 'react'

const SearchPageContext = createContext({})

const useSearchPage = () => useContext(SearchPageContext)

const SearchPageStateContext = createContext({} as State)

const useSearchPageState = () => useContext(SearchPageStateContext)

const SearchPageStateDispatch = createContext((_: ReducerActions) => {})

const useSearchPageStateDispatch = () => useContext(SearchPageStateDispatch)

interface State {
  mobileLayout?: string
  showContentLoader?: boolean
  isFetchingMore?: boolean
  galleryLayout?: string
}

interface InitialArgs {
  mobileLayout: string
  showContentLoader: boolean
  defaultGalleryLayout?: string
}

type ReducerActions =
  | { type: 'SWITCH_LAYOUT'; args: { mobileLayout: string } }
  | { type: 'HIDE_CONTENT_LOADER' }
  | { type: 'SET_FETCHING_MORE'; args: { isFetchingMore: boolean } }
  | { type: 'SWITCH_GALLERY_LAYOUT'; args: { galleryLayout: string } }

function reducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case 'SWITCH_LAYOUT':
      const { mobileLayout } = action.args
      return { ...state, mobileLayout }
    case 'HIDE_CONTENT_LOADER':
      return { ...state, showContentLoader: false }
    case 'SET_FETCHING_MORE':
      const { isFetchingMore } = action.args
      return { ...state, isFetchingMore }
    case 'SWITCH_GALLERY_LAYOUT':
      const { galleryLayout } = action.args
      return { ...state, galleryLayout }
    default:
      return state
  }
}

const useSearchPageStateReducer = (initialState: InitialArgs) => {
  return useReducer(reducer, {
    mobileLayout: initialState.mobileLayout,
    showContentLoader: initialState.showContentLoader,
    galleryLayout: initialState.defaultGalleryLayout,
    isFetchingMore: false,
  })
}

export default {
  SearchPageContext,
  useSearchPage,
  SearchPageStateContext,
  useSearchPageState,
  SearchPageStateDispatch,
  useSearchPageStateDispatch,
  useSearchPageStateReducer,
}
