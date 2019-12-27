# VTEX Search Page Context app

This app is the search page context, contains three contexts.

1 - `SearchPageContext`: pass down variables set by user in blocks (SearchPageContext). This way, the children in flex search-result can access it.

2 - `SearchPageStateContext`: holds variable state in search page, like if the search is loading, what mobile layout is selected, etc. (SearchPageStateContext)

3 - `SearchPageDispatchContext`: holds the dispatch function for the search page state context.

## Usage

```jsx
import {
  useSearchPageState,
  useSearchPage,
  useSearchPageStateDispatch,
} from 'vtex.search-page-context/SearchPageContext'

...

const { pagination, searchQuery } = useSearchPage()
const { isFetchingMore } = useSearchPageState()
const dispatch = useSearchPageStateDispatch()
```
