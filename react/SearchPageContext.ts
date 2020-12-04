import { createContext, useContext, useReducer } from 'react'
import type { MaybeResponsiveInput } from 'vtex.responsive-values'

const SearchPageContext = createContext({})

const useSearchPage = () => useContext(SearchPageContext)

const SearchPageStateContext = createContext({} as State)

const useSearchPageState = () => useContext(SearchPageStateContext)

const SearchPageStateDispatch = createContext((_: ReducerActions) => {})

const useSearchPageStateDispatch = () => useContext(SearchPageStateDispatch)

interface LayoutOption {
  name: string
  component: string
  itemsPerRow: MaybeResponsiveInput<number>
}

interface State {
  mobileLayout?: string
  showContentLoader?: boolean
  isFetchingMore?: boolean
  galleryLayouts?: LayoutOption[]
  selectedGalleryLayout?: string
  /** For accessibility purposes */
  focusedGalleryLayout?: string
}

interface InitialArgs {
  mobileLayout: string
  showContentLoader: boolean
  selectedGalleryLayout?: string
}

type ReducerActions =
  | { type: 'SWITCH_LAYOUT'; args: { mobileLayout: string } }
  | { type: 'HIDE_CONTENT_LOADER' }
  | { type: 'SET_FETCHING_MORE'; args: { isFetchingMore: boolean } }
  | { type: 'SET_GALLERY_LAYOUTS'; args: { galleryLayouts: LayoutOption[] } }
  | {
      type: 'SWITCH_GALLERY_LAYOUT'
      args: { selectedGalleryLayout: string; focus?: boolean }
    }
  | { type: 'SET_FOCUS_GALLERY_LAYOUT'; args: { focusedGalleryLayout: string } }

function reducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case 'SWITCH_LAYOUT': {
      const { mobileLayout } = action.args

      return { ...state, mobileLayout }
    }

    case 'HIDE_CONTENT_LOADER': {
      return { ...state, showContentLoader: false }
    }

    case 'SET_FETCHING_MORE': {
      const { isFetchingMore } = action.args

      return { ...state, isFetchingMore }
    }

    case 'SET_GALLERY_LAYOUTS': {
      const { galleryLayouts } = action.args

      return { ...state, galleryLayouts }
    }

    case 'SWITCH_GALLERY_LAYOUT': {
      const { selectedGalleryLayout, focus = true } = action.args

      const newState = {
        ...state,
        selectedGalleryLayout,
      }

      if (focus) {
        newState.focusedGalleryLayout = selectedGalleryLayout
      }

      return newState
    }

    case 'SET_FOCUS_GALLERY_LAYOUT': {
      const { focusedGalleryLayout } = action.args

      return { ...state, focusedGalleryLayout }
    }

    default:
      return state
  }
}

const useSearchPageStateReducer = (initialState: InitialArgs) => {
  return useReducer(reducer, {
    mobileLayout: initialState.mobileLayout,
    showContentLoader: initialState.showContentLoader,
    selectedGalleryLayout: initialState.selectedGalleryLayout,
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
